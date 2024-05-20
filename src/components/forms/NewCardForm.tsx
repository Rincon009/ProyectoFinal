'use client';
import { Card, useMutation } from "@/app/liveblocks.config";
import { LiveObject } from "@liveblocks/core";
import { FormEvent } from "react";
import uniqid from "uniqid";

/**
 * Componente para agregar una nueva tarjeta a una columna.
 * 
 * @param {Object} props - Las propiedades del componente.
 * @param {string} props.columnId - El ID de la columna a la que se agregará la tarjeta.
 * @returns {JSX.Element} - El formulario para agregar una nueva tarjeta.
 */
export default function NewCardForm({ columnId }: { columnId: string }): JSX.Element {
  const addCard = useMutation(({ storage }, cardName) => {
    return storage.get('cards').push(
      new LiveObject<Card>({
        name: cardName,
        id: uniqid.time(),
        columnId: columnId,
        index: 9999,
      })
    );
  }, [columnId]);

  /**
   * Maneja el envío del formulario para agregar una nueva tarjeta.
   * 
   * @param {FormEvent} ev - El evento de envío del formulario.
   */
  function handleNewCardFormSubmit(ev: FormEvent) {
    ev.preventDefault();
    const input = (ev.target as HTMLFormElement).querySelector('input');
    if (input) {
      const cardName = input.value;
      addCard(cardName);
      input.value = '';
    }
  }

  return (
    <form onSubmit={handleNewCardFormSubmit}>
      <input type="text" placeholder="Añade una tarjeta" />
    </form>
  );
}
