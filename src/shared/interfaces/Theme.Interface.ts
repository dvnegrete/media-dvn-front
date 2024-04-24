import { CategoryInterface } from "./Category.interface";

export interface ThemeInterface {
    _id?: string;
    name: string;
    description: string;
    categories: CategoryInterface[];
}