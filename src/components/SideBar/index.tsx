import { useContext, useEffect, useState } from "react"
import { Link, useLocation } from "react-router-dom"

import { ROLES } from "../../shared/enum/Roles"
import { MediaDVNContext } from "../../Context"

import { IconCategory } from "../Icons"
import { IconHome } from "../Icons"
import { IconMenu } from "../Icons"
import { IconTheme } from "../Icons"
import { IconSignIn } from "../Icons"
import { IconSignUp } from "../Icons"
import { IconUsers } from "../Icons"
import { IconReadContent } from "../Icons"
import { IconSignOut } from "../Icons"
import { IconContent } from "../Icons"

export const SideBar = () => {

    const context = useContext(MediaDVNContext);
    const [isNavOpen, setIsNavOpen] = useState(false);
    
    const { state } = useLocation();
    useEffect(()=>{
        console.log(state);        
    }, [state])

    const menu = () => {
        setIsNavOpen((state) => !state)
        console.log(state);        
    };

    const administratorRole = () => context?.permissions === ROLES.Administrator;
    const creatorRole = () => context?.permissions === ROLES.Creator;
    const isLoggedIn = () => context?.login;

    return (
        <>
            <div className="dark:bg-gray-900 flex justify-end">
                <button onClick={menu}
                    data-drawer-target="logo-sidebar" data-drawer-toggle="logo-sidebar" aria-controls="logo-sidebar" type="button"
                    className="inline-flex items-center p-2 mt-2 mx-3 text-sm text-gray-400 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-100 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600">
                    <span className="sr-only">Abrir Menu</span>
                    <IconMenu />
                </button>
            </div>

            <aside
                className={`fixed top-0 left-0 z-40 w-64 h-screen transition-transform -translate-x-full ${isNavOpen ? 'sm:translate-x-0' : 'translate-x-0'}  dark:bg-gray-800`} aria-label="Sidebar">
                <div className="h-screen px-3 py-4 overflow-y-auto bg-gray-50 dark:bg-gray-800">
                    <Link to="/"
                        className="flex items-center ps-2.5 mb-5">
                        <IconHome />
                        <span
                            className="self-center text-xl font-semibold whitespace-nowrap dark:text-white ml-2">
                            Disruptive Studio
                        </span>
                    </Link>
                    <div className="flex flex-col h-5/6 justify-between">
                        <ul className="space-y-2 font-medium">
                            <li onClick={()=>setIsNavOpen(false)}>
                                <Link to="/" state={{ some: "content" }}
                                    className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                                    <IconReadContent />
                                    <span className="flex-1 ms-3 whitespace-nowrap">Contenidos</span>
                                </Link>
                            </li>
                            {
                                administratorRole() &&
                                    <>
                                        <li>
                                            <Link to="/tematicas" state={{ some: "tematicas" }}
                                                className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                                                <IconTheme />
                                                <span className="flex-1 ms-3 whitespace-nowrap">Administrar Temáticas</span>
                                            </Link>
                                        </li>
                                        <li>
                                            <Link to="/nueva-categoria" state={{ some: "Crear Categoria" }}
                                                className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                                                <IconCategory />
                                                <span className="flex-1 ms-3 whitespace-nowrap">Crear Categoria</span>
                                            </Link>
                                        </li>
                                        <li>
                                            <Link to="/contenido" state={{ some: "Crear Contenido" }}
                                                className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                                                <IconContent />
                                                <span className="flex-1 ms-3 whitespace-nowrap">Crear Contenido</span>
                                            </Link>
                                        </li>
                                        <li>
                                            <Link to="/administracion" state={{ some: "Usuarios" }}
                                                className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                                                <IconUsers />
                                                <span className="flex-1 ms-3 whitespace-nowrap">Usuarios</span>
                                            </Link>
                                        </li>
                                    </>
                            }
                            {
                                creatorRole() &&
                                    <li>
                                        <Link to="/contenido" state={{ some: "Crear Contenido" }}
                                            className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                                            <IconContent />
                                            <span className="flex-1 ms-3 whitespace-nowrap">Crear Contenido</span>
                                        </Link>
                                    </li>
                            }

                        </ul>
                        <ul className="space-y-2 font-medium">
                            <div className="h-auto flex justify-center items-end bottom p-5 text-cyan-400">
                                {
                                    context?.username.username !== "" ?
                                        <p>Bienvenido <span className="uppercase">{context?.username.username}</span></p>
                                        : <></>
                                }
                            </div>
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
                                            <Link to="login" state={{ some: "Iniciar Sesión" }}
                                                className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                                                <IconSignIn />
                                                <span className="flex-1 ms-3 whitespace-nowrap">Iniciar Sesión</span>
                                            </Link>
                                        </li>
                                        <li>
                                            <Link to="sign_up" state={{ some: "Registrarme" }}
                                                className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                                                <IconSignUp />
                                                <span className="flex-1 ms-3 whitespace-nowrap">Registrarme</span>
                                            </Link>
                                        </li>
                                    </>
                            }
                        </ul>
                    </div>
                </div>

            </aside>


        </>
    )
}