import { useRef, useState } from "react";
import { CustomInput } from "../CustomInput";
import { ListUploadFiles } from "../ListUploadFiles";

export const FormNewContent = () => {

    const refInputFileType = useRef<HTMLInputElement>(null);

    const [msgError, setMsgError] = useState(false);

    const [inputName, setInputName] = useState<string>("");
    const [inputUrl, setInputUrl] = useState<string>("");
    const [inputDescription, setInputDescription] = useState<string>("");


    const messageAlert = () => {
        setMsgError(true);
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
                <textarea id="message" rows={4} className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Comienza a tu contenido aqui..."></textarea>


                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white" htmlFor="file_input">Upload file</label>
                <input className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400" id="file_input" type="file"/>

                <ListUploadFiles/>

                    <p>Creditos:</p>
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