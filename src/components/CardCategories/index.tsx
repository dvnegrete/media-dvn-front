import { CategoryInterface } from "../../shared/interfaces/Category.interface"

export const CardCategories = ({ image, name, description }: CategoryInterface) => {
    return (
        <div className="max-w-sm min-w-3.5 h-fit rounded overflow-hidden shadow-lg dark:bg-gray-800 m-6">
            <img className="max-h-52 min-w-52 m-auto" src={image} alt={name} />
            <div className="px-6 py-4">
                <div className="font-bold text-xl mb-2">{name}</div>
                <p className="text-gray-300 text-base">
                    {description}
                </p>
            </div>
            <div className="px-6 pt-4 pb-2">
                <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2 cursor-pointer">Ir a Contenido</span>
            </div>
        </div>
    )
}