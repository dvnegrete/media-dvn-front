import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ROLES } from "../../shared/enum/Roles";
import { ContentInterface } from "../../shared/interfaces";

import { MediaDVNContext } from "../../Context";
import { ContentContext } from "../../Context/ContentContext";
import { getContentAll, getContentID } from "../../service/api";

import { CardContent } from "../../components/CardContent";
import { SkeletonCard } from "../../components/SkeletonCard";

export const Dashboard = () => {
    const contextGlobal = useContext(MediaDVNContext);
    const contextContent = useContext(ContentContext);
    const navigate = useNavigate();
    const [contents, setContents] = useState<ContentInterface[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchContents = async () => {
            try {
                const contentsData = await getContentAll();
                setContents(contentsData);
                setLoading(false);
            } catch (error) {
                console.error(error);
            }
        };
        fetchContents();
    }, []);

    const handlerToSee = async (id: string) => {
        setLoading(true);
        if (contextGlobal?.login) {
            const selectedContent = await getContentID(id);
            contextContent?.setSelectedContent(selectedContent);
        } else {
            const [selectedContent] = contents.filter(content => content._id === id);
            contextContent?.setSelectedContent(selectedContent);
        }
        setLoading(false);
        navigate("/contenido");
    }

    const administratorRole = () => contextGlobal?.permissions === ROLES.Administrator;
    const creatorRole = () => contextGlobal?.permissions === ROLES.Creator;
    const lectorRole = () => contextGlobal?.permissions === ROLES.Reader;

    return (
        <section className="flex flex-wrap justify-evenly content-evenly" >
            <h3>Contenidos Disponibles:</h3>
            <div>Busca un contenido:</div>
            {/* Implemetar componente buscador */}
            {
                !loading ?
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
                    :
                    <SkeletonCard />
            }
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