'use client';
import { RoomProvider } from "@/app/liveblocks.config";
import PresenceAvatars from "@/components/PresenceAvatars";
import { RoomInfo } from "@liveblocks/node";
import Link from "next/link";

/**
 * Componente para renderizar los tableros en forma de mosaico.
 * 
 * Este componente muestra una cuadrícula de tableros, cada uno con un enlace a la página del tablero
 * correspondiente y un indicador de presencia.
 * 
 * @param {Object} props - Las propiedades del componente.
 * @param {RoomInfo[]} props.boards - La lista de tableros a mostrar.
 * @returns {JSX.Element} - El componente de mosaico de tableros.
 */
export default function BoardsTiles({ boards }: { boards: RoomInfo[] }): JSX.Element {
  return (
    <>
      <div className="my-4 grid md:grid-cols-3 lg:grid-cols-4 gap-2">
        {boards?.length > 0 && boards.map(board => (
          <Link
            className="bg-white px-8 py-12 rounded-md block relative bordered-3d"
            href={`/boards/${board.id}`}
            key={board.id}>
            {board.metadata.boardName}
            <RoomProvider id={board.id} initialPresence={{}}>
              <div className="absolute bottom-1 right-1">
                <PresenceAvatars presenceKey={'boardId'} presenceValue={board.id} />
              </div>
            </RoomProvider>
          </Link>
        ))}
      </div>
    </>
  );
}
