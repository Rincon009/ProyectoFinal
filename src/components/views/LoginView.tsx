'use client';
import { signIn } from "next-auth/react";

/**
 * Componente de vista de inicio de sesión.
 * 
 * Este componente renderiza un botón que permite al usuario iniciar sesión con Google 
 * utilizando la función `signIn` de `next-auth`.
 * 
 * @returns {JSX.Element} - La vista de inicio de sesión.
 */
export default function LoginView(): JSX.Element {
  return (
    <div className="w-full pt-8 text-center">
      <button
        onClick={() => signIn('google')}
        style={{
          backgroundColor: '#87CEEB', 
     
          padding: '10px 20px',
          border: 'none',
          borderRadius: '5px',
          cursor: 'pointer'
        }}
      >
        Iniciar sesión
      </button>
    </div>
  );
}
