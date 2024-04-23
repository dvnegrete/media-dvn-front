import { ReactNode, createContext, useState } from "react"

type MediaDVNContextType = {
    permissions: string;
    setPermissions: React.Dispatch<React.SetStateAction<string>>;
    login: boolean;
    setLogin: React.Dispatch<React.SetStateAction<boolean>>;
    username: string;
    setUsername: React.Dispatch<React.SetStateAction<string>>;
    createForThematicID: string;
    setForCreateThematicID: React.Dispatch<React.SetStateAction<string>>;
  };

export const MediaDVNContext = createContext<MediaDVNContextType | undefined>(undefined);

export const MediaDVNProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [permissions, setPermissions] = useState("");
    const [login, setLogin] = useState(false);
    const [username, setUsername] = useState("");
    const [createForThematicID, setForCreateThematicID] = useState("");
   
    return (
        <MediaDVNContext.Provider value={{
            permissions,
            setPermissions,
            login,
            setLogin, 
            username,
            setUsername,
            createForThematicID,
            setForCreateThematicID,
        }}>
            {children}
        </MediaDVNContext.Provider>
    )
}