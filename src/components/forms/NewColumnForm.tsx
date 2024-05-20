'use client';

import { useMutation } from "@/app/liveblocks.config";
import { LiveObject } from "@liveblocks/core";
import { FormEvent } from "react";
import uniqid from "uniqid";

/**
 * Componente para agregar una nueva columna.
 * 
 * Este componente renderiza un formulario que permite agregar una nueva columna al almacenamiento de Liveblocks.
 * 
 * @returns {JSX.Element} - El formulario para agregar una nueva columna.
 */
export default function NewColumnForm(): JSX.Element {
  // Función para añadir una nueva columna
  const addColumn = useMutation(({ storage }, columnName) => {
    return storage.get('columns').push(
      new LiveObject({
        name: columnName,
        id: uniqid.time(),
        index: 9999,
      })
    );
  }, []);

  /**
   * Maneja el envío del formulario para crear una columna.
   * 
   * @param {FormEvent} ev - El evento de envío del formulario.
   */
  function handleNewColumn(ev: FormEvent) {
    ev.preventDefault();
    const input = (ev.target as HTMLFormElement).querySelector('input');
    if (input) {
      const columnName = input?.value;
      addColumn(columnName);
      input.value = '';
    }
  }

  return (
    <form onSubmit={handleNewColumn} className="max-w-xs">
      <label className="block">
        <span className="text-gray-50 block">Nombre de la columna:</span>
        <input type="text" placeholder="nombre de la nueva columna" />
      </label>
      <button type="submit" className="mt-2 block w-full">Crear columna</button>
    </form>
  );
}
