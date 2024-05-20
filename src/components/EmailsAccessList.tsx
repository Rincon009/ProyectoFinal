'use client';
import { deleteBoard, removeEmailFromBoard } from "@/app/actions/boardActions";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { RoomAccesses } from "@liveblocks/node";
import { useRouter } from "next/navigation";

type EmailsAccessListProps = {
  boardId: string;
  usersAccesses: RoomAccesses;
};

/**
 * Componente para mostrar y gestionar la lista de correos electrónicos con acceso a un tablero.
 * 
 * Este componente muestra una lista de correos electrónicos que tienen acceso a un tablero y permite
 * eliminar el acceso de un correo electrónico específico.
 * 
 * @param {EmailsAccessListProps} props - Las propiedades del componente.
 * @param {string} props.boardId - El ID del tablero.
 * @param {RoomAccesses} props.usersAccesses - Los accesos de los usuarios al tablero.
 * @returns {JSX.Element} - El componente de la lista de accesos de correos electrónicos.
 */
export default function EmailsAccessList({ boardId, usersAccesses }: EmailsAccessListProps): JSX.Element {
  const router = useRouter();

  /**
   * Maneja la eliminación del acceso de un correo electrónico al tablero.
   * 
   * @param {string} emailToDelete - El correo electrónico al que se le eliminará el acceso.
   */
  async function handleDelete(emailToDelete: string) {
    await removeEmailFromBoard(boardId, emailToDelete);
    router.refresh();
  }

  return (
    <div className="max-w-xs">
      {Object.keys(usersAccesses).map(email => (
        <div
          key={email}
          className="flex gap-2 my-4 items-center max-w-xs justify-between border rounded-lg pl-4">
          {email}
          <button className="btn p-1" onClick={() => handleDelete(email)}>
            <FontAwesomeIcon icon={faTrash} />
          </button>
        </div>
      ))}
    </div>
  );
}
