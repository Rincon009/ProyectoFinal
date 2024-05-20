import React, { createContext, Dispatch, useState } from "react";

export type OpenCardId = string | null;

export type BoardContextProps = {
  openCard?: OpenCardId;
  setOpenCard?: Dispatch<React.SetStateAction<OpenCardId>>;
};

type ProviderProps = {
  children: React.ReactNode;
};

/**
 * Crear el contexto del tablero.
 * 
 * Este contexto permite gestionar el estado de qué tarjeta está abierta en el tablero.
 */
export const BoardContext = createContext<BoardContextProps>({});

/**
 * Proveedor del contexto del tablero.
 * 
 * Este componente provee el contexto del tablero a sus componentes hijos, permitiendo
 * gestionar el estado de qué tarjeta está abierta.
 * 
 * @param {ProviderProps} props - Las propiedades del proveedor.
 * @param {React.ReactNode} props.children - Los componentes hijos que recibirán el contexto del tablero.
 * @returns {JSX.Element} - El proveedor del contexto del tablero.
 */
export function BoardContextProvider({ children }: ProviderProps): JSX.Element {
  // Estado para gestionar qué tarjeta está abierta
  const [openCard, setOpenCard] = useState<OpenCardId>(null);

  return (
    <BoardContext.Provider value={{ openCard, setOpenCard }}>
      {children}
    </BoardContext.Provider>
  );
}
