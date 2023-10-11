import { Card, CardProps, YStack, SizableText, XStack, ScrollView, Input } from 'tamagui';
import { List, CardType } from '../../types/Trello';
import { MoreHorizontal } from "@tamagui/lucide-icons"
import DraggableFlatList from 'react-native-draggable-flatlist';
import { CardCard } from './CardCard';
import AddCard from '../AddCardModal';
import React, { useEffect, useRef, useState } from 'react';
import { deleteList, updateCardOrder } from '../../api/boardService';
import { TouchableOpacity } from 'react-native';
import { AlertDelete } from '../Delete';

interface DemoCardProps extends CardProps {
    titre: string;
    id: string;
    cards: CardType[]
    userId: string;
    boardId: string
    lists: List[]
    onCardAdded: () => void;
    onCardOrderChange: (newOrder: CardType[]) => void;
    setCards: React.Dispatch<React.SetStateAction<CardType[]>>;

}
interface CardListProps {
    list: List;
    userId: string;
    boardId: string
    lists: List[]
    onCardAdded: () => void;
}

export function CardList({ onCardAdded, userId, boardId, list, lists }: CardListProps) {
    const [localCards, setLocalCards] = useState<CardType[]>(list.cards);


    useEffect(() => {
        setLocalCards(list.cards);
    }, [list.cards]);

    const handleCardOrderChange = (newOrder: CardType[]) => {
        setLocalCards(newOrder);
    };

    return (
        <PreListCard
            animation="bouncy"
            marginHorizontal="$4"
            size="$4"
            backgroundColor={"$gray4"}
            scale={0.9}
            pressStyle={{ scale: 0.95 }}
            titre={list.title}
            id={list.id}
            cards={localCards}
            setCards={setLocalCards}
            userId={userId}
            boardId={boardId}
            lists={lists}
            onCardAdded={onCardAdded}
            onCardOrderChange={handleCardOrderChange}
        />

    );
}

export function PreListCard({ onCardAdded, userId, boardId, cards, titre, id, lists, setCards, onCardOrderChange, ...props }: DemoCardProps) {

    const [localTitle, setLocalTitle] = useState<string>(titre);

    useEffect(() => {
        setCards(cards);
    }, [cards, setCards]);

    useEffect(() => {
        setLocalTitle(titre);
    }, [titre]);

    const [isEditing, setIsEditing] = useState(false);
    const inputRef = useRef(null);


    const handleTitleClick = () => {
        setIsEditing(true);
        if (inputRef.current) {
            inputRef.current.focus();
        }
    };

    const handleTitleChange = (newTitle) => {
        setLocalTitle(newTitle);
    };

    const handleInputBlur = async () => {
        try {
            console.log("ca marche");
        } catch (error) {
            throw (error)
        }

        setIsEditing(false);

    };
    const handleListDelete = async () => {
        try {
            await deleteList(boardId, userId, id);
            onCardAdded();
        } catch (error) {
            throw (error)
        }

    };

    return (
        <Card {...props}>
            <Card.Header padded>
                <XStack justifyContent="space-between">
                    {isEditing ? (
                        <Input
                            padding={"$-2"}
                            marginVertical={"$-2"}
                            borderWidth={0}
                            ref={inputRef}
                            backgroundColor="$gray4"
                            value={localTitle}
                            onChangeText={handleTitleChange}
                            onBlur={handleInputBlur}
                        />
                    ) : (
                        <TouchableOpacity onPress={handleTitleClick}>
                            <SizableText>{localTitle}</SizableText>
                        </TouchableOpacity>
                    )}
                    <XStack>
                        <MoreHorizontal onPress={() => console.log("More menu liste")}></MoreHorizontal>
                        <AlertDelete color="" onAccept={handleListDelete}></AlertDelete>
                    </XStack>
                </XStack>
            </Card.Header>
            <YStack maxHeight={400} >
                {cards && (
                    <DraggableFlatList
                        showsVerticalScrollIndicator={false}
                        data={Object.values(cards)}
                        renderItem={({ item, drag }) => (
                            <CardCard boardId={boardId} listId={id} card={item} onLongPress={drag} />
                        )}
                        keyExtractor={(item) => item.id.toString()}
                        onDragEnd={({ data }) => {
                            onCardOrderChange(data);
                            updateCardOrder(userId, boardId, id, data).then(() => {
                            }).catch((error) => {
                                console.error('Erreur lors de la mise à jour de l\'ordre des cartes :', error);
                            });
                            onCardAdded();
                        }}
                    />
                )}
            </YStack>
            <Card.Footer paddingLeft="$3">
                <AddCard listId={id} uid={userId} onCardAdded={onCardAdded} boardId={boardId} />
            </Card.Footer>
        </Card>
    );
}