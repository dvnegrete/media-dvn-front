import { useContext, useEffect, useState } from "react";
import { CardThematic } from "../../components/CardThematic";
import { ThemeInterface } from "../../shared/interfaces/Theme.Interface";
import { getThemeAll } from "../../service/api";
import { MediaDVNContext } from "../../Context";
import { ROLES } from "../../shared/enum/Roles";
import { useNavigate } from "react-router-dom";

export const Content = () => {
    const context = useContext(MediaDVNContext);
    const navigate = useNavigate();
    const [themes, setThemes] = useState<ThemeInterface[]>([]);

    const administratorRole = () => context?.permissions === ROLES.Administrator;
    const creatorRole = () => context?.permissions === ROLES.Creator;

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

    const handlerToCreate = (id: string) => {
        context?.setForCreateThematicID(id);
        navigate("");
    }
    const handlerToSee = async (id: string) => navigate(`/contenido/${id}`);

    return (
        <>
            <div className="flex flex-wrap p-5 mb-4">
                {
                    themes.map(theme => (
                        <CardThematic
                            _id={theme._id || theme.name}
                            key={theme._id}
                            name={theme.description}
                            description={theme.description}
                            isCreator={administratorRole() || creatorRole()}
                            goToCreate={handlerToCreate}
                            goToSee={handlerToSee}
                        />
                    ))
                }
            </div>
        </>
    )
}