import Boards from "@/components/Boards";
import LoginView from "@/components/views/LoginView";
import { authOptions } from "@/lib/authOptions";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { getServerSession } from "next-auth";
import Link from "next/link";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";

/**
 * Página principal de la aplicación.
 * 
 * Esta función renderiza la vista principal de la aplicación. Si el usuario no está autenticado,
 * muestra la vista de inicio de sesión. Si el usuario está autenticado, muestra la lista de tableros
 * y un enlace para crear un nuevo tablero.
 * 
 * @returns {JSX.Element} - La vista principal de la aplicación.
 */
export default async function Home(): Promise<JSX.Element> {
  const session = await getServerSession(authOptions);

  if (!session) {
    return <LoginView />;
  }

  return (
    <div>
      <h1 className="text-4xl mb-4">Tus tableros</h1>
      <Boards />
      <div className="mt-4">
        <Link className="btn primary inline-flex gap-2" href={'/new-board'}>
          Crear nuevo tablero <FontAwesomeIcon className="h-6" icon={faArrowRight} />
        </Link>
      </div>
    </div>
  );
}
