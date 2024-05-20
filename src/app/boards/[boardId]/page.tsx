'use server';

import Board from "@/components/Board";
import { liveblocksClient } from "@/lib/liveblocksClient";
import { getUserEmail } from "@/lib/userClient";

type PageProps = {
  params: {
    boardId: string;
  };
};

/**
 * Página del tablero.
 * 
 * Esta función obtiene la información del tablero y verifica si el usuario tiene acceso de escritura.
 * Si el usuario no tiene acceso, muestra un mensaje de "Acceso denegado".
 * Si tiene acceso, renderiza el componente Board con la información del tablero.
 * 
 * @param {PageProps} props - Las propiedades de la página.
 * @param {Object} props.params - Los parámetros de la URL.
 * @param {string} props.params.boardId - El ID del tablero.
 * @returns {JSX.Element} - El contenido de la página del tablero o un mensaje de acceso denegado.
 */
export default async function BoardPage(props: PageProps): Promise<JSX.Element> {
  const boardId = props.params.boardId;
  const userEmail = await getUserEmail();
  const boardInfo = await liveblocksClient.getRoom(boardId);
  const userAccess = boardInfo.usersAccesses?.[userEmail];
  const hasAccess = userAccess && [...userAccess].includes('room:write');
  
  if (!hasAccess) {
    return (
      <div>Acceso denegado</div>
    );
  }

  return (
    <div>
      <Board
        name={boardInfo.metadata.boardName.toString()}
        id={boardId} />
    </div>
  );
}
