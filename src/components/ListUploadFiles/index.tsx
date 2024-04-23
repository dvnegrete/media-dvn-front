import { CheckingIcon } from "../Icons/CheckingIcon";
import { IconDelete } from "../Icons/IconDelete";
import { ListUploadProp } from "../../shared/interfaces";

export const ListUploadFiles = ({ listUpload, removeType }: ListUploadProp) => {

    const handlerRemoveType = (file: File) => removeType(file);
    return (
        <>
            <p className="uppercase text-gray-100 dark:text-gray-200 bg-gray-700 rounded">Archivos selecionados:</p>
            <ul className="flex flex-wrap justify-between text-left text-gray-100 dark:text-gray-200 w-full bg-gray-700 rounded">
                {listUpload.map((file, index) => (
                    <li className="flex items-center space-x-3 p-3 my-0 w-fit" key={index}
                    >
                        <CheckingIcon />
                        <span className="px-3">{file.name} - {file.type}</span>
                        <IconDelete remove={() => handlerRemoveType(file)} />
                    </li>
                ))}
            </ul>
        </>
    )
}