import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ContentInterface } from "../../shared/interfaces";

import { getContentAll } from "../../service/api";

import { CardContent } from "../../components/CardContent";
import { SkeletonCard } from "../../components/SkeletonCard";

export const Dashboard = () => {
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

    const handlerToSee = async (id: string) => navigate("/contenido/" + id);

    return (
        <section className="flex flex-wrap justify-evenly content-evenly w-5/6" >
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
        </section>
    )
}