import { useContext, useEffect, useState, ChangeEvent } from "react";
import { useNavigate } from "react-router-dom";
import { ThemeInterface } from "../../shared/interfaces/Theme.Interface";
import { getTheme } from "../../service/api";
import { postContent } from "../../service/api";
import { CustomInput } from "../CustomInput";
import { ListUploadFiles } from "../ListUploadFiles";
import { MediaDVNContext } from "../../Context";
import { SkeletonCard } from "../SkeletonCard";

export const FormNewContent = () => {

    const context = useContext(MediaDVNContext);
    const navigate = useNavigate();
    const [IsErrorMsg, setIsErrorMsg] = useState(false);
    const [msgError, setmsgError] = useState("");

    const [inputTitle, setInputTitle] = useState<string>("");
    const [textArea, setTextArea] = useState<string>("");
    const [filesCharged, setFilesCharged] = useState<File[]>([]);
    const [theme, setTheme] = useState<ThemeInterface | null>(null);


    const messageAlert = (msg:string) => {
        setIsErrorMsg(true);
        setmsgError(msg)
    }

    useEffect(() => {

        const assignThematic = async () => {
            const idTheme = context?.createForThematicID;
            if (idTheme) {
                const res = await getTheme(idTheme);
                setTheme(res);
            }
        }

        assignThematic();
    }, []);

    const changeTextArea = (event: ChangeEvent<HTMLTextAreaElement>) => setTextArea(event.target.value);

    const addType = (event: ChangeEvent<HTMLInputElement>) => {
        const fileList = event.target.files;
        if (fileList) {
            setFilesCharged((state) => [...state, ...Array.from(fileList)])
        }
    }

    const removeType = (file: File) => {
        setFilesCharged(state => state.filter((f) => f !== file))
    }

    const sendCategory = async () => {
        const mediaFile = filesCharged.map(file => {
            return {
                name: file.name,
                type: file.type,
                file
            }
        })
        if (context?.username && context?.createForThematicID) {
            const formData = new FormData();
            formData.append('title', inputTitle)
            formData.append('content', textArea)
            formData.append('userID', context.username.userID)
            formData.append('thematicID', context.createForThematicID)
            mediaFile.forEach(fileWithMeta => {
                formData.append('media', fileWithMeta.file)
            })
            const res = await postContent(formData);
            if (res._id) {
                console.log("Inforamción guardada");
                navigate('/dashboard')
            } else {
                messageAlert(res.msg);
            }
        } else {
            messageAlert("Error en los permisos. Inicia sesion nuevamente");
        }
    }

    return (
        <form className="w-full max-w-screen-md h-fit rounded overflow-hidden shadow-lg dark:bg-gray-800 p-8">

            <h3 className="text-gray-50 p-5 text-3xl">Nuevo contenido</h3>

            <div className="flex flex-wrap -mx-3 mb-6">
                <CustomInput
                    label="Titulo"
                    placeholder="Titulo"
                    type="text"
                    onChange={(value: string) => setInputTitle(value)}
                />

                <label htmlFor="message"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                    Tu Post
                </label>
                <textarea id="message" rows={4} placeholder="Comienza a tu contenido aqui..."
                    onChange={changeTextArea}
                    className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" ></textarea>


                <label htmlFor="file_input"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                    Subir Archivo
                </label>
                <input id="file_input" type="file" onChange={addType}
                    className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400" />

                <ListUploadFiles listUpload={filesCharged} removeType={removeType} />

                <div className="w-full">
                    <p className="text-sm font-bold mb-2">La temática solo permite los siguientes tipos de contenidos:</p>
                    <div className="flex justify-evenly w-full text-sm">
                        {
                            theme ?
                                theme?.categories.flatMap(category => (
                                    <ul className="bg-slate-700 pl-9 pr-4 py-1 rounded">
                                        <p className="font-bold">Categoria {category.name}:</p>
                                        {
                                            category.allowedFileTypes.map(type => (
                                                <li className="list-disc pt-1">{type}</li>
                                            ))
                                        }
                                    </ul>
                                ))
                                :
                                <SkeletonCard />
                        }
                    </div>
                </div>

            </div>

            {
                IsErrorMsg ? <p className="text-red-700 pb-3">{msgError} </p> : <></>
            }


            <button className="mt-8 mb-4 cursor-pointer"
                onClick={sendCategory}
                type="button"
            >
                Publicar mi contenido
            </button>
            <p>Tu contenido se publicara con tu nombre de usuario: {context?.username.username}</p>
        </form>
    )
}