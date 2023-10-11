import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { auth } from '../api/firebase';

interface AuthContextType {
    user: User | null;
    signIn: (email: string, password: string) => Promise<void>;
    signOutFirebase: () => void;
}

interface User {
    email: string;
    uid: string;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};

interface AuthProviderProps {
    children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
    const [user, setUser] = useState<User>(null);

    const signIn = async (email: string, password: string) => {

        try {
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            const loggedUser = { email: userCredential.user.email, uid: userCredential.user.uid }
            setUser(prevUser => ({ ...prevUser, ...loggedUser }));
        } catch (error) {
            throw error;
        }
    };

    const signOutFirebase = async () => {
        try {
            await signOut(auth);
            setUser(null)
        } catch (error) {
            throw error;
        }
    };

    return (
        <AuthContext.Provider value={{ user, signIn, signOutFirebase }}>
            {children}
        </AuthContext.Provider>
    );
};

