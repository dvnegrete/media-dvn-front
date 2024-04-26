import { useContext } from "react"
import { Link } from "react-router-dom"

import { ROLES } from "../../shared/enum/Roles"
import { MediaDVNContext } from "../../Context"

import { IconCategory } from "../Icons/IconCategory"
import { IconHome } from "../Icons/IconHome"
import { IconMenu } from "../Icons/IconMenu"
import { IconTheme } from "../Icons/IconTheme"
import { IconSignIn } from "../Icons/IconSignIn"
import { IconSignUp } from "../Icons/IconSignUp"
import { IconUsers } from "../Icons/IconUsers"
import { IconReadContent } from "../Icons/IconReadContent"
import { IconSignOut } from "../Icons/IconSignOut"
import { IconContent } from "../Icons/IconContent"

export const SideBar = () => {

    const context = useContext(MediaDVNContext);

    const administratorRole = () => context?.permissions === ROLES.Administrator;
    const creatorRole = () => context?.permissions === ROLES.Creator;
    // const lectorRole = () => context?.permissions === ROLES.Reader;
    const isLoggedIn = () => context?.login;


    return (
        <>
            <button data-drawer-target="logo-sidebar" data-drawer-toggle="logo-sidebar" aria-controls="logo-sidebar" type="button" className="inline-flex items-center p-2 mt-2 ms-3 text-sm text-gray-500 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600">
                <span className="sr-only">Abrir Menu</span>
                <IconMenu />
            </button>

            <aside className="fixed top-0 left-0 z-40 w-64 h-screen transition-transform -translate-x-full sm:translate-x-0 dark:bg-gray-800" aria-label="Sidebar">
                <div className="h-5/6 px-3 py-4 overflow-y-auto bg-gray-50 dark:bg-gray-800">
                    <Link to="/"
                        className="flex items-center ps-2.5 mb-5">
                        <IconHome />
                        <span
                            className="self-center text-xl font-semibold whitespace-nowrap dark:text-white ml-2">
                            Disruptive Studio
                        </span>
                    </Link>
                    <ul className="space-y-2 font-medium">
                        <li>
                            <Link to="/"
                                className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                                <IconReadContent />
                                <span className="flex-1 ms-3 whitespace-nowrap">Contenidos</span>
                            </Link>
                        </li>
                        {
                            administratorRole() ?
                                <>
                                    <li>
                                        <Link to="/tematicas"
                                            className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                                            <IconTheme />
                                            <span className="flex-1 ms-3 whitespace-nowrap">Administrar Temáticas</span>
                                        </Link>
                                    </li>
                                    <li>
                                        <Link to="/nueva-categoria"
                                            className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                                            <IconCategory />
                                            <span className="flex-1 ms-3 whitespace-nowrap">Crear Categoria</span>
                                        </Link>
                                    </li>
                                    <li>
                                        <Link to="/contenido"
                                            className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                                            <IconContent />
                                            <span className="flex-1 ms-3 whitespace-nowrap">Crear Contenido</span>
                                        </Link>
                                    </li>
                                    <li>
                                        <Link to="/administracion"
                                            className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                                            <IconUsers />
                                            <span className="flex-1 ms-3 whitespace-nowrap">Usuarios</span>
                                        </Link>
                                    </li>
                                </>
                                :
                                <></>
                        }
                        {
                            creatorRole() ?
                                <li>
                                    <Link to="/contenido"
                                        className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                                        <IconContent />
                                        <span className="flex-1 ms-3 whitespace-nowrap">Crear Contenido</span>
                                    </Link>
                                </li>
                                :
                                <></>
                        }

                        {
                            isLoggedIn() ?
                                <>

                                    <li>
                                        <div onClick={() => context?.signOff()}
                                            className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group cursor-pointer">
                                            <IconSignOut />
                                            <span className="flex-1 ms-3 whitespace-nowrap">Cerrar Sesión</span>
                                        </div>
                                    </li>
                                </>
                                :
                                <>
                                    <li>
                                        <Link to="login"
                                            className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                                            <IconSignIn />
                                            <span className="flex-1 ms-3 whitespace-nowrap">Iniciar Sesión</span>
                                        </Link>
                                    </li>
                                    <li>
                                        <Link to="sign_up"
                                            className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                                            <IconSignUp />
                                            <span className="flex-1 ms-3 whitespace-nowrap">Registrarme</span>
                                        </Link>
                                    </li>
                                </>
                        }
                    </ul>
                </div>
                <div className="h-1/6 flex justify-center items-end bottom pb-3">
                    {
                        context?.username.username !== "" ?
                            <p>Bienvenido {context?.username.username}</p>
                            : <></>
                    }
                </div>

            </aside>
        </>
    )
}