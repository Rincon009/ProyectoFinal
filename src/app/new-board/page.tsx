'use client';
import { createBoard } from "@/app/actions/boardActions";
import { redirect } from "next/navigation";

/**
 * Página para crear un nuevo tablero.
 * 
 * Esta función renderiza un formulario para crear un nuevo tablero. Al enviar el formulario,
 * se llama a `handleNewBoardSubmit` que crea un nuevo tablero y redirige a la página del tablero creado.
 * 
 * @returns {JSX.Element} - El formulario para crear un nuevo tablero.
 */
export default function NewBoardPage(): JSX.Element {
  /**
   * Maneja el envío del formulario para crear un nuevo tablero.
   * 
   * Esta función obtiene el nombre del tablero del formulario, llama a `createBoard` para crear el tablero,
   * y redirige a la página del nuevo tablero si se crea con éxito.
   * 
   * @param {FormData} formData - Los datos del formulario.
   */
  async function handleNewBoardSubmit(formData: FormData) {
    const boardName = formData.get('name')?.toString() || '';
    const roomInfo = await createBoard(boardName);
    if (roomInfo) {
      redirect(`/boards/${roomInfo.id}`);
    }
  }

  return (
    <div>
      <form action={handleNewBoardSubmit} className="max-w-xs block">
        <h1 className="text-2xl mb-4">Crear nuevo tablero</h1>
        <input type="text" name="name" placeholder="nombre del tablero"/>
        <button type="submit" className="mt-2 w-full">Crear tablero</button>
      </form>
    </div>
  );
}
