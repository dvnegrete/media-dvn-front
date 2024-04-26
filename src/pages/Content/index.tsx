import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { ThemeInterface } from "../../shared/interfaces/Theme.Interface";
import { ROLES } from "../../shared/enum/Roles";

import { MediaDVNContext } from "../../Context";
import { getThemeAll } from "../../service/api";
import { CardThematic } from "../../components/CardThematic";

export const Content = () => {
    const context = useContext(MediaDVNContext);
    const navigate = useNavigate();
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

    const allowWriting = () => {
        const permission =  context?.permissions === ROLES.Administrator || context?.permissions === ROLES.Creator;
        return permission;
    }

    const handlerToCreate = (id: string) => {
        context?.setForCreateThematicID(id);
        navigate("/nuevo-contenido");
    }

    return (
        <section>
            <h1>Tematicas Disponibles.</h1>
            <h3>Seleciona una temática para crear tu contenido</h3>
            <div className="flex flex-wrap p-5 mb-4">
                {
                    themes.map(theme => (
                        <CardThematic
                            _id={theme._id || theme.name}
                            key={theme._id}
                            name={theme.description}
                            description={theme.description}
                            isCreator={allowWriting()}
                            goToCreate={handlerToCreate}
                        />
                    ))
                }
            </div>
        </section>
    )
}