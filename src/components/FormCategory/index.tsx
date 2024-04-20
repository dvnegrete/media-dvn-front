import { useState, useRef } from "react";
import { ListFilesAllowed } from "../../shared/fileCategories";
import { ListTypeAllowed } from "../ListTypeAllowed";
import { CustomInput } from "../CustomInput";

export const FormCategory = () => {

    const refInputFileType = useRef<HTMLInputElement>(null);

    const [msgError, setMsgError] = useState(false);

    const [inputName, setInputName] = useState<string>("");
    const [inputUrl, setInputUrl] = useState<string>("");
    const [inputDescription, setInputDescription] = useState<string>("");
    const [fileAllowed, setFileAllowed] = useState<string[]>([]);

    const [inputFileType, setInputFileType] = useState<string>("");

    const handlerKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            event.preventDefault();
            addType();
        }
    }

    const addType = () => {
        if (refInputFileType.current) {
            const fileType = refInputFileType.current.value.trim();
            setMsgError(false)
            if (fileType === "") {
                return
            }
            fileAllowed.includes(fileType)
                ? messageAlert()
                : setFileAllowed(state => [...state, fileType]);
            setInputFileType("");
        }
    }

    const messageAlert = () => {
        setMsgError(true);
    }

    const removeType = (file: string) => {
        setFileAllowed(state => state.filter(type => type !== file))
    }

    const validateData = () => {
        return inputName !== ""
            && inputDescription !== ""
            && inputUrl !== "" 
            && fileAllowed.length > 0;
    }

    const sendCategory = () => {
        if (validateData()) {
            const sendObj = {
                name: inputName,
                description: inputDescription,
                image: inputUrl,
                allowedFileTypes: fileAllowed
            };
            fetch('http://localhost:3000/api/category', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'username': 'admin'
                },
                body: JSON.stringify(sendObj)
            })
                .then(res => res.json())
                .then((data) => {
                    console.log(data)
                });
        } else{
            alert("Error. Revisa que todos los campos sean validos y se encuentren llenados")
        }
    }

    return (
        <form className="w-full max-w-screen-md h-fit rounded overflow-hidden shadow-lg dark:bg-gray-800 p-8">

            <h3 className="text-gray-50 p-5 text-3xl">Nueva Categoria</h3>

            <div className="flex flex-wrap -mx-3 mb-6">
                <CustomInput
                    label="Nombre"
                    placeholder="Imagenes"
                    type="text"
                    onChange={(value: string) => setInputName(value)}
                />
                <CustomInput
                    label="URL de la imagen"
                    placeholder="https://..."
                    type="text"
                    onChange={(value: string) => setInputUrl(value)}
                />
                <CustomInput
                    label="Descripción"
                    placeholder="Esta categoria contiene..."
                    type="text"
                    onChange={(value: string) => setInputDescription(value)}
                />
            </div>
            <div className="flex flex-wrap -mx-3 mb-2">
                <div className="w-3/5 px-3 mb-6 md:mb-0">
                    <label className="block tracking-wide text-gray-200 text-xs font-bold mb-2" htmlFor="grid-state">
                        <p>Añade un tipo de contenido.</p>
                    </label>
                    <input
                        className="appearance-none block w-full bg-gray-200 text-stone-900 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-type"
                        type="text"
                        name="autocomplete"
                        list="category-type"
                        placeholder="image/jpeg"
                        value={inputFileType}
                        ref={refInputFileType}
                        onChange={(e) => {
                            setInputFileType(e.target.value);
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

            <ListTypeAllowed fileAllowed={fileAllowed} removeType={removeType} />

            <button className="mt-8 cursor-pointer"
                onClick={sendCategory}
                type="button"
            >
                Enviar Categoria
            </button>
        </form>
    )
}