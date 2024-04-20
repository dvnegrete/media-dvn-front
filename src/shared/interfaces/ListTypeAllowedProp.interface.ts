export interface ListTypeAllowedProp {
    fileAllowed: string[];
    removeType: (file:string)=>void;
}