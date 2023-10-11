import { useRouter, useGlobalSearchParams } from "expo-router";
import { YStack, SizableText, XStack, Button, H3, Input, } from "tamagui";
import React, { useEffect, useRef, useState } from "react";
import { useAuth } from "../../../../context/AuthContextProvider";
import { getCardById, updateCardTitle, deleteCard } from "../../../../api/boardService";
import { CardType } from '../../../../types/Trello';
import { MySafeAreaView } from "../../../../components/StyledComponents/MySafeAreaView";
import { MyStack } from "../../../../components/StyledComponents/MyStack";
import { ArrowLeft } from "@tamagui/lucide-icons";
import { TouchableOpacity } from "react-native";
import { useCardUpdate } from "../../../../context/CardUpdateContext";
import { AlertDelete } from "../../../../components/Delete";




export default function CardDetails() {
    const router = useRouter();
    const params = useGlobalSearchParams();
    const { user } = useAuth();
    const [card, setCard] = useState<CardType>(null);
    const [refresh, setRefresh] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const inputRef = useRef(null);
    const { setIsCardUpdated } = useCardUpdate();



    const handleTitleClick = () => {
        setIsEditing(true);
        if (inputRef.current) {
            inputRef.current.focus();
        }
    };

    const handleTitleChange = (newTitle) => {
        setCard((prevBoard) => ({
            ...prevBoard,
            title: newTitle,
        }));
    };

    const handleInputBlur = async () => {
        try {
            updateCardTitle(user.uid, params.board, params.list, params.card, card.title);
            setIsCardUpdated(true);
        } catch (error) {
            throw (error)
        }

        setIsEditing(false);

    };

    useEffect(() => {
        const fetchCard = async () => {
            if (user) {
                try {
                    const cardFetch = await getCardById(user.uid, params.board, params.list, params.card);
                    setCard(cardFetch);
                } catch (error) {
                    console.error('Erreur lors de la récupération des tableaux de l\'utilisateur :', error);
                }
            }
        };

        fetchCard();
        setRefresh(false);
    }, [user, params.card, refresh]);

    const handleCardDelete = async () => {
        try {
            await deleteCard(user.uid, params.board, params.list, params.card);
            router.back()
            setIsCardUpdated(true);

        } catch (error) {
            throw (error)
        }

    };


    return (
        <MySafeAreaView>
            <MyStack justifyContent="flex-start">
                <XStack
                    alignItems="center"
                    space="$4"
                >
                    <Button
                        icon={ArrowLeft}
                        onPress={router.back}
                    />
                    <YStack marginLeft="$3">
                        {isEditing ? (
                            <Input
                                marginHorizontal={"$-5"}
                                marginVertical={"$-4.5"}
                                borderWidth={0}
                                size={"$6"}
                                ref={inputRef}
                                backgroundColor="$backgroundStrong"
                                value={card ? card.title : ''}
                                onChangeText={handleTitleChange}
                                onBlur={handleInputBlur}
                            />
                        ) : (
                            <TouchableOpacity onPress={handleTitleClick}>
                                <SizableText size={"$6"}>
                                    {card ? card.title : 'Chargement...'}
                                </SizableText>
                            </TouchableOpacity>
                        )}
                    </YStack>
                    <AlertDelete color="" onAccept={handleCardDelete}></AlertDelete>
                </XStack>

            </MyStack>

        </MySafeAreaView>
    );
};
