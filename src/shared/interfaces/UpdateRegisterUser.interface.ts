import { Users } from "./Users.interface";

export interface UpdateRegisterUser {
    user: Users | null;
    close: (value:boolean) => void;
}