import { faClose } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

/**
 * Componente de botón de cancelar.
 * 
 * Este componente renderiza un botón con un icono de cerrar y el texto "Cancelar".
 * Al hacer clic en el botón, se llama a la función `onClick` proporcionada.
 * 
 * @param {Object} props - Las propiedades del componente.
 * @param {Function} props.onClick - La función a llamar cuando se hace clic en el botón.
 * @returns {JSX.Element} - El botón de cancelar.
 */
export default function CancelButton({ onClick }: { onClick: () => void }): JSX.Element {
  return (
    <button
      className="mt-4 w-full flex gap-2 items-center justify-center uppercase text-sm text-gray-400"
      onClick={onClick}>
      <FontAwesomeIcon icon={faClose} />
      Cancelar
    </button>
  );
}
