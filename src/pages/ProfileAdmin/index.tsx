import { useEffect, useState } from "react";
import { deleteUser, getUsers } from "../../service/api";
import { Users } from "../../shared/interfaces/Users.interface";
import { IconEdit } from "../../components/Icons/IconEdit";
import { IconDelete } from "../../components/Icons/IconDelete";

export const ProfileAdmin = () => {

    const [users, setUsers] = useState<Users[]>([]);
    const [deletedUserState, setDeletedUserState] = useState<string | null>(null);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const usersData = await getUsers();
                setUsers(usersData);
            } catch (error) {
                console.error(error);
            }
        };

        fetchUsers();
    }, [deletedUserState]);

    const handlerRemoveUser = async (user: Users) => {
        if (user._id !== undefined) {
            await deleteUser(user._id);
            setDeletedUserState(user._id);
        }
    }

    return (
        <>
            <h3>Administración de Usuarios de la Aplicación</h3>

            <p>Usuarios registrados</p>

            <table>
                <thead>
                    <tr>
                        <th>Nombre de Usuario</th>
                        <th>Correo Electrónico</th>
                        <th>Permisos</th>
                        <th>Editar</th>
                        <th>Eliminar</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map((user) => (
                        <tr key={user._id}>
                            <td>{user.username}</td>
                            <td>{user.email}</td>
                            <td>{user.role}</td>
                            <td><IconEdit /></td>
                            <td><IconDelete key={user._id} remove={() => handlerRemoveUser(user)} /></td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </>
    )
}