'use client';
import { Column, useMutation, useStorage } from "@/app/liveblocks.config";
import NewColumnForm from "@/components/forms/NewColumnForm";
import { LiveList, LiveObject, shallow } from "@liveblocks/core";
import { ReactSortable } from "react-sortablejs";
import { default as BoardColumn } from '@/components/Column';

/**
 * Componente para renderizar las columnas de un tablero.
 * 
 * Este componente permite mostrar, reordenar y añadir columnas en el tablero utilizando Liveblocks para la sincronización en tiempo real.
 * 
 * @returns {JSX.Element | undefined} - El componente de las columnas del tablero, o `undefined` si no hay columnas.
 */
export default function Columns(): JSX.Element | undefined {
  const columns = useStorage(root => root.columns.map(c => ({ ...c })), shallow);

  const updateColumns = useMutation(({ storage }, columns: LiveObject<Column>[]) => {
    storage.set('columns', new LiveList(columns));
  }, []);

  /**
   * Establece el nuevo orden de las columnas.
   * 
   * @param {Column[]} sortedColumns - Las columnas ordenadas.
   */
  function setColumnsOrder(sortedColumns: Column[]) {
    const newColumns: LiveObject<Column>[] = [];
    sortedColumns.forEach((sortedColumn, newIndex) => {
      const newSortedColumn = { ...sortedColumn };
      newSortedColumn.index = newIndex;
      newColumns.push(new LiveObject(newSortedColumn));
    });
    updateColumns(newColumns);
  }

  if (!columns) {
    return;
  }

  return (
    <div className="flex gap-4">
      <ReactSortable
        group={'board-column'}
        list={columns}
        className="flex gap-4"
        ghostClass="opacity-40"
        setList={setColumnsOrder}>
        {columns?.length > 0 && columns.map(column => (
          <BoardColumn
            key={column.id}
            {...column}
          />
        ))}
      </ReactSortable>
      <NewColumnForm />
    </div>
  );
}
