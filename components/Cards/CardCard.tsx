import { Card, CardProps, H2, Paragraph, SizableText, Stack, XStack, YStack } from 'tamagui';
import { CardType } from '../../types/Trello';
import { useRouter } from 'expo-router';
import { TouchableOpacity } from 'react-native';
import { useCardUpdate } from '../../context/CardUpdateContext';




interface PreCardCardProps extends CardProps {
    titre: string;
    id: string;
}
interface CardListProps {
    card: CardType;
    onLongPress;
    boardId: string;
    listId: string;
}

export function CardCard({ card, boardId, listId, onLongPress }: CardListProps) {

    const router = useRouter();


    return (

        <PreCardCard
            marginVertical="$1"
            onLongPress={onLongPress}
            borderBottomColor={'rgba(0, 0, 0, 0.15)'}
            borderBottomWidth={"$0.25"}
            animation="lazy"
            pressStyle={{
                scale: 0.95,
            }}
            backgroundColor={"$gray1"}
            minHeight={50}
            borderRadius={"$3"}
            titre={card.title}
            id={card.id}
            onPress={() => {
                router.push("/" + boardId + "/" + listId + "/" + card.id + "/card");
            }}
        />

    );
}

export function PreCardCard({ titre, id, ...props }: PreCardCardProps) {


    return (
        <TouchableOpacity >
            <Card marginHorizontal={"$2"} justifyContent='center' {...props}>
                <XStack marginHorizontal={"$2"}>
                    <SizableText size={"$2"}>{titre}</SizableText>
                </XStack>
            </Card>
        </TouchableOpacity>
    );
}