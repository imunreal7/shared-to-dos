import React, { createContext, useState, useEffect } from "react";
import {
    onAuthStateChanged,
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
    User,
} from "firebase/auth";
import { auth } from "../firebase";

interface AuthContextType {
    user: User | null;
    token: string | null;
    login: (email: string, password: string) => Promise<void>;
    signup: (email: string, password: string) => Promise<void>;
    logout: () => Promise<void>;
}

export const AuthContext = createContext<AuthContextType>({
    user: null,
    token: null,
    login: async () => {},
    signup: async () => {},
    logout: async () => {},
});

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [user, setUser] = useState<User | null>(null);
    const [token, setToken] = useState<string | null>(null);

    useEffect(() => {
        return onAuthStateChanged(auth, async (fbUser) => {
            if (fbUser) {
                setUser(fbUser);
                const idToken = await fbUser.getIdToken();
                setToken(idToken);
            } else {
                setUser(null);
                setToken(null);
            }
        });
    }, []);

    async function login(email: string, password: string) {
        const cred = await signInWithEmailAndPassword(auth, email, password);
        setUser(cred.user);
        setToken(await cred.user.getIdToken());
    }

    async function signup(email: string, password: string) {
        const cred = await createUserWithEmailAndPassword(auth, email, password);
        setUser(cred.user);
        setToken(await cred.user.getIdToken());
    }

    async function logout() {
        await auth.signOut();
        setUser(null);
        setToken(null);
    }

    return (
        <AuthContext.Provider value={{ user, token, login, signup, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

