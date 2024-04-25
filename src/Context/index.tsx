import { ReactNode, createContext, useState, Dispatch, SetStateAction, FC } from "react"
import { UserContextSave } from "../shared/interfaces";

type MediaDVNContextType = {
    permissions: string;
    setPermissions: Dispatch<SetStateAction<string>>;
    login: boolean;
    setLogin: Dispatch<SetStateAction<boolean>>;
    username: UserContextSave;
    setUsername: Dispatch<SetStateAction<UserContextSave>>;
    createForThematicID: string;
    setForCreateThematicID: Dispatch<SetStateAction<string>>;
  };

export const MediaDVNContext = createContext<MediaDVNContextType | undefined>(undefined);

export const MediaDVNProvider: FC<{ children: ReactNode }> = ({ children }) => {
    const [permissions, setPermissions] = useState("");
    const [login, setLogin] = useState(false);
    const [username, setUsername] = useState<UserContextSave>({userID:"", username:""});
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