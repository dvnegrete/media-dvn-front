import { useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom"
import { getUserForEmail } from "../../service/api";

export const Login = () => {
    const navigate = useNavigate();
    const refEmail = useRef<HTMLInputElement>(null);
    const [message, setMessage] = useState("");
    const [showMessage, setShowMessage] = useState(false);

    const handlerClick = async () => {
        setShowMessage(false)
        if (refEmail.current) {
            const email = refEmail.current.value.trim();
            const res = await getUserForEmail(email);
            console.log(res);
            if (res._id) {
                localStorage.setItem("user", res._id);
                navigate("/dashboard");
            } else if (res.msg ==='Not found'){
                setMessage(res.msg);
                setShowMessage(true)
            }
        }
    }

    return (
        <section className="bg-gray-50 dark:bg-gray-900">
            <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">

                <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                    <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                        <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                            Inicia sesión con tu cuenta
                        </h1>
                        <form className="space-y-4 md:space-y-6" action="#">
                            <div>
                                <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                    Tu email
                                </label>
                                <input type="email" name="email" id="email" ref={refEmail}
                                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="mail@mail.com" required />
                            </div>


                            <button type="button" onClick={handlerClick}
                                className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">
                                Iniciar Sesión
                            </button>
                        </form>

                        {
                                showMessage ?
                                    <p className="text-yellow-300">{message}</p>
                                    : <></>
                            }

                        <div className="pt-8">
                            <p>¿No tienes cuenta? <span className="cursor-pointer underline font-bold"><Link to="/sign_up">Registrarme</Link></span></p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
