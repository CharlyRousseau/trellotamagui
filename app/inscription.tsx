import { InscriptionForm } from "../components/Auth/Inscription";
import { ArrowLeft } from "@tamagui/lucide-icons";
import { useRouter } from "expo-router";
import { MyStack } from "../components/StyledComponents/MyStack";
import { Button, H3, XStack } from "tamagui";
import { MySafeAreaView } from "../components/StyledComponents/MySafeAreaView";



export default function Inscription() {

    const router = useRouter();

    return (
        <MySafeAreaView backgroundColor={"$backgroundStrong"}>

            <MyStack justifyContent="flex-start">
                <XStack
                    alignItems="center"
                    space="$4"
                >
                    <Button
                        icon={ArrowLeft}
                        onPress={router.back}
                    />
                    <H3>Inscription page</H3>
                </XStack>
                <InscriptionForm size={"$4"} />
            </MyStack>
        </MySafeAreaView>

    );
}