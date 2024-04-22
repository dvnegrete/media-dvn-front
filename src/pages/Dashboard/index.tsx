import { useEffect, useState } from "react";
import { CategoryInterface } from "../../shared/interfaces";
import { CardCategories } from "../../components/CardCategories";
import { getCategory } from "../../service/api";

export const Dashboard = () => {
    const [categories, setCategories] = useState<CategoryInterface[] | null>(null);

    useEffect(() => {
        const fetchCategories = async () => {
            const resCategory = await getCategory();
            setCategories(resCategory);
        }
        fetchCategories();
    }, []);

    return (
        <section className="flex flex-wrap justify-evenly content-evenly" >
            {
                categories?.map((category) => {
                    return (
                        <CardCategories
                            key={category.name}
                            name={category.name}
                            description={category.description}
                            image={category.image}
                            allowedFileTypes={category.allowedFileTypes}
                        />
                    )
                })
            }
        </section>
    )
}