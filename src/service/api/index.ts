import axios, { AxiosError } from "axios";
import { ThemeInterface } from "../../shared/interfaces/Theme.Interface";
import { CategoryInterface, Users } from "../../shared/interfaces";
import { API_BASE_URL } from "../../config";

const axiosConf = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        'Content-Type': 'application/json'
    }
});

axiosConf.interceptors.request.use(
    (config) => {
        config.headers['user'] = localStorage.getItem('user');
        return config;
    },
    (err) => {
        return Promise.reject(err)
    }
);

const axiosContent = axios.create({
    baseURL: API_BASE_URL,
    headers: {}
});

axiosContent.interceptors.request.use(
    (config) => {
        config.headers['user'] = localStorage.getItem('user');
        return config;
    },
    (err) => {
        return Promise.reject(err)
    }
);

const catchReponse = (err: unknown, name: string) => {
    if (axios.isAxiosError(err)) {
        const axiosError = err as AxiosError;
        if (axiosError.response) {
            return axiosError.response.data;
        }
    }
    console.error(`${name} Error`);
    throw new Error(`${name} Error`);
}

export const getUsers = async () => {
    try {
        const res = await axiosConf.get(`${API_BASE_URL}/users`);
        return res.data;
    } catch (error) {
        return catchReponse(error, "getUsers");
    }
};

export const getUserForEmail = async (emailValue: string) => {
    try {
        const res = await axiosConf.get(`${API_BASE_URL}/users/findUser?email=${emailValue}`);
        return res.data;
    } catch (error) {
        return catchReponse(error, "getUsersEmail");
    }
};

export const postUsers = async (data: Users) => {
    try {
        const res = await axiosConf.post(`${API_BASE_URL}/users`, { ...data });
        return res.data;
    } catch (error) {
        return catchReponse(error, "postUsers");
    }
};

export const putUsers = async (data: Users) => {
    try {
        const res = await axiosConf.put(`${API_BASE_URL}/users`, { ...data });
        return res.data;
    } catch (error) {
        return catchReponse(error, "putUsers");
    }
};

export const deleteUser = async (id: string) => {
    try {
        const res = await axiosConf.delete(`${API_BASE_URL}/users/${id}`);
        return res.data;
    } catch (error) {
        return catchReponse(error, "deleteUser");
    }
};

export const getCategory = async () => {
    try {
        const res = await axiosConf.get(`${API_BASE_URL}/categories`);
        return res.data;
    } catch (error) {
        return catchReponse(error, "getCategory");
    }
}

export const postCategory = async (data: CategoryInterface) => {
    try {
        const res = await axiosConf.post(`${API_BASE_URL}/categories`, { ...data });
        return res.data;
    } catch (error) {
        return catchReponse(error, "postCategory");
    }
}

export const postTheme = async (data: ThemeInterface) => {
    try {
        const res = await axiosConf.post(`${API_BASE_URL}/themes`, { ...data });
        return res.data;
    } catch (error) {
        return catchReponse(error, "postTheme");
    }
}

export const getTheme = async (data: string) => {
    try {
        const res = await axiosConf.get(`${API_BASE_URL}/themes/${data}`);
        return res.data;
    } catch (error) {
        return catchReponse(error, "getThemeAll");
    }
}

export const getThemeAll = async () => {
    try {
        const res = await axiosConf.get(`${API_BASE_URL}/themes/all`);
        return res.data;
    } catch (error) {
        return catchReponse(error, "getThemeAll");
    }
}

export const getContentAll = async () => {
    try {
        const res = await axiosContent.get(`${API_BASE_URL}/content`);
        return res.data;
    } catch (error) {
        return catchReponse(error, "getContentAll");
    }
}

export const getContentID = async (id:string) => {
    try {
        const res = await axiosContent.get(`${API_BASE_URL}/content/${id}`);
        return res.data;
    } catch (error) {
        return catchReponse(error, "getContentID");
    }
}

export const postContent = async (data: unknown) => {
    try {
        const res = await axiosContent.postForm(`${API_BASE_URL}/content`, data);
        return res.data;
    } catch (error) {
        return catchReponse(error, "postContent");
    }
}

export const deleteContent = async (id: string) => {
    try {
        const res = await axiosContent.delete(`${API_BASE_URL}/content/${id}`);
        return res.data;
    } catch (error) {
        return catchReponse(error, "deleteContent");
    }
}