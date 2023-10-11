import React, { useEffect, useState } from 'react';
import { Button, Form, H3, SizeTokens, Spinner, Input } from 'tamagui';
import { Keyboard, Alert } from 'react-native';
import { useRouter, Redirect } from "expo-router";
import { useAuth, AuthProvider } from '../../context/AuthContextProvider'; // Assurez-vous du bon chemin

interface LoginFormProps {
    size?: SizeTokens; // Rendez la taille facultative
}

const LoginForm: React.FC<LoginFormProps> = ({ size = "$4" }) => {
    const [status, setStatus] = useState<'off' | 'submitting' | 'submitted'>('off');
    const { signIn } = useAuth();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const router = useRouter();


    useEffect(() => {
        if (status === 'submitting') {
            const timer = setTimeout(() => setStatus('off'), 2000);
            return () => {
                clearTimeout(timer);
            };
        }
    }, [status]);

    const handleSignIn = async () => {
        Keyboard.dismiss();
        setStatus('submitting');
        try {
            await signIn(email, password);
            router.push("/tabs")
        } catch (error) {
            Alert.alert('Erreur lors de la Connexion', error.message);
        }
    };

    return (
        <Form
            minWidth={300}
            gap="$3"
            onSubmit={() => { }}
            borderRadius="$4"
            backgroundColor="$backgroundTransparent"
            borderColor="$borderColor"
            padding="$8"
        >
            <Input size={size} borderWidth={2} placeholder={`Email`} value={email} onChangeText={setEmail} />
            <Input secureTextEntry={true} size={size} borderWidth={2} placeholder={`Password`} value={password} onChangeText={setPassword} />
            <Button onPress={handleSignIn} icon={status === 'submitting' ? () => <Spinner /> : undefined}>
                Connexion
            </Button>
        </Form>
    );
};

const LoginFormContainer: React.FC<LoginFormProps> = (props) => (
    <LoginForm {...props} />
);

export default LoginFormContainer;
