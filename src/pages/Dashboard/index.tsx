import { useContext, useEffect, useState } from "react";
import { CategoryInterface } from "../../shared/interfaces";
import { CardCategories } from "../../components/CardCategories";
import { getCategory, getThemeAll } from "../../service/api";
import { MediaDVNContext } from "../../Context";
import { ROLES } from "../../shared/enum/Roles";
import { useNavigate } from "react-router-dom";
import { ThemeInterface } from "../../shared/interfaces/Theme.Interface";
import { CardThematic } from "../../components/CardThematic";

export const Dashboard = () => {
    const context = useContext(MediaDVNContext);
    const navigate = useNavigate();
    // const [categories, setCategories] = useState<CategoryInterface[] | null>(null);
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

    // useEffect(() => {
    //     const fetchCategories = async () => {
    //         const resCategory = await getCategory();
    //         setCategories(resCategory);
    //     }
    //     fetchCategories();
    // }, []);

    const handlerToCreate =(id:string)=> {
        context?.setForCreateThematicID(id);
        navigate("/nuevo-contenido");
    }
    const handlerToSee =(id:string)=>{
        console.log("SEE", id);

    }

    const administratorRole = () => context?.permissions === ROLES.Administrator;
    const creatorRole = () => context?.permissions === ROLES.Creator;
    const lectorRole = () => context?.permissions === ROLES.Reader;

    return (
        <section className="flex flex-wrap justify-evenly content-evenly" >
            <h3>Tematicas Disponibles:</h3>
            <div>Busca un contenido:</div>

            
            <div className="flex flex-wrap p-5 mb-4">
                {
                    themes.map(theme => (
                        <CardThematic
                            _id={theme._id || theme.name}
                            key={theme._id}
                            name={theme.description}
                            description={theme.description}
                            isCreator={administratorRole() || creatorRole()}
                            goToCreate={ handlerToCreate }
                            goToSee={ handlerToSee }
                        />
                    ))
                }
            </div>
            {/* {
                categories?.map((category) => {
                    return (
                        <CardCategories
                            _id={category._id}
                            key={category._id}
                            name={category.name}
                            description={category.description}
                            image={category.image}
                            allowedFileTypes={category.allowedFileTypes}
                            isCreator={administratorRole() || creatorRole()}
                            goToCreate={ handlerToCreate }
                            goToSee={ handlerToSee }
                        />
                    )
                })
            } */}
            {
                administratorRole() ?
                    <p>HOla Admin</p> : <>admin NO</>
            }
            {
                creatorRole() ? <p>HOla Creator</p> : <p>creator no</p>
            }
            {
                lectorRole() ? <p>Hola lector</p> : <p>lector no</p>
            }
        </section>
    )
}