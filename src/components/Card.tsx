'use client';
import { BoardContext } from "@/components/BoardContext";
import PresenceAvatars from "@/components/PresenceAvatars";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useContext, useEffect } from "react";

/**
 * Componente para renderizar una tarjeta.
 * 
 * Este componente muestra una tarjeta con un enlace a su página detallada,
 * maneja la navegación según el estado de la tarjeta abierta y muestra avatares de presencia.
 * 
 * @param {Object} props - Las propiedades del componente.
 * @param {string} props.id - El ID de la tarjeta.
 * @param {string} props.name - El nombre de la tarjeta.
 * @returns {JSX.Element} - El componente de la tarjeta.
 */
export default function Card({ id, name }: { id: string, name: string }): JSX.Element {
  const params = useParams();
  const router = useRouter();
  const { openCard } = useContext(BoardContext);

  useEffect(() => {
    if (params.cardId && !openCard) {
      const { boardId, cardId } = params;
      router.push(`/boards/${boardId}`);
      router.push(`/boards/${boardId}/cards/${cardId}`);
    }
    if (!params.cardId && openCard) {
      router.push(`/boards/${params.boardId}`);
    }
  }, [params.cardId, openCard, params.boardId, router]);

  return (
    <Link
      href={`/boards/${params.boardId}/cards/${id}`}
      className="relative border block bg-white my-2 py-8 px-4 rounded-md">
      <span>{name}</span>
      <div className="absolute bottom-1 right-1">
        <PresenceAvatars presenceKey={'cardId'} presenceValue={id} />
      </div>
    </Link>
  );
}
