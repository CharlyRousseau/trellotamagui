import { X, Trash2 } from "@tamagui/lucide-icons";
import { useRouter, useGlobalSearchParams } from "expo-router";
import { XStack, YStack, SizableText, Input, Progress } from "tamagui";
import Swiper from 'react-native-swiper';
import { Board } from '../../types/Trello';
import React, { useEffect, useRef, useState } from "react";
import { useAuth } from "../../context/AuthContextProvider";
import { getBoardById, updateBoardTitle, deleteBoard } from "../../api/boardService";
import AddList from '../../components/AddListModal'
import { CardList } from '../../components/Cards/CardList'
import { ImageBackground, TouchableOpacity } from "react-native";
import { MySafeAreaView } from "../../components/StyledComponents/MySafeAreaView";
import ChangeImageBoard from "../../components/ChangeImageBoardModal";
import { useProgress } from "../../context/ProgressLoadingContext";
import { useCardUpdate } from "../../context/CardUpdateContext";
import { AlertDelete } from "../../components/Delete"



export default function Tab() {
    const router = useRouter();
    const params = useGlobalSearchParams();
    const { user } = useAuth();
    const [board, setBoard] = useState<Board>(null);
    const [refresh, setRefresh] = useState(false);
    const [listsArray, setListsArray] = useState([]);
    const [isEditing, setIsEditing] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const inputRef = useRef(null);
    const { isCardUpdated, setIsCardUpdated } = useCardUpdate();
    const { progress } = useProgress();



    const handleTitleClick = () => {
        setIsEditing(true);
        if (inputRef.current) {
            inputRef.current.focus();
        }
    };

    const handleTitleChange = (newTitle) => {

        setBoard((prevBoard) => ({
            ...prevBoard,
            title: newTitle,
        }));

    };

    const handleInputBlur = async () => {
        try {
            await updateBoardTitle(user.uid, board.id, board.title);
        } catch (error) {
            throw (error)
        }

        setIsEditing(false);

    };

    useEffect(() => {
        const fetchUserBoard = async () => {
            if (user) {
                try {
                    const userBoard = await getBoardById(user.uid, params.board);
                    setBoard(userBoard);
                } catch (error) {
                    console.error('Erreur lors de la récupération des tableaux de l\'utilisateur :', error);
                }
            }
        };
        fetchUserBoard();
        setRefresh(false);
        setIsCardUpdated(false);
    }, [user, params.board, refresh, isCardUpdated, setIsCardUpdated]);

    useEffect(() => {
        if (board && board.lists) {
            const lists = Object.values(board.lists);
            setListsArray(lists);
        }
    }, [board]);

    const handleBoardUptades = () => {
        setRefresh(true);
    };
    const handleBoardDelete = async () => {
        try {
            await deleteBoard(user.uid, board.id);
            router.back()
        } catch (error) {
            throw (error)
        }

    };

    const handleImageLoading = (loading: boolean) => {
        setIsLoading(loading);
        if (!loading) {
            handleBoardUptades();
        }
    }
    return (
        <ImageBackground
            source={{ uri: board ? board.img : null }} resizeMode="cover"
            style={{
                flex: 1,
            }}>
            <MySafeAreaView>

                <XStack backgroundColor="$gray4Dark" marginTop="$-10" justifyContent="space-between">
                    <XStack marginTop="$10" paddingHorizontal="$5" paddingBottom="$1" alignItems="center">
                        <TouchableOpacity onPress={router.back}>
                            <X color="$gray4Light" size="$1" />
                        </TouchableOpacity>
                        <YStack marginLeft="$3">
                            {isEditing ? (
                                <Input
                                    padding={"$-2"}
                                    marginVertical={"$-2.5"}
                                    borderWidth={0}
                                    ref={inputRef}
                                    backgroundColor="$gray4Dark"
                                    color="$gray4Light"
                                    value={board ? board.title : ''}
                                    onChangeText={handleTitleChange}
                                    onBlur={handleInputBlur}
                                />
                            ) : (
                                <TouchableOpacity onPress={handleTitleClick}>
                                    <SizableText theme="alt1" color="$gray4Light">
                                        {board ? board.title : 'Chargement...'}
                                    </SizableText>
                                </TouchableOpacity>
                            )}
                            <SizableText size="$1" theme="alt1" color="$gray8Light">Listes</SizableText>
                        </YStack>
                    </XStack>
                    <XStack marginTop="$10" paddingHorizontal="$5" paddingBottom="$1" alignItems="center" justifyContent="space-between">
                        {board && (
                            <XStack>
                                <ChangeImageBoard boardId={board.id} uid={user.uid} triggerLoading={handleImageLoading}></ChangeImageBoard>
                                <AlertDelete color="white" onAccept={handleBoardDelete}></AlertDelete>
                            </XStack>
                        )}
                    </XStack>
                </XStack>
                <Swiper dotColor="rgba(255, 255, 255, 0.5)"
                    activeDotColor="white" style={{ marginTop: 16 }} showsPagination={true} loop={false} index={0}>
                    {listsArray.length > 0 &&
                        listsArray.map((list) => (
                            <CardList userId={user.uid} boardId={board.id} key={list.id} list={list} lists={listsArray} onCardAdded={handleBoardUptades} />
                        ))
                    }
                </Swiper>
                {isLoading && (
                    <YStack margin="$10" justifyContent="center" alignItems="center">
                        <XStack margin="$2" padding='$2' borderRadius={12} backgroundColor='rgba(0, 0, 0, 0.5)'>
                            <SizableText color="$gray1Light" >Uploading ...</SizableText>
                        </XStack>
                        <Progress value={progress}>
                            <Progress.Indicator backgroundColor={"$green10"} animation="bouncy" />
                        </Progress>
                    </YStack>
                )}
                <XStack justifyContent="center">
                    <AddList uid={user.uid} onListAdded={handleBoardUptades} boardId={board ? board.id : null} />
                </XStack>

            </MySafeAreaView>

        </ImageBackground>
    );
};
