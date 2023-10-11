import { database } from './firebase'; // Assure-toi que le chemin vers ton fichier firebase.ts est correct
import { ref, push, set, remove, get, update } from 'firebase/database';
import { Board, CardType } from '../types/Trello'; // Assure-toi que le chemin est correct

// Fonction pour ajouter un nouveau tableau
export const addBoard = async (userId: string, boardTitle: string): Promise<string> => {
    const boardsRef = ref(database, `users/${userId}/boards`);
    const newBoardRef = push(boardsRef);
    const newBoard: Board = {
        id: newBoardRef.key!,
        img: "https://firebasestorage.googleapis.com/v0/b/trellotamagui.appspot.com/o/trelloBacground.png?alt=media&token=4479c47d-03e8-4d92-b2a6-d60ac94b9fbd",
        title: boardTitle,
        lists: []
    };
    await set(newBoardRef, newBoard);
    return newBoard.id;
};

// Fonction pour supprimer un tableau par son ID
export const deleteBoard = async (userId: string, boardId: string): Promise<void> => {
    const boardRef = ref(database, `users/${userId}/boards/${boardId}`);
    await remove(boardRef);
};

export const getUserBoards = async (userId: string): Promise<Board[]> => {
    const boardsRef = ref(database, `users/${userId}/boards`);
    try {
        const snapshot = await get(boardsRef);
        if (snapshot.exists()) {
            const boards: Board[] = [];
            snapshot.forEach((childSnapshot) => {
                const boardData = childSnapshot.val();
                const board: Board = {
                    id: childSnapshot.key!,
                    img: boardData.img,
                    title: boardData.title,
                    lists: boardData.lists || []
                };
                boards.push(board);
            });
            return boards;
        } else {
            return [];
        }
    } catch (error) {
        // Gérer les erreurs de récupération des données depuis la base de données
        throw error;
    }

};

export const getBoardById = async (userId: string, boardId: string | string[]): Promise<Board | null> => {
    const boardRef = ref(database, `users/${userId}/boards/${boardId}`);
    try {
        const snapshot = await get(boardRef);
        if (snapshot.exists()) {
            const boardData = snapshot.val();
            const board: Board = {
                id: snapshot.key!,
                img: boardData.img,
                title: boardData.title,
                lists: boardData.lists || []
            };
            return board;
        } else {
            // Retourner null si le tableau n'est pas trouvé
            return null;
        }
    } catch (error) {
        // Gérer les erreurs de récupération des données depuis la base de données
        throw error;
    }


};

// Fonction pour ajouter une nouvelle liste à un tableau
export const addList = async (boardId: string, userId: string, listName: string): Promise<string> => {
    const listsRef = ref(database, `users/${userId}/boards/${boardId}/lists`);
    const newListRef = push(listsRef);
    const newListId = newListRef.key!;
    const newList = {
        id: newListId,
        title: listName,
        cards: [] // Vous pouvez ajouter d'autres propriétés si nécessaire
    };
    await set(newListRef, newList);
    return newListId;
};

// Fonction pour supprimer une liste d'un tableau par son ID
export const deleteList = async (boardId: string, userId: string, listId: string): Promise<void> => {
    const listRef = ref(database, `users/${userId}/boards/${boardId}/lists/${listId}`);
    await remove(listRef);
};

// Fonction pour ajouter une nouvelle carte à une liste
export const addCard = async (userId: string, boardId: string, listId: string, cardTitle: string): Promise<string> => {
    const cardsRef = ref(database, `users/${userId}/boards/${boardId}/lists/${listId}/cards`);
    const newCardRef = push(cardsRef);
    const newCardId = newCardRef.key!;
    const newCard = {
        id: newCardId,
        title: cardTitle,
    };
    await set(newCardRef, newCard);
    return newCardId;
};

// Fonction pour supprimer une carte d'une liste par son ID
export const deleteCard = async (userId: string, boardId: string | string[], listId: string | string[], cardId: string | string[]): Promise<void> => {
    const cardRef = ref(database, `users/${userId}/boards/${boardId}/lists/${listId}/cards/${cardId}`);
    await remove(cardRef);
};

export const updateCardOrder = async (userId, boardId, listId, newCardOrder) => {
    const userRef = ref(database, `users/${userId}/boards/${boardId}/lists/${listId}/cards`);
    await set(userRef, newCardOrder);

};

export const updateBoardImage = async (userId: string, boardId: string, imageUrl: string): Promise<void> => {
    try {
        const boardRef = ref(database, `users/${userId}/boards/${boardId}`);
        await update(boardRef, { img: imageUrl });
    } catch (error) {
        throw error;
    }
};

export const updateBoardTitle = async (userId: string, boardId: string, newTitle: string): Promise<void> => {
    try {
        const boardRef = ref(database, `users/${userId}/boards/${boardId}`);
        await update(boardRef, { title: newTitle });
    } catch (error) {
        throw error;
    }
};

export const getCardById = async (
    userId: string,
    boardId: string | string[],
    listId: string | string[],
    cardId: string | string[]
): Promise<CardType | null> => {
    const cardRef = ref(database, `users/${userId}/boards/${boardId}/lists/${listId}/cards/${cardId}`);
    try {
        const snapshot = await get(cardRef);
        if (snapshot.exists()) {
            const cardData = snapshot.val();
            const card: CardType = {
                id: snapshot.key!,
                title: cardData.title,
            };
            return card;
        } else {
            return null;
        }
    } catch (error) {
        throw error;
    }
};

export const updateCardTitle = async (
    userId: string,
    boardId: string | string[],
    listId: string | string[],
    cardId: string | string[],
    newTitle: string
): Promise<void> => {
    try {
        const cardRef = ref(database, `users/${userId}/boards/${boardId}/lists/${listId}/cards/${cardId}`);
        await update(cardRef, { title: newTitle });
    } catch (error) {
        throw error;
    }
};





