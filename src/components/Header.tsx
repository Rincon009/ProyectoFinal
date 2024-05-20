import LoginButton from "@/components/LoginButton";
import LogoutButton from "@/components/LogoutButton";
import { authOptions } from "@/lib/authOptions";
import { getServerSession } from "next-auth";
import Link from "next/link";

/**
 * Componente del encabezado.
 * 
 * Este componente renderiza el encabezado de la aplicación, mostrando un logotipo, un saludo al usuario si está autenticado,
 * y botones para iniciar o cerrar sesión según el estado de autenticación.
 * 
 * @returns {Promise<JSX.Element>} - El encabezado de la aplicación.
 */
export default async function Header(): Promise<JSX.Element> {
  const session = await getServerSession(authOptions);

  return (
    <header className="bg-gradient-to-r from-teal-300 to-blue-500 p-4 px-8 shadow-md">

      <div className="flex justify-between items-center">
        <Link href="/">
          <img
            src="../app/img/reino-unido.png"
            alt="PlanPro"
            className="logo-img"
          />
        </Link>
        <div>
          {session ? (
            <>
              Hola, {session.user?.name}
              <LogoutButton />
            </>
          ) : (
            <>
              No está logueado
              <LoginButton />
            </>
          )}
        </div>
      </div>
    </header>
  );
}
