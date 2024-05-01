import { useRef } from "react";
import { IconSearch } from "../Icons/IconSearch"
import { getContentSearch } from "../../service/api";
import { ContentInterface } from "../../shared/interfaces";

export const SearchEngine = (
    { contentSearch }: { contentSearch: (value: ContentInterface[]) => void }
) => {

    const refSearch = useRef<HTMLInputElement>(null);

    const handlerSearchButton = async () => {
        if (refSearch.current) {
            const phrase = refSearch.current.value.trim();
            const contentsSearched = await getContentSearch(phrase);
            contentSearch(contentsSearched)
        }
    }

    const handlerKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            event.preventDefault();
            handlerSearchButton();
        }
    }

    return (
        <form className="max-w-md mx-auto">
            <label htmlFor="default-search"
                className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">
                Buscar
            </label>
            <div className="relative">
                <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                    <IconSearch />
                </div>
                <input type="search" id="default-search" ref={refSearch} onKeyPress={handlerKeyPress}
                    className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="Busca contenidos disponibles..." required />
                <button type="button" onClick={handlerSearchButton}
                    className="text-white absolute end-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                    Buscar
                </button>
            </div>
        </form>
    )
}