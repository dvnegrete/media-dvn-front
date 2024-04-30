import { ChangeEvent, useContext, useRef, useState } from "react"
import { postUsers } from "../../service/api";
import { Link, useNavigate } from "react-router-dom";
import { MediaDVNContext } from "../../Context";
import { ROLES } from "../../shared/enum/Roles";

export const Register = () => {
    const navigate = useNavigate();
    const context = useContext(MediaDVNContext);
    const refUsername = useRef<HTMLInputElement>(null);
    const refEmail = useRef<HTMLInputElement>(null);

    const [message, setMessage] = useState("");
    const [showMessage, setShowMessage] = useState(false);
    const [role, setRole] = useState(ROLES.Reader);

    const validationBackend = (res: unknown) => {
        setShowMessage(true);
        switch (res) {
            case "Username not available":
                setMessage("Nombre de Usuario no disponible. Por favor selecciona otro")
                break;
            case "Format mail invalid":
                setMessage("No es un email valido.")
                break;
            case "User already exists":
                setMessage("Este email ya esta registrado. Inicia sesión o registrate con otro email valido.")
                break;
            default:
                setShowMessage(false);
                break;
        }
    }

    const handlerSelectChange = (event: ChangeEvent<HTMLSelectElement>) => {
        const selectOption = event.target.value;
        if (selectOption === ROLES.Reader || selectOption === ROLES.Creator) {
            setRole(selectOption);
        }
    }

    const sendRegistration = async () => {
        if (refEmail.current && refUsername.current) {
            const username = refUsername.current.value.trim();
            const email = refEmail.current.value.trim();
            const dataSend = { username, email, role };
            const res = await postUsers(dataSend);
            validationBackend(res.msg);
            if (res._id) {
                localStorage.setItem("user", res._id);
                context?.setPermissions(res.role);
                context?.setLogin(true);
                context?.setUsername({
                    userID: res._id,
                    username: res.username
                });
                navigate("/dashboard");
            }
        }
    }

    return (
        <section className="bg-gray-50 dark:bg-gray-900">
            <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">

                <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                    <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                        <h2 className="text-xl font-bold leading-tight tracking-tight text-gray-900 mb-10 dark:text-white uppercase">
                            Formulario de Registro
                        </h2>
                        <form className="space-y-4 md:space-y-6" action="#">
                            <div>
                                <label htmlFor="username"
                                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                    Nombre de usuario
                                </label>
                                <input type="text" name="username" placeholder="usuario" required ref={refUsername}
                                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                            </div>
                            <div className="">
                                <label htmlFor="email"
                                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                    email
                                </label>
                                <input type="email" name="email" placeholder="mail@mail.com" required ref={refEmail}
                                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                />
                            </div>

                            <div className="w-4/5 pb-8 mb-6 md:mb-0">
                                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white" htmlFor="category-list">
                                    <p>Tipo de registro</p>
                                </label>
                                <select onChange={handlerSelectChange}
                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                                    <option value={ROLES.Reader} defaultChecked>Lector</option>
                                    <option value={ROLES.Creator}>Creador de contenido</option>
                                </select>
                            </div>

                            {
                                showMessage ?
                                    <p className="text-yellow-300">{message}</p>
                                    : <></>
                            }

                            <button type="button" onClick={sendRegistration}
                                className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-lg px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">
                                Registrarme
                            </button>
                        </form>
                    </div>
                    <p className="py-4 text-white text-sm cursor-pointer">
                        <Link to="/login">
                            Iniciar sesión
                        </Link>
                    </p>

                </div>

            </div>
        </section>
    )
}
