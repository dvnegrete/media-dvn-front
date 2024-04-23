import { useEffect, useState } from "react";
import { ThemeInterface } from "../../shared/interfaces/Theme.Interface";
import { getThemeAll } from "../../service/api";
import { FormNewTheme } from "../FormNewTheme";

export const AdminThemes = () => {
    const [themes, setThemes] = useState<ThemeInterface[]>([]);

    useEffect(() => {
        const fetchThemes = async () => {
            try {
                const ThemeData = await getThemeAll();
                setThemes(ThemeData);
            } catch (error) {
                console.error(error);
            }
        };
        fetchThemes();
    }, []);

    return (
        <section className="max-w-full flex flex-col items-center justify-center">
            <h1 className="text-4xl py-6">Temáticas</h1>
            <h1 className="text-xl">Registradas en el sistema.</h1>
            <div className="flex flex-wrap p-5 mb-4">
                {
                    themes.map(theme => (
                        <div className="relative flex flex-col m-3 text-gray-200 bg-slate-500 shadow-md bg-clip-border rounded-xl w-60">
                            <div className="p-6">
                                <h5 className="block mb-2 font-sans text-xl antialiased font-semibold leading-snug tracking-normal text-blue-gray-900">
                                    {theme.name}
                                </h5>
                                <p className="block font-sans text-base antialiased font-light leading-relaxed text-inherit">
                                    {theme.description}
                                </p>
                            </div>

                        </div>
                    ))
                }
            </div>
            <FormNewTheme />
        </section>
    )
}