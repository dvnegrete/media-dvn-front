import { useEffect, useState } from "react";
import { deleteUser, getUsers } from "../../service/api";
import { Users } from "../../shared/interfaces/Users.interface";
import { IconEdit } from "../../components/Icons/IconEdit";
import { IconDelete } from "../../components/Icons/IconDelete";
import { UpdateRegister } from "../../components/UpdateRegister";
import { ROLES } from "../../shared/enum/Roles";

export const ProfileAdmin = () => {

    const [users, setUsers] = useState<Users[]>([]);
    const [deletedUserState, setDeletedUserState] = useState<string | null>(null);
    const [editUserState, setEditUserState] = useState<Users | null>(null);
    const [isShowEdit, setIsShowEdit] = useState(false);

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

    const handlerEditUser = (user: Users) => {
        setEditUserState(user);
        setIsShowEdit(true)
    };

    const handlerCloseEdit = () => {
        setIsShowEdit(false)
    }

    const handlerRemoveUser = async (user: Users) => {
        if (user._id !== undefined) {
            await deleteUser(user._id);
            setDeletedUserState(user._id);
        }
    }

    return (
        <section className="max-w-2xl">
            <h3 className="text-3xl">Administración de Usuarios de la Aplicación</h3>

            <h5 className="text-xl">Usuarios registrados</h5>

            <table className="mt-4 bg-gray-700 rounded">
                <thead>
                    <tr>
                        <th className="min-w-44">Nombre de Usuario</th>
                        <th className="min-w-44">Correo Electrónico</th>
                        <th className="min-w-36 px-2">Permisos</th>
                        <th className="min-w-20">Editar</th>
                        <th className="min-w-20">Eliminar</th>
                    </tr>
                </thead>
                <tbody className="bg-gray-800">
                    {users.map((user) => (
                        <tr key={user._id}>
                            <td>{user.username}</td>
                            <td>{user.email}</td>
                            {
                                ROLES.Administrator === user.role
                                    ? <td>Administrador</td>
                                    : ROLES.Creator === user.role
                                        ? <td>Creador</td>
                                        : <td>Lector</td>
                            }
                            <td className="flex justify-center"><IconEdit edit={() => handlerEditUser(user)} /></td>
                            <td className="px-6"><IconDelete key={user._id} remove={() => handlerRemoveUser(user)} /></td>
                        </tr>
                    ))}
                </tbody>
            </table>
            {
                isShowEdit ?
                    <UpdateRegister
                        user={editUserState}
                        close={handlerCloseEdit}
                    />
                    : <></>
            }
        </section>
    )
}