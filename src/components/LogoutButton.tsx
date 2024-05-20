'use client';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { signOut } from "next-auth/react";
import { faArrowRightFromBracket } from "@fortawesome/free-solid-svg-icons";

/**
 * Componente de botón de cierre de sesión.
 * 
 * Este componente renderiza un botón que, al hacer clic, cierra la sesión del usuario.
 * 
 * @returns {JSX.Element} - El botón de cierre de sesión.
 */
export default function LogoutButton(): JSX.Element {
  return (
    <button 
      onClick={() => signOut()}
      className="bg-blue-300 hover:bg-blue-400 text-black py-2 px-4 ml-2 rounded-md inline-flex gap-2 items-center">
      Cerrar sesión
      <FontAwesomeIcon icon={faArrowRightFromBracket} />
    </button>
  );
}
