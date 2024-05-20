'use client';
import { updateBoard } from "@/app/actions/boardActions";
import { RoomProvider, useUpdateMyPresence } from "@/app/liveblocks.config";
import { BoardContextProvider } from "@/components/BoardContext";
import Columns from "@/components/Columns";
import { faCog } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { LiveList } from "@liveblocks/core";
import { ClientSideSuspense } from "@liveblocks/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FormEvent, useEffect, useState } from "react";

/**
 * Componente para renderizar un tablero.
 * 
 * Este componente maneja la lógica para mostrar y actualizar el nombre de un tablero,
 * y proporciona el contexto necesario para interactuar con Liveblocks.
 * 
 * @param {Object} props - Las propiedades del componente.
 * @param {string} props.id - El ID del tablero.
 * @param {string} props.name - El nombre del tablero.
 * @returns {JSX.Element} - El componente de tablero.
 */
export default function Board({ id, name }: { id: string, name: string }): JSX.Element {
  const [renameMode, setRenameMode] = useState(false);
  const router = useRouter();
  const updateMyPresence = useUpdateMyPresence();

  useEffect(() => {
    updateMyPresence({ boardId: id });

    return () => {
      updateMyPresence({ boardId: null });
    };
  }, [id, updateMyPresence]);

  /**
   * Maneja el envío del formulario para cambiar el nombre del tablero.
   * 
   * @param {FormEvent} ev - El evento de envío del formulario.
   */
  async function handleNameSubmit(ev: FormEvent) {
    ev.preventDefault();
    const input = (ev.target as HTMLFormElement).querySelector('input');
    if (input) {
      const newName = input.value;
      await updateBoard(id, { metadata: { boardName: newName } });
      input.value = '';
      setRenameMode(false);
      router.refresh();
    }
  }

  return (
    <BoardContextProvider>
      <RoomProvider
        id={id}
        initialPresence={{
          cardId: null,
          boardId: null,
        }}
        initialStorage={{
          columns: new LiveList(),
          cards: new LiveList(),
        }}
      >
        <ClientSideSuspense fallback={<div>cargando...</div>}>{() => (
          <>
            <div className="flex gap-2 justify-between items-center mb-4">
              <div>
                {!renameMode && (
                  <h1 className="text-2xl" onClick={() => setRenameMode(true)}>
                    Tablero: {name}
                  </h1>
                )}
                {renameMode && (
                  <form onSubmit={handleNameSubmit}>
                    <input type="text" defaultValue={name} />
                  </form>
                )}
              </div>
              <Link
                className="flex gap-2 items-center bg-blue-300 hover:bg-blue-400 text-black py-2 px-4 rounded-md"
                href={`/boards/${id}/settings`}
              >
                <FontAwesomeIcon icon={faCog} />
                Configuración del tablero
              </Link>
            </div>
            <Columns />
          </>
        )}
        </ClientSideSuspense>
      </RoomProvider>
    </BoardContextProvider>
  );
}
