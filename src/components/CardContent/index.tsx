import { CardContentProp } from "../../shared/interfaces";

export const CardContent = ({ _id, title, goToSee }:CardContentProp) => {
    const handlerSeeContent = () => goToSee(_id);
    return (
        <div className="w-80 h-fit rounded-md overflow-hidden shadow-lg dark:bg-gray-800 m-6">
            <div className="px-6 py-4">
                <div className="font-bold text-xl mb-2">{title}</div>
            </div>
            <div onClick={handlerSeeContent}
                className="px-6 pt-4 pb-2">
                <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2 cursor-pointer">
                    Ver Contenido
                </span>
            </div>

        </div>
    )
}