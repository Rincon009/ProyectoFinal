'use client';
import { signIn } from "next-auth/react";

/**
 * Componente de botón de inicio de sesión.
 * 
 * Este componente renderiza un botón que, al hacer clic, inicia el proceso de autenticación con Google.
 * 
 * @returns {JSX.Element} - El botón de inicio de sesión.
 */
export default function LoginButton(): JSX.Element {
  return (
    <button 
      onClick={() => signIn('google')}
      className="bg-blue-300 hover:bg-blue-400 py-2 px-4 ml-2 rounded-md">
      Iniciar sesión
    </button>
  );
}
