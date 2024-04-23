export interface CategoryInterface {
    _id?: string;
    name: string;
    description: string;
    image: string;
    allowedFileTypes: string[];
    isCreator: boolean;
    goToSee: (value: string) => void;
    goToCreate: (value: string) => void;
}