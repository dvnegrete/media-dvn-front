import { Dispatch, FC, ReactNode, SetStateAction, createContext, useState } from "react";
import { ContentInterface } from "../shared/interfaces";

type ContentContextType = {
    selectedContent: ContentInterface | undefined;
    setSelectedContent: Dispatch<SetStateAction<ContentInterface | undefined>>;
}

export const ContentContext = createContext<ContentContextType | undefined>(undefined);

export const ContentProvider: FC<{ children: ReactNode }> = ({ children }) => {
    const [selectedContent, setSelectedContent] = useState<ContentInterface>();
    return (
        <ContentContext.Provider value={{
            selectedContent,
            setSelectedContent
        }}>
            {children}
        </ContentContext.Provider>
    )
}