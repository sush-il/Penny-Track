import { createContext, useState, ReactNode, useContext } from 'react';
import { authorizeUser } from './authFunctions';
import React from 'react';

interface User {
    id: string;
    username: string;
}

interface authContextProps {
    isAuthenticated: boolean;
    currentUser: User | null;
    login: (username: string, password: string) => Promise<void>;
}

interface AuthProviderProps {
    children: ReactNode;
}


export const AuthContext = createContext<authContextProps | undefined>(undefined)

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
    const [currentUser, setCurrentUser] = useState<User | null>(null);

    const login = async (username: string, password: string) => {
        const user = await authorizeUser(username, password);
        if (user) {
            setIsAuthenticated(true);
            setCurrentUser(user);
        }
    };

    return (
        <AuthContext.Provider value={{ isAuthenticated, currentUser, login }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};
