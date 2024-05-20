'use server';

import BoardsTiles from "@/components/BoardsTiles";
import { liveblocksClient } from "@/lib/liveblocksClient";
import { getUserEmail } from "@/lib/userClient";

/**
 * Componente para renderizar los tableros del usuario.
 * 
 * Esta función obtiene el correo electrónico del usuario, recupera los tableros asociados
 * a ese usuario desde Liveblocks, y renderiza el componente `BoardsTiles` con la información
 * de los tableros.
 * 
 * @returns {Promise<JSX.Element>} - El componente `BoardsTiles` con los tableros del usuario.
 */
export default async function Boards(): Promise<JSX.Element> {
  const email = await getUserEmail();
  const { data: rooms } = await liveblocksClient.getRooms({ userId: email });

  return (
    <BoardsTiles boards={rooms} />
  );
}
