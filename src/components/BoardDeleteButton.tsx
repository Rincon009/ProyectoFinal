'use client';
import { deleteBoard } from "@/app/actions/boardActions";
import { useRouter } from "next/navigation";

/**
 * Componente del botón para eliminar un tablero.
 * 
 * Este componente renderiza un botón que, al hacer clic, elimina el tablero especificado
 * y redirige al usuario a la página principal.
 * 
 * @param {Object} props - Las propiedades del componente.
 * @param {string} props.boardId - El ID del tablero a eliminar.
 * @returns {JSX.Element} - El botón para eliminar el tablero.
 */
export default function BoardDeleteButton({ boardId }: { boardId: string }): JSX.Element {
  const router = useRouter();

  /**
   * Función para eliminar el tablero y redirigir al inicio.
   * 
   * Esta función llama a `deleteBoard` con el ID del tablero y luego redirige a la página principal.
   */
  async function handleDeleteBoard() {
    await deleteBoard(boardId);
    router.push('/');
  }

  return (
    <div>
      <button
        className="bg-red-500 text-white px-4 py-2 rounded-md"
        onClick={() => handleDeleteBoard()}
      >
        Eliminar tablero
      </button>
    </div>
  );
}
