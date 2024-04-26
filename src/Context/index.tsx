import { ReactNode, createContext, useState, Dispatch, SetStateAction, FC } from "react"
import { ContentInterface, UserContextSave } from "../shared/interfaces";
import { useNavigate } from "react-router-dom";

type MediaDVNContextType = {
    permissions: string;
    setPermissions: Dispatch<SetStateAction<string>>;
    login: boolean;
    setLogin: Dispatch<SetStateAction<boolean>>;
    username: UserContextSave;
    setUsername: Dispatch<SetStateAction<UserContextSave>>;
    createForThematicID: string;
    setForCreateThematicID: Dispatch<SetStateAction<string>>;
    signOff: () => void;
    selectedContent: ContentInterface | undefined;
    setSelectedContent: Dispatch<SetStateAction<ContentInterface | undefined>>;

};

export const MediaDVNContext = createContext<MediaDVNContextType | undefined>(undefined);

export const MediaDVNProvider: FC<{ children: ReactNode }> = ({ children }) => {
    const navigate = useNavigate();

    const [permissions, setPermissions] = useState("");
    const [login, setLogin] = useState(false);
    const [username, setUsername] = useState<UserContextSave>({ userID: "", username: "" });
    const [createForThematicID, setForCreateThematicID] = useState("");
    const [selectedContent, setSelectedContent] = useState<ContentInterface>();

    const signOff = () => {
        localStorage.removeItem('user');
        localStorage.removeItem('ROLES');
        setPermissions("");
        setLogin(false);
        setUsername({ userID: "", username: "" })
        setForCreateThematicID("");
        setSelectedContent(undefined)
        navigate("/login");
    }

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
            signOff,
            selectedContent,
            setSelectedContent
        }}>
            {children}
        </MediaDVNContext.Provider>
    )
}