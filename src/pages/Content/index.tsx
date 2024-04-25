import { useContext } from "react";
import { ContentContext } from "../../Context/ContentContext";

export const Content = () => {
    const contextContent = useContext(ContentContext);

    return (
        <>
            <h3>{contextContent?.selectedContent?.title}</h3>
            <div>
                {contextContent?.selectedContent?.content}
            </div>

                {/* Generar nuevo componente para mostrar el array de "media" */}
            <div>
                {
                    contextContent?.selectedContent?.media?.map(item => (
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

            <h5>Creditos: {contextContent?.selectedContent?.userID?.username}</h5>
        </>
    )
}