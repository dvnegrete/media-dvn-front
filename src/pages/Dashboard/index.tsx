import { useContext, useEffect, useState } from "react";
import { getContentAll, getContentID } from "../../service/api";
import { MediaDVNContext } from "../../Context";
import { ROLES } from "../../shared/enum/Roles";
// import { useNavigate } from "react-router-dom";
// import { CardThematic } from "../../components/CardThematic";
import { ContentInterface } from "../../shared/interfaces";
import { CardContent } from "../../components/CardContent";
import { Content } from "../Content";

export const Dashboard = () => {
    const context = useContext(MediaDVNContext);
    //const navigate = useNavigate();
    // const [categories, setCategories] = useState<CategoryInterface[] | null>(null);
    //const [themes, setThemes] = useState<ThemeInterface[]>([]);
    const [contents, setContents] = useState<ContentInterface[]>([]);
    const [contentSingleID, setContentSingleID] = useState("");
    const [showContent, setShowContent] = useState<ContentInterface | null>(null);
    const [isShowCardContent, setIsShowCardContent] = useState(true);

    // useEffect(() => {
    //     const fetchThemes = async () => {
    //         try {
    //             const ThemeData = await getThemeAll();
    //             setThemes(ThemeData);
    //         } catch (error) {
    //             console.error(error);
    //         }
    //     };
    //     fetchThemes();
    // }, []);

    useEffect(() => {
        const fetchContents = async () => {
            try {
                const contentsData = await getContentAll();
                setContents(contentsData);
            } catch (error) {
                console.error(error);
            }
        };
        fetchContents();
    }, []);

    useEffect(() => {
        const ContentID = async () => {
            try {
                const content = await getContentID(contentSingleID);
                setShowContent(content);
            } catch (error) {
                console.error(error);
            }
        };
        ContentID();
    }, [contentSingleID]);

    // const handlerToCreate = (id: string) => {
    //     context?.setForCreateThematicID(id);
    //     navigate("/nuevo-contenido");
    // }
    const handlerToSee = (id: string) => {
        console.log(id);
        
        setContentSingleID(id);
        setIsShowCardContent(false);
    }

    const administratorRole = () => context?.permissions === ROLES.Administrator;
    const creatorRole = () => context?.permissions === ROLES.Creator;
    const lectorRole = () => context?.permissions === ROLES.Reader;

    return (
        <section className="flex flex-wrap justify-evenly content-evenly" >
            <h3>Contenidos Disponibles:</h3>
            <div>Busca un contenido:</div>


            <div className="flex flex-wrap p-5 mb-4">
                {
                    contents.map(content => (
                        <CardContent
                            _id={content._id}
                            key={content._id}
                            title={content.title}
                            goToSee={handlerToSee}
                        />
                    ))
                }
            </div>

            {
                !isShowCardContent ?
                    <Content
                        _id={showContent?._id || ""}
                        key={showContent?._id}
                        title={showContent?.title || ""}
                        content={showContent?.content || ""}
                        media={showContent?.media}
                        userID={showContent?.userID || null}
                    />
                    : <></>

            }
            {/* {
                // <CardThematic
                //     _id={theme._id || theme.name}
                //     key={theme._id}
                //     name={theme.description}
                //     description={theme.description}
                //     isCreator={administratorRole() || creatorRole()}
                //     goToCreate={handlerToCreate}
                //     goToSee={handlerToSee}
                // />


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
                    <p>Permisos de Admin</p> : <></>
            }
            {
                creatorRole() ? <p>Permisos de Creator</p> : <></>
            }
            {
                lectorRole() ? <p>Permisos de lector</p> : <></>
            }
        </section>
    )
}