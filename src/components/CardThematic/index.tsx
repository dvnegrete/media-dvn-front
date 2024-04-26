import { ThematicCard } from "../../shared/interfaces";

export const CardThematic = ({ _id, name, description, isCreator, goToCreate }: ThematicCard) => {
    const handlerCreateContent = () => goToCreate(_id);
    return (
        <div
            className="relative flex flex-col m-3 text-gray-50 bg-gray-800 shadow-md bg-clip-border rounded-xl w-60 h-max">
            <div className="p-6">
                <h5
                    className="block mb-2 font-sans text-xl antialiased font-semibold leading-snug tracking-normal text-blue-gray-900">
                    {name}
                </h5>
                <p
                    className="block font-sans text-base antialiased font-light leading-relaxed text-inherit">
                    {description}
                </p>
            </div>           
            {isCreator ?
                <div onClick={handlerCreateContent}
                    className="px-6 pt-4 pb-2">
                    <span
                        className="inline-block bg-gray-50 rounded-full px-3 py-1 text-sm font-semibold text-gray-950 mr-2 mb-2 cursor-pointer">
                        Crear Contenido
                    </span>
                </div>
                : <></>
            }

        </div>
    )
}