import { useEffect, useState } from "react";
import { CustomInput } from "../../components/CustomInput";
import { ListTypeAllowed } from "../../components/ListTypeAllowed";
import { getCategory, postTheme } from "../../service/api";
import { CategoryInterface } from "../../shared/interfaces";
import { ThemeInterface } from "../../shared/interfaces/Theme.Interface";

export const FormNewTheme = () => {

    const [listCategories, setListCategories] = useState<CategoryInterface[]>([]);
    const [inputName, setInputName] = useState<string>("");
    const [inputDescription, setInputDescription] = useState<string>("");
    const [categoryAllowed, setCategoryAllowed] = useState<string[]>([]);

    useEffect(() => {
        const fetchCategory = async () => {
            try {
                const categoryData = await getCategory();
                setListCategories(categoryData);
            } catch (error) {
                console.error(error);
            }
        };

        fetchCategory();
    }, []);

    const handlerSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const selectOption = event.target.value;

        if (!categoryAllowed.includes(selectOption) && selectOption !== "") {
            setCategoryAllowed([...categoryAllowed, selectOption]);
        }
    }

    const removeType = (file: string) => {
        setCategoryAllowed(state => state.filter(type => type !== file))
    }

    const validateData = () => {
        return inputName !== ""
            && inputDescription !== ""
            && categoryAllowed.length > 0;
    }

    const sendCategory = async () => {
        if (validateData()) {
            const sendObj: ThemeInterface = {
                name: inputName,
                description: inputDescription,
                categories: categoryAllowed
            };
            const res = await postTheme(sendObj);
            console.log(res);
        } else {
            alert("Error. Revisa que todos los campos sean validos y se encuentren llenados")
        }
    }

    return (
        <form className="w-full max-w-screen-md h-fit rounded overflow-hidden shadow-lg dark:bg-gray-800 p-8">

            <h3 className="text-gray-50 p-5 text-3xl">Nueva Temática</h3>

            <div className="flex flex-wrap -mx-3 mb-6">
                <CustomInput
                    label="Nombre"
                    placeholder="Imagenes"
                    type="text"
                    onChange={(value: string) => setInputName(value)}
                />
                <CustomInput
                    label="Descripción"
                    placeholder="Esta categoria contiene..."
                    type="text"
                    onChange={(value: string) => setInputDescription(value)}
                />

                <div className="w-4/5 px-3 mb-6 md:mb-0">
                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white" htmlFor="category-list">
                        <p>Tipo de contenido permitido.</p>
                        <p>Selecciona al menos una categoria:</p>
                    </label>

                    <select
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        id="category-list" onChange={handlerSelectChange}>
                        {
                            listCategories.map((category) => (
                                <option value={category.name} key={category._id}> {category.name}</option>
                            ))
                        }
                    </select>
                </div>
            </div>

            <ListTypeAllowed fileAllowed={categoryAllowed} removeType={removeType} />

            <button className="mt-8 cursor-pointer"
                onClick={sendCategory}
                type="button"
            >
                Enviar Categoria
            </button>
        </form>
    )
}