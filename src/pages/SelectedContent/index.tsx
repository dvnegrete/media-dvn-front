import { useContext, useEffect, useState } from "react";
import { MediaDVNContext } from "../../Context";
import { useParams } from "react-router-dom";
import { getContentID } from "../../service/api";
import { ContentInterface } from "../../shared/interfaces";

export const SelectedContent = () => {
    const { id } = useParams();
    const context = useContext(MediaDVNContext);
    const [content, setContent] = useState<ContentInterface | null>(null);

    useEffect(() => {
        const getContent = async () => {
            if (id !== undefined) {
                const selectedContent = await getContentID(id);
                context?.setSelectedContent(selectedContent);
                setContent(selectedContent);
            }
        }
        getContent();
    }, [])

    return (
        <>
            <h3>{content?.title}</h3>
            <div>
                {content?.content}
            </div>

            {/* Generar nuevo componente para mostrar el array de "media" */}
            <div>
                {
                    content?.media?.map(item => (
                        <img src={item} />
                    ))

                }
                {
                    <video src="" />
                }
                {
                    <a href={"pdf"} download={"nombre de archivo.pdf"}></a>
                }

            </div>
            <h5>Creditos: {content?.userID?.username}</h5>
        </>
    )
}