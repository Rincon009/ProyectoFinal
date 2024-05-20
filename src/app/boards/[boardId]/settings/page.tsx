'use server';

import BoardDeleteButton from "@/components/BoardDeleteButton";
import EmailsAccessList from "@/components/EmailsAccessList";
import NewBoardAccess from "@/components/forms/NewBoardAccessForm";
import { liveblocksClient } from "@/lib/liveblocksClient";
import { getUserEmail } from "@/lib/userClient";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";

type PageProps = {
  params: {
    boardId: string;
  };
};

/**
 * Página de configuración del tablero.
 * 
 * Esta función obtiene la información del tablero y verifica si el usuario tiene acceso.
 * Si el usuario no tiene acceso, devuelve un mensaje de acceso denegado.
 * Si tiene acceso, renderiza la página de configuración del tablero.
 * 
 * @param {PageProps} params - Los parámetros de la página.
 * @param {Object} params.params - Los parámetros de la URL.
 * @param {string} params.params.boardId - El ID del tablero.
 * @returns {JSX.Element | string} - El contenido de la página de configuración o un mensaje de acceso denegado.
 */
export default async function BoardSettings({ params }: PageProps): Promise<JSX.Element | string> {
  const { boardId } = params;
  const boardInfo = await liveblocksClient.getRoom(boardId);
  const userEmail = await getUserEmail();

  // Verificar si el usuario tiene acceso al tablero
  if (!boardInfo.usersAccesses[userEmail]) {
    return 'Acceso denegado';
  }

  return (
    <div>
      <div className="flex justify-between">
        <Link
          className="inline-flex gap-1 items-center btn mb-4"
          href={`/boards/${boardId}`}
        >
          <FontAwesomeIcon icon={faArrowLeft} />
          Volver al tablero
        </Link>
        <BoardDeleteButton boardId={boardId} />
      </div>

      <h1 className="text-2xl">Acceder al tablero {boardInfo.metadata.boardName}:</h1>
      <div className="mb-8">
        <EmailsAccessList
          boardId={boardId}
          usersAccesses={boardInfo.usersAccesses}
        />
      </div>
      <NewBoardAccess boardId={boardId} />
    </div>
  );
}
