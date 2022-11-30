import { React, useState } from "react";
import SearchBar from "../SearchBar/SearchBar";
import "./NavBar.css";
import Logo from "./Logo Cars-Market.png";
import { Link, useNavigate } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import imgDefault from "../Card/imagenes/usuario.png";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUsers, infoUseremail } from "../../Redux/Actions";
import Premium from "../Premium/Premium";

const estilos = {
  button_inicio:
    "text-white bg-blue-700 hover:bg-blue-800 focus:outline-none shadow-md shadow-black font-medium rounded-full md:px-2 md:text-sm md:py-1.5 xl:px-3 xl:text-base xl:py-2 2xl:text-lg 2xl:px-5 2xl:py-2.5  text-center mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-900 dark:focus:ring-blue-800",
  button_ingresar:
    "text-white bg-blue-700 hover:bg-blue-800 focus:outline-none shadow-md shadow-black font-medium rounded-full md:px-2 md:text-sm md:py-1.5 xl:px-3 xl:text-base xl:py-2 2xl:text-lg 2xl:px-5 2xl:py-2.5 text-center mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-900 dark:focus:ring-blue-800",
  button_registrarse:
    "text-white bg-blue-700 hover:bg-blue-800 focus:outline-none shadow-md shadow-black font-medium rounded-full md:px-2 md:text-sm md:py-1.5 xl:px-3 xl:text-base xl:py-2 2xl:text-lg 2xl:px-5 2xl:py-2.5 text-center mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-900 dark:focus:ring-blue-800",
  button_crearPublicacion:
    "text-white bg-blue-700 hover:bg-blue-800 focus:outline-none shadow-md shadow-black font-medium rounded-full md:px-2 md:text-sm md:py-1.5 xl:px-3 xl:text-base xl:py-2 2xl:text-lg 2xl:px-5 2xl:py-2.5 text-center mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-900 dark:focus:ring-blue-800",
};

export default function NavBar() {
  const carId = useSelector((state) => state.carDetail);
  const dispatch = useDispatch();
  const usuario = useSelector((state) => state.D_user);
  const [show, setShow] = useState(false);
  const { user, loginWithRedirect, isAuthenticated, logout } = useAuth0();
  const history = useNavigate();

  useEffect(() => {

    dispatch(getUsers());
  }, [dispatch]);
  const enviarDashboard = async () => {
    dispatch(infoUseremail(user.email))
    history("/dashboard");
  };

  return (
    <nav className="contenedor-NavBar">
      <Link to="/">
        {" "}
        <div className="w-24 ">
          <img
            src={Logo}
            onClick={() => history("/")}
            alt="img not found"
            className="h-16 rounded-sm"
            class="shadow-md shadow-black rounded-sm"
          />
        </div>
      </Link>
      {window.location.pathname !== "/createuser" &&
        window.location.pathname !== `/cars/${carId.id}` &&
        window.location.pathname !== "/createcar" &&
        window.location.pathname !== "/sellerRatingForm" &&
        window.location.pathname !== "/BuyerForm" &&
        window.location.pathname !== "/FormBaneo"
        && <SearchBar />}
      {isAuthenticated ? (
        <div
          class={
            show
              ? "flex flex-col items-center mt-36"
              : "flex flex-col items-center  h-full"
          }
        >
          <div class="flex">
            <div className="flex items-center  px-2 py-2">
              {window.location.pathname !== "/createuser" && window.location.pathname !== "/FormBaneo" && (
                <Premium user={user} ></Premium>
              )}
            </div>
            <div className="flex h-20">
              <div class="text-white md:text-sm lg:text-sm w-auto xl:text-base font-medium ml-2 justify-center flex flex-col ">
                <div>{(Array.isArray(usuario)) ? "Esperando para cargar" : `${usuario.firstName} ${usuario.lastName}`}</div>
                <div>{(Array.isArray(usuario)) ? "datos de usuario ..." : usuario.mail}</div>
              </div>
              <div class="w-32 ml-2">
                <div className=" flex md:w-auto h-20 ">
                  <div className="w-11/12 flex justify-center items-center">
                    <img
                      src={(Array.isArray(usuario)) ? "https://i.ibb.co/h9PXX01/usuario.png" : usuario.imgPerfil}
                      alt={imgDefault}
                      className="imagenPerfil"
                    />
                  </div>

                  <div className="bg-transparent items-center flex rounded-r">
                    <div
                      className="cursor-pointer h-10 flex items-center text-white mx-1"
                      onClick={() => setShow(!show)}
                    >
                      {show ? (
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="icon icon-tabler icon-tabler-chevron-up"
                          width={30}
                          height={30}
                          viewBox="0 0 24 24"
                          strokeWidth="1.5"
                          stroke="currentColor"
                          fill="none"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <path stroke="none" d="M0 0h24v24H0z" />
                          <polyline points="6 15 12 9 18 15" />
                        </svg>
                      ) : (
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="icon icon-tabler icon-tabler-chevron-up"
                          width={30}
                          height={30}
                          viewBox="0 0 24 24"
                          strokeWidth="1.5"
                          stroke="currentColor"
                          fill="none"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <path stroke="none" d="M0 0h24v24H0z" />
                          <polyline points="6 9 12 15 18 9" />
                        </svg>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {show && (
            <div class=" w-3/4 flex justify-end mt-4">
              <ul className="visible transition duration-300 opacity-100 bg-gray-50 shadow-black shadow-md rounded mb-4 py-2 w-3/4">
                <li className="cursor-pointer text-black text-lg leading-3 tracking-normal h-8 hover:bg-gray-200 px-3">
                  <button
                    name="Perfil"
                    value="Otro"
                    className="font-medium w-full h-8"
                    onClick={() => enviarDashboard()}
                    disabled={
                      (window.location.pathname === "/createuser" ||
                        window.location.pathname === "/FormBaneo"
                      ) && "true"
                    }
                  >
                    Perfil
                  </button>
                </li>
                <li className="cursor-pointer text-black text-lg leading-3 tracking-normal h-8 hover:bg-gray-200 px-3">
                  <button
                    name="Publicar tu auto"
                    onClick={() => history("/createcar")}
                    value="Otro"
                    className="font-medium w-full h-8"
                    disabled={
                      (window.location.pathname === "/createuser" ||
                        window.location.pathname === "/FormBaneo"
                      ) && "true"
                    }
                  >
                    Publicar tu auto
                  </button>
                </li>
                <li className="cursor-pointer text-black text-lg leading-3 tracking-normal h-8 hover:bg-gray-200 px-3">
                  <button
                    name="Cerrar sesion"
                    onClick={() => logout({ returnTo: window.location.origin })}
                    className="font-medium w-full h-8"
                  >
                    Cerrar sesión
                  </button>
                </li>
              </ul>
            </div>
          )}
        </div>
      ) : (
        <div>
          <button
            type="button"
            onClick={() => loginWithRedirect()}
            class={estilos.button_ingresar}
          >
            Ingresar
          </button>
          <button
            onClick={() => loginWithRedirect()}
            type="button"
            class={estilos.button_registrarse}
          >
            Registrarse
          </button>
        </div>
      )}
    </nav>
  );
}
