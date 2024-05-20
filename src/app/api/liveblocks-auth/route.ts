import { authOptions } from "@/lib/authOptions";
import { liveblocksClient } from "@/lib/liveblocksClient";
import { getServerSession } from "next-auth";

/**
 * Maneja la solicitud POST para identificar a un usuario.
 * 
 * Esta función verifica si el usuario está autorizado a través de la sesión,
 * y luego utiliza la API de Liveblocks para identificar al usuario.
 * 
 * @param {Request} request - La solicitud HTTP.
 * @returns {Promise<Response>} - La respuesta HTTP.
 */
export async function POST(request: Request): Promise<Response> {
  const session = await getServerSession(authOptions);

  // Verificar si el usuario está autorizado
  if (!session || !session.user) {
    return new Response('No autorizado', { status: 401 });
  }

  const user = session.user;
  const email = user.email || '';

  // Identificar al usuario en Liveblocks
  const { status, body } = await liveblocksClient.identifyUser(
    {
      userId: email,
      groupIds: [],
    },
    {
      userInfo: {
        name: user.name || '',
        email: email,
        image: user.image,
      },
    }
  );

  return new Response(body, { status });
}
