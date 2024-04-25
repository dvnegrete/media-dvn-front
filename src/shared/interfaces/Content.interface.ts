import { Users } from "./Users.interface";

export interface ContentInterface {
    _id: string;
    title: string;
    content: string;
    userID: Users | null;
    thematicID?: string
    media?: string[];
}