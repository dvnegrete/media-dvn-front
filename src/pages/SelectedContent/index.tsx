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
    const [buttonDelete, setButtonDelete] = useState(false);
    const [buttonEdit, setButtonEdit] = useState(false);

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

    useEffect(() => {
        setButtonDelete(administratorRole);
        setButtonEdit(allowEditing);
    }, [content])

    const administratorRole = () => context?.permissions === ROLES.Administrator;
    const creatorRole = () => context?.permissions === ROLES.Creator;

    const allowEditing = () => {
        if (administratorRole()) {
            return true;
        } else if (creatorRole()) {
            return content?.userID?._id === context?.username.userID;
        }
        return false;
    }

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

    const handlerEdit = () => {
        console.log("PREPARANDO PANTALLA Para editar Content");
    }

    return (
        <section>
            <h3 className="text-3xl p-4">{content?.title}</h3>
            <div className="py-5 px-2 text-balance">
                {content?.content}
            </div>

            {/* Generar nuevo componente para mostrar el array de "media" */}
            <div className="max-h-64 py-3">
                {
                    content?.media?.map(item => (
                        <img className="max-h-56"
                            src={item}
                        />
                    ))

                }
                {/* {
                    <video src="" />
                }
                {
                    <a href={"pdf"} download={"nombre de archivo.pdf"}></a>
                } */}

            </div>
            <p className="py-6 text-gray-400 text-blue-300 underline">
                Publicado por
                <span className="text-xl mx-3">
                    {content?.userID?.username}
                </span>
            </p>
            <div className="flex justify-evenly">
                {
                    buttonEdit ?
                        <button type="button" onClick={handlerEdit}
                            className="bg-slate-300 text-gray-900"
                        >
                            Editar
                        </button>
                        :
                        <></>
                }
                {
                    buttonDelete ?
                        <button type="button" onClick={handlerDelete}
                            className="bg-slate-300 text-gray-900"
                        >
                            Eliminar Contenido
                        </button>
                        :
                        <></>
                }
            </div>
        </section>
    )
}