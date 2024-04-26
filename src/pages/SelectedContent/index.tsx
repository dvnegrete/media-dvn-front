import { useContext, useEffect, useState } from "react";
import { MediaDVNContext } from "../../Context";
import { useNavigate, useParams } from "react-router-dom";
import { deleteContent, getContentID } from "../../service/api";
import { ContentInterface } from "../../shared/interfaces";
import { ROLES } from "../../shared/enum/Roles";

export const SelectedContent = () => {
    const { id } = useParams();
    const navigate = useNavigate();
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
    }, []);

    const administratorRole = () => context?.permissions === ROLES.Administrator;

    const handlerDelete = async () => {
        const deleteConfirm = confirm("¿Estás seguro de que deseas eliminar este contenido?");
        if (deleteConfirm) {
            const result = await deleteContent(id || "");
            if (result.msg === 'Content deleted') {
                navigate("/");
            } else {
                console.error(result)
            }
        }
    }

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
            <p>Creditos: {content?.userID?.username}</p>
            {
                administratorRole() ?
                    <button type="button" onClick={handlerDelete}>
                        Eliminar Contenido
                    </button>
                    :
                    <></>
            }
        </>
    )
}