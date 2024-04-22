import axios, { AxiosError } from "axios";
import { ThemeInterface } from "../../shared/interfaces/Theme.Interface";
import { CategoryInterface, Users } from "../../shared/interfaces";

const API_BASE_URL = "http://localhost:3000/api";

const config = {
    baseURL: API_BASE_URL,
    headers: {
        'username': localStorage.getItem('username'),
        'Content-Type': 'application/json'
    }
};

const axiosConf = axios.create(config);

export const getUsers = async () => {
    try {
        const res = await axiosConf.get(`${API_BASE_URL}/users`);
        return res.data;
    } catch (error) {
        throw new Error("getUsers Error");
    }
};

export const postUsers = async (data: Users) => {
    try {
        const res = await axiosConf.post(`${API_BASE_URL}/users`, { ...data });
        return res.data;
    } catch (error) {
        if (axios.isAxiosError(error)) {
            const axiosError = error as AxiosError;
            if (axiosError.response && axiosError.response.status === 400) {
                return axiosError.response.data;
            }
        }
        throw new Error("postUsers Error");
    }
};

export const deleteUser = async (id: string) => {
    try {
        const res = await axiosConf.delete(`${API_BASE_URL}/users/${id}`);
        return res.data;
    } catch (error) {
        throw new Error("deleteUser Error");
    }
};

export const getCategory = async () => {
    try {
        const res = await axiosConf.get(`${API_BASE_URL}/categories`);
        return res.data;
    } catch (error) {
        throw new Error("getCategory Error")
    }
}

export const postCategory = async (data: CategoryInterface) => {
    try {
        const res = await axiosConf.post(`${API_BASE_URL}/categories`, { ...data });
        return res.data;
    } catch (error) {
        throw new Error("postCategory Error")
    }
}

export const postTheme = async (data: ThemeInterface) => {
    try {
        const res = await axiosConf.post(`${API_BASE_URL}/themes`, { ...data });
        return res.data;
    } catch (error) {
        throw new Error("postTheme Error")
    }
}
