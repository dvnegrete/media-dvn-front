import { useState, useRef } from "react";
import { ListFilesAllowed } from "../../shared/fileCategories";

export const FormCategory = () => {
    const inputType = useRef<HTMLInputElement>(null);
    const [msgError, setMsgError] = useState(false);
    const [fileAllowed, setFileAllowed] = useState<string[]>([]);
    const [inputValue, setInputValue] = useState<string>("");

    const handlerKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            event.preventDefault();
            addType();
        }
    }

    const addType = () => {
        if (inputType.current) {
            const fileType = inputType.current.value.trim();
            setMsgError(false)
            if (fileType === "") {
                return
            }
            fileAllowed.includes(fileType)
                ? messageAlert()
                : setFileAllowed(state => [...state, fileType]);
                setInputValue("");
        }
    }

    const messageAlert = () => {
        setMsgError(true);
    }

    const removeType = (file: string) => {
        setFileAllowed(state => state.filter(type => type !== file))
    }

    return (
        <form className="w-screen max-w-lg rounded overflow-hidden shadow-lg dark:bg-gray-800 p-8">
            <h3 className="text-gray-50 p-5 text-3xl">Nueva Categoria</h3>
            <div className="flex flex-wrap -mx-3 mb-6">
                <div className="w-full px-3 mb-6 md:mb-0">
                    <label className="block uppercase tracking-wide text-gray-200 text-xs font-bold mb-2" htmlFor="grid-first-name">
                        Nombre
                    </label>
                    <input className="appearance-none block w-full bg-gray-200 text-stone-900 border  py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" id="grid-first-name" type="text" placeholder="Imágenes" />
                </div>
                <div className="w-full  px-3">
                    <label className="block uppercase tracking-wide text-gray-200 text-xs font-bold mb-2" htmlFor="grid-image">
                        URL de la Imagen
                    </label>
                    <input className="appearance-none block w-full bg-gray-200 text-stone-900 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-image" type="text" placeholder="https://....." />
                </div>
            </div>
            <div className="flex flex-wrap -mx-3 mb-6">
                <div className="w-full px-3">
                    <label className="block uppercase tracking-wide text-gray-200 text-xs font-bold mb-2" htmlFor="grid-description">
                        Descripción
                    </label>
                    <input className="appearance-none block w-full bg-gray-200 text-stone-900 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-description" type="text" placeholder="Esta categoría contiene..." />
                </div>
            </div>
            <div className="flex flex-wrap -mx-3 mb-2">

                <div className="w-3/5 px-3 mb-6 md:mb-0">
                    <label className="block uppercase tracking-wide text-gray-200 text-xs font-bold mb-2" htmlFor="grid-state">
                        Tipo de Contenido permitido:
                    </label>
                    <input
                        className="appearance-none block w-full bg-gray-200 text-stone-900 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-type"
                        type="text"
                        name="autocomplete"
                        list="category-type"
                        placeholder="image/jpeg"
                        value={inputValue}
                        ref={inputType}
                        onChange={(e) => {
                            setInputValue(e.target.value);
                            setMsgError(false);
                        }}
                        onKeyPress={handlerKeyPress}
                    />
                    <datalist id="category-type" >
                        {
                            ListFilesAllowed.map(file => (
                                <option value={file} key={file} />
                            ))
                        }
                    </datalist>
                </div>
                <button className="w-2/5 px-3 my-6 md:mb-0 h-fit" type="button"
                    onClick={addType}
                >
                    Añadir Tipo
                </button>
            </div>
            {
                msgError ? <p className="text-red-700 pb-3">El tipo selecionado ya esta agregado </p> : <></>
            }

            <ul className="flex flex-wrap justify-between text-left text-gray-500 dark:text-gray-400 w-full">
                {fileAllowed.map(file => (
                    <li className="flex items-center space-x-3 p-3 my-0 w-fit" key={file}
                    >
                        <svg className="flex-shrink-0 w-3.5 h-3.5 text-green-500 dark:text-green-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 16 12">
                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 5.917 5.724 10.5 15 1.5" />
                        </svg>
                        <span className="px-3">{file}</span>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5 cursor-pointer"
                            onClick={() => removeType(file)}
                        >
                            <path fillRule="evenodd" d="M8.75 1A2.75 2.75 0 0 0 6 3.75v.443c-.795.077-1.584.176-2.365.298a.75.75 0 1 0 .23 1.482l.149-.022.841 10.518A2.75 2.75 0 0 0 7.596 19h4.807a2.75 2.75 0 0 0 2.742-2.53l.841-10.52.149.023a.75.75 0 0 0 .23-1.482A41.03 41.03 0 0 0 14 4.193V3.75A2.75 2.75 0 0 0 11.25 1h-2.5ZM10 4c.84 0 1.673.025 2.5.075V3.75c0-.69-.56-1.25-1.25-1.25h-2.5c-.69 0-1.25.56-1.25 1.25v.325C8.327 4.025 9.16 4 10 4ZM8.58 7.72a.75.75 0 0 0-1.5.06l.3 7.5a.75.75 0 1 0 1.5-.06l-.3-7.5Zm4.34.06a.75.75 0 1 0-1.5-.06l-.3 7.5a.75.75 0 1 0 1.5.06l.3-7.5Z" clipRule="evenodd" />
                        </svg>
                    </li>
                ))}
            </ul>
            <button>Enviar Categoria</button>
        </form>
    )
}