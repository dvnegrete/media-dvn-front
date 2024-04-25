import { ContentInterface } from "../../shared/interfaces"

export const Content = ({ title, content, media, userID }: ContentInterface) => {

    return (
        <>
            <h3>{title}</h3>
            <div>
                {content}
            </div>

                {/* Generar nuevo componente para mostrar el array de "media" */}
            <div>
                {
                    media?.map(item => (
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

            <h5>Creditos: {userID?.username}</h5>
        </>
    )
}