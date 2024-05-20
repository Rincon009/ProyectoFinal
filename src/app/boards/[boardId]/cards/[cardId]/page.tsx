import BoardPage from "@/app/boards/[boardId]/page";

type PageProps = {
  params: {
    boardId: string;
    cardId: string;
  };
};

/**
 * Página que renderiza el componente BoardPage con los parámetros de la tarjeta.
 * 
 * @param {PageProps} props - Las propiedades de la página.
 * @param {Object} props.params - Los parámetros de la URL.
 * @param {string} props.params.boardId - El ID del tablero.
 * @param {string} props.params.cardId - El ID de la tarjeta.
 * @returns {JSX.Element} - El componente BoardPage renderizado con los parámetros dados.
 */
export default function CardPage({ params }: PageProps): JSX.Element {
  return (
    <BoardPage params={params} />
  );
}
