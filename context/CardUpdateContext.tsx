import React, { useContext, useState, ReactNode, Dispatch, SetStateAction } from 'react';

interface CardUpdateContextProps {
    isCardUpdated: boolean;
    setIsCardUpdated: Dispatch<SetStateAction<boolean>>;
}

const CardUpdateContext = React.createContext<CardUpdateContextProps | undefined>(undefined);

export const CardUpdateProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [isCardUpdated, setIsCardUpdated] = useState(false);

    return (
        <CardUpdateContext.Provider value={{ isCardUpdated, setIsCardUpdated }}>
            {children}
        </CardUpdateContext.Provider>
    );
};

export const useCardUpdate = (): CardUpdateContextProps => {
    const context = useContext(CardUpdateContext);
    if (context === undefined) {
        throw new Error('useCardUpdate must be used within a CardUpdateProvider');
    }
    return context;
};