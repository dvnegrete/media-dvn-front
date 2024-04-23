import React, { useContext, useEffect, useState } from "react";
import { CustomInput } from "../CustomInput";
import { ListUploadFiles } from "../ListUploadFiles";
import { MediaDVNContext } from "../../Context";
import { getTheme } from "../../service/api";

export const FormNewContent = () => {

    const context = useContext(MediaDVNContext);
    const [msgError, setMsgError] = useState(false);

    const [inputName, setInputName] = useState<string>("");
    const [inputUrl, setInputUrl] = useState<string>("");
    const [inputDescription, setInputDescription] = useState<string>("");
    const [filesCharged, setFilesCharged] = useState<File[]>([]);
    const [theme, setTheme] = useState<string[]>([]);
    

    const messageAlert = () => {
        setMsgError(true);
    }

    useEffect(() => {
        const nameThematic = async () => {
            const idTheme = context?.createForThematicID;
            if (idTheme) {
                const res = await getTheme(idTheme);
                console.log(res.msg);
                setTheme(res);
            }
        }
        nameThematic();
    }, []);


    const addType = (event: React.ChangeEvent<HTMLInputElement>) => {
        const fileList = event.target.files;
        if (fileList) {
            setFilesCharged((state) => [...state, ...Array.from(fileList)])
        }
    }

    const removeType = (file: File) => {
        setFilesCharged(state => state.filter((f) => f !== file))
    }

    return (
        <form className="w-full max-w-screen-md h-fit rounded overflow-hidden shadow-lg dark:bg-gray-800 p-8">

            <h3 className="text-gray-50 p-5 text-3xl">Nuevo contenido</h3>

            <div className="flex flex-wrap -mx-3 mb-6">
                <CustomInput
                    label="Titulo"
                    placeholder="Titulo"
                    type="text"
                    onChange={(value: string) => setInputName(value)}
                />

                <label htmlFor="message"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                    Tu Post
                </label>
                <textarea id="message" rows={4} placeholder="Comienza a tu contenido aqui..."
                    className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" ></textarea>


                <label htmlFor="file_input"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                    Subir Archivo
                </label>
                <input id="file_input" type="file" onChange={addType}
                    className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400" />

                <ListUploadFiles listUpload={filesCharged} removeType={removeType} />

                <div>
                    <p>La temática solo permite los siguientes tipos de contenido:</p>
                        {/* {
                            theme.map(item=>(
                                <p>{item}</p>
                            ))
                        } */}
                </div>

                <p>Creditos:{context?.username}</p>
            </div>

            {
                msgError ? <p className="text-red-700 pb-3">El tipo selecionado ya esta agregado </p> : <></>
            }


            <button className="mt-8 cursor-pointer"
                // onClick={sendCategory}
                type="button"
            >
                Enviar Categoria
            </button>
        </form>
    )
}