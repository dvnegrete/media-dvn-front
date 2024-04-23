import { ReactNode, createContext, useState } from "react"
import { ROLES } from "../shared/enum/Roles";

export const MediaDVNContext = createContext({});

export const MediaDVNProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [permissions, setPermissions] = useState<ROLES>(ROLES.READ_ROLE);
    return (
        <MediaDVNContext.Provider value={{
            permissions,
            setPermissions
        }}>
            {children}
        </MediaDVNContext.Provider>
    )
}