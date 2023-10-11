import { Card, CardProps, H6, Image, Stack, XStack } from 'tamagui';
import { Board } from '../../types/Trello';
import { useRouter } from "expo-router";
import { ImageBackground, TouchableOpacity, View } from 'react-native';



interface DemoCardProps extends CardProps {
    titre: string;
    uri: string;
    id: string;
}
interface CardBoardProps {
    bord: Board;
}

export function CardBoard({ bord }: CardBoardProps) {

    const router = useRouter();

    return (
        <DemoCard
            onPress={() => { router.push("/" + bord.id + "/board"); }}
            animation="bouncy"
            size="$4"
            backgroundColor={"$backgroundTransparent"}
            height={100}
            scale={0.9}
            hoverStyle={{ scale: 0.925 }}
            pressStyle={{ scale: 0.875 }}
            titre={bord.title}
            uri={bord.img}
            id={bord.id}
        />

    );
}

export function DemoCard({ uri, titre, id, ...props }: DemoCardProps) {

    return (
        <TouchableOpacity >
            <Card marginTop="$2" size="$3" bordered={2} {...props} overflow='hidden'>
                <Card.Header padded>
                    <H6 >{titre}</H6>
                </Card.Header>
                <Card.Background backgroundColor={"$backgroundStrong"}>
                    <Image
                        resizeMode="cover"
                        opacity={0.9}
                        style={{
                            borderRadius: 8,
                        }}
                        source={{
                            height: 96,
                            uri: uri,
                        }}
                    />
                </Card.Background>
                <Card.Footer padded>
                    <XStack flex={1} />
                </Card.Footer>
            </Card>
        </TouchableOpacity >

    );
}
