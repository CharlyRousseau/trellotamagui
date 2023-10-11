import React, { createContext, useContext, ReactNode, useState } from 'react';

interface ProgressContextProps {
    progress: number;
    setProgress: React.Dispatch<React.SetStateAction<number>>;
}

const ProgressContext = createContext<ProgressContextProps | undefined>(undefined);

export const ProgressProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [progress, setProgress] = useState<number>(0);

    return (
        <ProgressContext.Provider value={{ progress, setProgress }}>
            {children}
        </ProgressContext.Provider>
    );
};

export const useProgress = (): ProgressContextProps => {
    const context = useContext(ProgressContext);
    if (context === undefined) {
        throw new Error('useProgress must be used within a ProgressProvider');
    }
    return context;
};