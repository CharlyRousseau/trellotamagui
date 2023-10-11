import { Auth, createUserWithEmailAndPassword, signInWithEmailAndPassword,sendEmailVerification } from "firebase/auth";

interface SignUpHandlerParams {
    email: string;
    password: string;
}

export const signUpHandler = async (auth: Auth, { email, password }: SignUpHandlerParams): Promise<void> => {
    try {
        const userCredential =  await createUserWithEmailAndPassword(auth, email, password);
        // L'inscription a réussi, tu peux gérer les actions à effectuer ici après l'inscription réussie
        await sendEmailVerification(userCredential.user);

    } catch (error) {
        // L'inscription a échoué, gère l'erreur ici (peut-être en la renvoyant pour une gestion spécifique dans le composant)
        throw error;
    }
};


export const loginHandler = async (auth: Auth, { email, password }: SignUpHandlerParams): Promise<void> => {
    try {
        await signInWithEmailAndPassword(auth, email, password);
    } catch (error) {
        throw error;
    }
};
