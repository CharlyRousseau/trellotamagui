import { useEffect, useState, useContext } from 'react'
import { getAuth } from "firebase/auth";
import { Button, Form, H3, SizeTokens, Spinner, Input } from 'tamagui'
import { signUpHandler } from '../../api/connect';
import { Keyboard, Alert } from 'react-native';
import { app } from '../../api/firebase';

import React from 'react';



export function InscriptionForm(props: { size: SizeTokens }) {

    const [status, setStatus] = useState<'off' | 'submitting' | 'submitted'>('off')

    useEffect(() => {
        if (status === 'submitting') {

            const timer = setTimeout(() => setStatus('off'), 2000)

            return () => {
                clearTimeout(timer)

            }

        }

    }, [status])

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');


    const handleSignUp = async () => {
        Keyboard.dismiss();
        setStatus("submitting")
        if (password !== confirmPassword) {
            Alert.alert('Erreur lors de l\'inscription', 'Les mots de passe ne correspondent pas.');
            return;
        }

        try {
            const auth = getAuth(app);
            await signUpHandler(auth, { email, password });
            Alert.alert('Inscription réussie !');
        } catch (error) {
            Alert.alert('Erreur lors de l\'inscription', error.message);
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
            <Input size="$4" borderWidth={2} placeholder={`Email`} value={email} onChangeText={setEmail} />
            <Input textContentType="none" secureTextEntry={true} size="$4" borderWidth={2} placeholder={`Password`} value={password} onChangeText={setPassword} />
            <Input textContentType="none" secureTextEntry={true} size="$4" borderWidth={2} placeholder={`Confirm Password`} value={confirmPassword} onChangeText={setConfirmPassword} />
            <Button onPress={handleSignUp} icon={status === 'submitting' ? () => <Spinner /> : undefined}>
                Inscription
            </Button>
        </Form>

    )

}
