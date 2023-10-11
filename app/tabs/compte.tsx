import { Button, Paragraph } from "tamagui";
import { useAuth } from "../../context/AuthContextProvider";

import { MyStack } from "../../components/StyledComponents/MyStack";
import {useRouter } from "expo-router";
import { Alert, Keyboard } from "react-native";


export default function Tab1() {
    
    const router = useRouter();
    const { user, signOutFirebase } = useAuth();
    const handleSignOut = async () => {
        Keyboard.dismiss();
        try {
            await signOutFirebase();
        } catch (error) {
            Alert.alert('Erreur lors de la Connexion', error.message);
        }
    };
   
    if (!user) {
        router.push("/")
    }else
    return (
        <MyStack>
            <Paragraph textAlign="center">
                Email: {user.email}
            </Paragraph>
            <Button onPress={handleSignOut}>
                Deconnexion
            </Button>
        </MyStack >
    );
}
