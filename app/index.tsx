import { useRouter } from "expo-router";
import { Button, H2, Paragraph, Image, YStack } from "tamagui";
import { MyStack } from "../components/StyledComponents/MyStack";
import { MySafeAreaView } from "../components/StyledComponents/MySafeAreaView";

export default function Home() {
  const router = useRouter();

  return (
    <MySafeAreaView backgroundColor={"$backgroundStrong"}>
      <MyStack >
        <YStack
          space="$4"
          maxWidth={600}
        >
          <H2 textAlign="center">TrelloTamagui</H2>
          <Paragraph textAlign="center">
            A Trello clone crafted with tamagui
          </Paragraph>
        </YStack>
        <YStack alignItems="center">
          <Image
            source={{ width: 300, height: 200, uri: require('./../assets/tamagui.png') }}
          />
        </YStack>

        <YStack space="$2.5">
          <Button onPress={() => router.push("/inscription")}>Inscription</Button>
          <Button onPress={() => router.push("/login")}>Login</Button>
        </YStack>
      </MyStack>
    </MySafeAreaView>
  );
}
