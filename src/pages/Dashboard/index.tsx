import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ContentInterface } from "../../shared/interfaces";

import { getContentAll } from "../../service/api";

import { CardContent } from "../../components/CardContent";
import { SkeletonCard } from "../../components/SkeletonCard";
import { SearchEngine } from "../../components/SearchEngine";
import { ButtonLoading } from "../../components/ButtonLoading";

export const Dashboard = () => {
    const navigate = useNavigate();
    const [contents, setContents] = useState<ContentInterface[]>([]);
    const [counterContents, setCounterContents] = useState<number | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchContents = async () => {
            try {
                const contentsData = await getContentAll();
                setContents(contentsData);
                setCounterContents(contentsData.length);
                setLoading(false);
            } catch (error) {
                console.error(error);
            }
        };
        fetchContents();
    }, []);

    const handlerSearchEngine = (resSearch: ContentInterface[]) => {
        setContents(resSearch);
        setCounterContents(resSearch.length);
    }

    const handlerToSee = async (id: string) => navigate("/contenido/" + id);

    return (
        <section className="min-w-full" >
            <h3 className="text-3xl mb-8">Contenidos Disponibles:</h3>
            <SearchEngine contentSearch={handlerSearchEngine} />
            {
                loading &&
                <p className="pt-4">Contenidos encontrados: {counterContents}</p>
            }
            <div className="">
                {

                    loading ?
                        <div className="flex flex-wrap justify-evenly content-evenly p-5 mb-4">
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
                        <div className="max-h-full">
                            <ButtonLoading />
                            <SkeletonCard />
                        </div>
                }
            </div>
        </section>
    )
}