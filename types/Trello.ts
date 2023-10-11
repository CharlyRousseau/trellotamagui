interface CardType {
    id: string;
    title: string;
}

interface List {
    id: string;
    title: string;
    cards: CardType[];
}

interface Board {
    id: string;
    title: string;
    img: string;
    lists: List[];
}

interface User {
    id: string;
    email: string;
    boards: Board[];
}

export { CardType, List, Board, User };
