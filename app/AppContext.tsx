import * as React from 'react';
import { AppContextType } from './AppContextType';


export const AppContext = React.createContext<AppContextType | null>(null);

const AppProvider: React.FC<any> = ({ children }) => {
    const [session, setSession] = React.useState<any>(null);

    return (
        <AppContext.Provider value={{ session: session, setSession: setSession }}>
            {children}
        </AppContext.Provider>
    );
};

export default AppProvider;