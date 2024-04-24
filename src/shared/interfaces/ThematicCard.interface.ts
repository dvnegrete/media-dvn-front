export interface ThematicCard {
    _id: string;
    name: string;
    description: string;
    isCreator: boolean;
    goToSee: (value: string) => void;
    goToCreate: (value: string) => void;
}