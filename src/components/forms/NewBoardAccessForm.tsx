'use client';
import { addEmailToBoard } from "@/app/actions/boardActions";
import { useRouter } from "next/navigation";
import { useRef } from "react";

/**
 * Componente para agregar un nuevo acceso al tablero mediante correo electrónico.
 * 
 * @param {Object} props - Las propiedades del componente.
 * @param {string} props.boardId - El ID del tablero al que se agregará el correo electrónico.
 * @returns {JSX.Element} - El formulario para agregar un correo electrónico al tablero.
 */
export default function NewBoardAccess({ boardId }: { boardId: string }): JSX.Element {
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);

  /**
   * Función para agregar el correo electrónico al tablero.
   * 
   * @param {FormData} formData - Los datos del formulario.
   */
  async function addEmail(formData: FormData) {
    const email = formData.get('email')?.toString() || '';
    await addEmailToBoard(boardId, email);
    if (inputRef.current) {
      inputRef.current.value = '';
    }
    router.refresh();
  }

  return (
    <form action={addEmail} className="max-w-xs">
      <h2 className="text-lg mb-2">Agregar correo electrónico</h2>
      <input
        ref={inputRef}
        type="text"
        placeholder="juan@ejemplo.com"
        name="email"
      />
      <button className="w-full mt-2" type="submit">Guardar</button>
    </form>
  );
}
