export interface ThematicCard {
    _id: string;
    name: string;
    description: string;
    isCreator: boolean;
    goToCreate: (value: string) => void;
}