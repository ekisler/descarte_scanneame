import React from "react";
import "./LandingPage.css";
import auto from "./autoLanding.png";
import { Link } from "react-router-dom";
import { useEffect } from "react";
function LandingPage() {
  const estilos = {
    buttonlight:
      "bg-gradient-to-r from-cyan-500 to-blue-900 ",
    buttonvacio:
      " text-white bg-gradient-to-r from-cyan-10 to-cyan-10 px-10  text-4xl py-10 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-cyan-10 dark:focus:ring-cyan-10 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2",
  };

  useEffect(()=>{
    sessionStorage.removeItem("infoUser");
  },[])

  return (
    <div className={estilos.buttonlight} >
      <div className="prueba">
        <div className="text__presentation">
          <h1 className=" text-white  text-7xl">
            Bienvenidos a la mejor pagina para <strong>Publicar</strong> tu auto
          </h1>
        </div>
        <img src={auto} alt="fotoauto" className="auto"  />

        <Link to="/home" className="relative" href="#">
          <span className="top-key"></span>
          <span className={estilos.buttonvacio}>Ingresa para ver nuestros autos</span>
          <span className="bottom-key-1"></span>
          <span className="bottom-key-2"></span>
        </Link>
      </div>
    </div>
  );
}

export default LandingPage;
