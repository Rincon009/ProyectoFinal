import { useRoom } from "@/app/liveblocks.config";
import DescriptionEditor from "@/components/DescriptionEditor";
import LiveblocksProvider from "@liveblocks/yjs";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { Doc } from "yjs";

/**
 * Componente para editar la descripción de una tarjeta.
 * 
 * Este componente configura un proveedor de Liveblocks con un documento Yjs y
 * renderiza el componente `DescriptionEditor` para editar la descripción de la tarjeta.
 * 
 * @returns {JSX.Element | null} - El componente para editar la descripción de la tarjeta o `null` si no está listo.
 */
export default function CardDescription(): JSX.Element | null {
  const { cardId } = useParams();
  const room = useRoom();

  const [doc, setDoc] = useState<Doc | null>(null);
  const [provider, setProvider] = useState<LiveblocksProvider<any, any, any, any> | null>(null);

  useEffect(() => {
    const yDoc = new Doc();
    const yProvider = new LiveblocksProvider(room, yDoc);

    setDoc(yDoc);
    setProvider(yProvider);

    return () => {
      yDoc.destroy();
      yProvider.destroy();
    };
  }, [room]);

  if (!doc || !provider) {
    return null;
  }

  return (
    <div>
      <DescriptionEditor
        doc={doc}
        provider={provider}
        cardId={cardId.toString()}
      />
    </div>
  );
}
