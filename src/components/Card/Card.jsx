import { React, useState } from "react";
import icon1 from "./imagenes/la-carretera.png";
import icon2 from "./imagenes/mecanico.png";
import icon3 from "./imagenes/calendario.png";
import img from "./imagenes/Imagen_Default.png";
import { Link } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import Swal from "sweetalert2";
import "./Card.css";

function Card({
  id,
  image,
  descriptionShort,
  price,
  kilometres,
  transmition,
  year,
  prem,
  vendido,
}) {
  const { loginWithRedirect, isAuthenticated } = useAuth0();

  const [heart, setHeart] = useState(false);

  const RedirectRegister = () => {
    if (!isAuthenticated) {
      Swal.fire({
        title: "Usuario no registrado!!!",
        text: "Registrese para añadir este auto a sus favoritos.",
        icon: "warning",
        showCancelButton: false,
        showConfirmButton: false,
        timer: 20000,
      });

      loginWithRedirect();
    } else {
      if (heart) {
        setHeart(false);
      } else {
        setHeart(true);
        Swal.fire({
          title: "Añadido correctamente!!!",
          text: "Se ha añadido este auto a sus favoritos.",
          icon: "success",
          showCancelButton: false,
          showConfirmButton: false,
          timer: 2000,
        });
      }
      /* si isAuthenticated es verdadero añadir este carro a los favoritos de ese usuario (ejecutar un dispatch) */
    }
  };
  const estilos = {
    Premium:
      "text-white bg-gradient-to-r from-yellow-500 via-yellow-600 to-yellow-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-yellow-300  font-medium rounded-lg text-sm text-center md:w-40 h-full bg-white lg:w-52 xl:w-64 2xl:w-80  shadow-2xl rounded-lg",
    normal:
      "md:w-40 h-full bg-white lg:w-52 xl:w-64 2xl:w-80 shadow-2xl rounded-lg ",
      vendido:"  text-white md:w-40 h-full bg-gradient-to-r from-gray-500 via-gray-600 to-gray-700 lg:w-52 xl:w-64 2xl:w-80 shadow-2xl rounded-lg opacity-70 border"
  };
  return (
    <>
      <div className="px-5 py-2 ">
      
        <div className={vendido? estilos.vendido: prem ? estilos.Premium:  estilos.normal  }>
        {vendido ? (
            <h1 className="  text-center font-extrabold text-transparent text-3xl bg-clip-text bg-gradient-to-r from-red-300 to-red-400 ">
              vendido
            </h1>
          ) : (
            console.log("")
          )}
          <img
            class=" rounded-tl-lg rounded-tr-lg md:h-40 w-96 xl:h-60 2xl:h-64 "
            src={image ? image : img}
            alt="Img not found"
          />
          

          <div class="px-5 py-4 space-y-2">
            <div class="h-16 mb-1 md:mb-2  ">
              <h3 class="md:text-sm lg:text-base xl:text-lg 2xl:text-xl font-semibold">
                {descriptionShort}
              </h3>
            </div>
            <p
              class={
                prem
                  ? "space-x-2 border-t pt-2 border-gray-300 text-white"
                  : "space-x-2 border-t pt-2 border-gray-300 text-gray-700"
              }
            >
              <span class="md:text-base xl:text-lg 2xl:text-xl lg:mb-1 font-medium">
                Precio: {price}$
              </span>
            </p>
            <div
              class={
                prem
                  ? "flex flex-col p-2 border-t border-gray-300 text-white"
                  : "flex flex-col p-2 border-t border-gray-300 text-gray-700"
              }
            >
              <div class="flex-1  md:text-sm lg:text-base xl:text-lg  inline-flex items-center  font-medium">
                <img src={icon1} class="mr-4" alt="" />
                <p>Kilometros: {kilometres} Km</p>
              </div>
              <div class="flex-1  md:text-sm lg:text-base xl:text-lg inline-flex items-center  font-medium">
                <img src={icon2} class="mr-4" alt="" />
                <p>Trasmision: {transmition}</p>
              </div>
              <div class="flex-1 md:text-sm lg:text-base xl:text-lg inline-flex items-center  font-medium">
                <img src={icon3} class="mr-4" alt="" />
                <p>Año: {year}</p>
              </div>
            </div>
            {vendido===false?
            
            <div class="flex justify-center items-center">
              <Link to={`/cars/${id}`}>
                <button
                  title="Ver mas información del vehículo"
                  class="px-3 py-2 text-white bg-blue-900 hover:bg-blue-900 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-lg md:text-xs lg:text-base xl:text-lg  text-center mr-2 dark:bg-blue-600 dark:hover:bg-blue-900 dark:focus:ring-blue-900"
                >
                  Ver detalles
                </button>
              </Link>
            </div>
              :console.log("")}
          </div>
        </div>
      </div>
    </>
  );
}

export default Card;
