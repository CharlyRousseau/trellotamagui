import { YStack, ScrollView } from "tamagui";
import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContextProvider';
import { getUserBoards } from '../../api/boardService';
import { Board } from '../../types/Trello';
import AddBoard from '../../components/AddBoardModal'
import { CardBoard } from '../../components/Cards/CardBoard'
import { useFocusEffect, useRouter } from "expo-router";
import { RefreshControl } from "react-native";

export default function Tab1() {
  const { user } = useAuth();
  const [boards, setBoards] = useState<Board[]>([]);
  const [boardAdded, setBoardAdded] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  const router = useRouter();
  const fetchUserBoards = async () => {
    if (user) {
      try {
        const userBoards = await getUserBoards(user.uid);
        setBoards(userBoards);
      } catch (error) {
        console.error('Erreur lors de la récupération des tableaux de l\'utilisateur :', error);
      }
    }
  };

  useFocusEffect(
    React.useCallback(() => {
      fetchUserBoards();
      setBoardAdded(false);
    }, [user, boardAdded])
  );

  const handleBoardAdded = () => {
    setBoardAdded(true);
  };

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    fetchUserBoards()
      .then(() => setRefreshing(false))
      .catch(error => {
        console.error('Erreur lors de la récupération des tableaux de l\'utilisateur :', error);
        setRefreshing(false);
      });
  }, [user, boardAdded]);

  if (!user) {
    router.push("/")
    return null;
  }

  return (
    <YStack backgroundColor="$backgroundStrong"
      flex={1}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={{ flex: 1 }}
        contentContainerStyle={{ flexGrow: 1 }}
        backgroundColor="$backgroundStrong"
        $sm={{ flexDirection: 'column' }}
        paddingHorizontal="$4"
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
          />
        }
      >
        {boards.map(board => (
          <CardBoard key={board.id} bord={board} />
        ))}
      </ScrollView>
      <YStack margin="$4">
        <AddBoard uid={user.uid} onBoardAdded={handleBoardAdded} />
      </YStack >
    </YStack>
  );
}
