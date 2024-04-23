import { ListTypeAllowedProp } from "../../shared/interfaces";
import { CheckingIcon } from "../Icons/CheckingIcon";
import { IconDelete } from "../Icons/IconDelete";

export const ListTypeAllowed = ({ fileAllowed, removeType }: ListTypeAllowedProp) => {

    const handlerRemoveType = (file: string) => removeType(file);

    return (
        <>
            <p className="uppercase text-gray-100 dark:text-gray-200 bg-gray-700 rounded">Contenido permitido:</p>
            <ul className="flex flex-wrap justify-between text-left text-gray-100 dark:text-gray-200 w-full bg-gray-700 rounded">
                {fileAllowed.map(file => (
                    <li className="flex items-center space-x-3 p-3 my-0 w-fit" key={file}
                    >
                        <CheckingIcon/>
                        <span className="px-3">{file}</span>
                        <IconDelete remove={() => handlerRemoveType(file)} />
                    </li>
                ))}
            </ul>
        </>
    )
}
