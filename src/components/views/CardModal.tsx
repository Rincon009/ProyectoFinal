'use client';
import { useUpdateMyPresence } from "@/app/liveblocks.config";
import CardModalBody from "@/components/CardModalBody";
import { useParams, useRouter } from "next/navigation";
import "@liveblocks/react-comments/styles.css";
import { useEffect } from "react";

/**
 * Componente para mostrar un modal de tarjeta.
 * 
 * Este componente muestra un modal de tarjeta con un fondo oscuro. Actualiza la presencia del usuario 
 * cuando se muestra la tarjeta y maneja el cierre del modal al hacer clic en el fondo.
 * 
 * @returns {JSX.Element} - El modal de tarjeta.
 */
export default function CardModal(): JSX.Element {
  const router = useRouter();
  const params = useParams();
  const updateMyPresence = useUpdateMyPresence();

  /**
   * Maneja el clic en el fondo del modal para cerrarlo.
   */
  function handleBackdropClick() {
    router.back();
  }

  useEffect(() => {
    if (params.cardId) {
      updateMyPresence({ cardId: params.cardId.toString() });
    }
  }, [params, updateMyPresence]);

  return (
    <>
      <div className="fixed inset-0 bg-white/70 z-10"></div>
      <div className="absolute inset-0 z-20 w-full" onClick={handleBackdropClick}>
        <div className="">
          <div className="bg-white max-w-sm my-8 px-4 p-1 mx-auto rounded-md">
            <div onClick={ev => ev.stopPropagation()}>
              <CardModalBody />
            </div>
          </div>
          <div>&nbsp;</div>
        </div>
      </div>
    </>
  );
}
