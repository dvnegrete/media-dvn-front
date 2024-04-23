import { IconCategory } from "../Icons/IconCategory"
import { IconDashboard } from "../Icons/IconDashboard"
import { IconHome } from "../Icons/IconHome"
import { IconMenu } from "../Icons/IconMenu"
import { IconTheme } from "../Icons/IconTheme"
import { IconSignIn } from "../Icons/IconSignIn"
import { IconSignUp } from "../Icons/IconSignUp"
import { IconUsers } from "../Icons/IconUsers"
import { IconContent } from "../Icons/IconContent"
import { IconReadContent } from "../Icons/IconReadContent"
import { Link, useNavigate } from "react-router-dom"
import { IconSignOut } from "../Icons/IconSignOut"

export const SideBar = () => {
    const navigate = useNavigate()
    const handlerLogOut =()=>{
        localStorage.removeItem('user');
        navigate("/login");
    }

    return (
        <>
            <button data-drawer-target="logo-sidebar" data-drawer-toggle="logo-sidebar" aria-controls="logo-sidebar" type="button" className="inline-flex items-center p-2 mt-2 ms-3 text-sm text-gray-500 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600">
                <span className="sr-only">Open sidebar</span>
                <IconMenu />
            </button>

            <aside className="fixed top-0 left-0 z-40 w-64 h-screen transition-transform -translate-x-full sm:translate-x-0" aria-label="Sidebar">
                <div className="h-full px-3 py-4 overflow-y-auto bg-gray-50 dark:bg-gray-800">
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
                            <Link to="/dashboard"
                                className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                                <IconDashboard />
                                <span className="ms-3">Dashboard</span>
                            </Link>
                        </li>
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
                            <Link to="/nuevo-contenido"
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

                        <li>
                            <Link to="sign_up"
                                className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                                <IconSignUp />
                                <span className="flex-1 ms-3 whitespace-nowrap">Registrarme</span>
                            </Link>
                        </li>
                        <li>
                            <Link to=""
                                className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                                <IconReadContent />
                                <span className="flex-1 ms-3 whitespace-nowrap">Contenidos</span>
                            </Link>
                        </li>
                        <li>
                            <Link to="login"
                                className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                                <IconSignIn />
                                <span className="flex-1 ms-3 whitespace-nowrap">Iniciar Sesión</span>
                            </Link>
                        </li>
                        <li>
                            <div onClick={handlerLogOut}
                            className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group cursor-pointer">
                                <IconSignOut />
                                <span className="flex-1 ms-3 whitespace-nowrap">Cerrar Sesión</span>
                            </div>
                        </li>
                    </ul>
                </div>
            </aside>
        </>
    )
}