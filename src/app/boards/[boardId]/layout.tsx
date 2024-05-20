'use client';
import { RoomProvider } from "@/app/liveblocks.config";
import { BoardContextProvider } from "@/components/BoardContext";
import { LiveList } from "@liveblocks/core";
import { useParams } from "next/navigation";
import React from "react";

type PageProps = {
  children: React.ReactNode,
  modal: React.ReactNode,
}

/**
 * Componente de layout para el tablero.
 * 
 * Este componente proporciona contexto y configuración de sala para un tablero,
 * incluyendo el contexto del tablero y el proveedor de la sala de Liveblocks.
 * 
 * @param {PageProps} props - Las propiedades del componente.
 * @param {React.ReactNode} props.children - Los componentes hijos que se renderizarán dentro del layout.
 * @param {React.ReactNode} props.modal - El componente modal que se renderizará.
 * @returns {JSX.Element} - El layout del tablero con contexto y configuración de sala.
 */
export default function BoardLayout({ children, modal }: PageProps): JSX.Element {
  const params = useParams();
  return (
    <BoardContextProvider>
      <RoomProvider
        id={params.boardId.toString()}
        initialPresence={{}}
        initialStorage={{
          columns: new LiveList(),
          cards: new LiveList(),
        }}>
        {children}
        {modal}
      </RoomProvider>
    </BoardContextProvider>
  );
}
