import { useEffect, useState } from "react";
import { CategoryInterface } from "../../shared/interfaces";
import { CardCategories } from "../../components/CardCategories";

export const Dashboard = () => {
    const [categories, setCategories] = useState<CategoryInterface[] | null>(null);

    useEffect(() => {
        fetch('http://localhost:3000/api/category', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'username': 'admin'
            }
        })
            .then(res => res.json())
            .then((data: CategoryInterface[]) => {
                setCategories(data)
            })
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