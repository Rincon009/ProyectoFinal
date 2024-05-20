'use client';
import { Presence, useOthers } from "@/app/liveblocks.config";
import { shallow } from "@liveblocks/core";

type Props = {
  presenceKey: keyof Presence;
  presenceValue: string;
};

/**
 * Componente para mostrar avatares de usuarios presentes.
 * 
 * Este componente renderiza una fila de avatares de los usuarios que tienen un valor específico
 * para una clave de presencia determinada.
 * 
 * @param {Props} props - Las propiedades del componente.
 * @param {keyof Presence} props.presenceKey - La clave de presencia a verificar.
 * @param {string} props.presenceValue - El valor de presencia a comparar.
 * @returns {JSX.Element} - El componente que muestra los avatares de presencia.
 */
export default function PresenceAvatars({ presenceKey, presenceValue }: Props): JSX.Element {
  const others = useOthers(users => {
    return users.filter(u => u.presence?.[presenceKey] === presenceValue);
  }, shallow);

  return (
    <div className="flex gap-1">
      {others.map(user => (
        <div key={user.id}>
          <img
            className="size-8 rounded-full"
            src={user.info.image} 
            alt="avatar"
          />
        </div>
      ))}
    </div>
  );
}
