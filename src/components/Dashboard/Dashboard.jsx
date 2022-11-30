import React from "react";
import FormUpdateUser from "./FormUpdateUser";
import CardH from "./CardH";
import { useState } from "react";
import { connect } from "react-redux";
import { getCars, getUsers, infoUseremail } from "../../Redux/Actions";
import FormUpdateCar from "./FormUpdateCar";
import { useNavigate } from "react-router-dom";
import BienvenidoPanel from "./BienvenidoPanel";
import { useEffect } from "react";
import UserTable from "./UserTable";
import Graficos from "./Graficos";
import Favorite from "./Favorite";

export const Dashboard = ({ user, infoUser, getUsers, allUsers ,Cars,getCars}) => {
  useEffect(() => {
    getUsers();
    getCars()
  }, []);
  const navigate = useNavigate();
  const [admin, setAdmin] = useState(user.mail==="pancracio3nov@gmail.com");
  const [pauso, setPauso] = useState(null);
  const [caso, setCaso] = useState("");
  const [carro, setCarro] = useState(null);

  const estilos = {
    container: `  flex bg-gradient-to-r from-${
      admin ? "yellow" : "blue"
    }-500   to-${admin ? "yellow-800" : "sky-800"}`,
    container2: `sticky top-0 w-1/5 h-screen bg-gradient-to-r from-${
      admin ? "yellow-700" : "sky-600"
    }   to-${admin ? "yellow-800" : "sky-400"}`,
    panelnombre: `sticky top-0 border-b-4 bg-gradient-to-r from-${
      admin ? "yellow-600" : "sky-700"
    }   to-${
      admin ? "yellow-700" : "sky-500"
    } p-3 text-gray-900 text-right    p-5 text-2xl `,
    panelcontenido: ` py-10 text-gray-800 shadow-blue-500 w-max   font-semibold ease-in duration-300 text-center rounded-3xl `,
    panelsuperior: `flex-col w-screen  bg-gradient-to-r from-${
      admin ? "yellow-300" : "sky-300"
    } via-neutral-500 via-${admin ? "neutral" : "sky"}-500 to-${
      admin ? "neutral" : "sky"
    }-300  bg-gradient-to-tr `,
    buttonlight: `text-${admin ? "gray-700" : "white"} bg-gradient-to-r from-${
      admin ? "yellow" : "blue"
    }-500  to-${
      admin ? "yellow" : "sky"
    }-400 hover:bg-gradient-to-br  font-medium rounded-lg text-sm px-3 py-3 text-center mr-2 mb-2"`,
    buttonBloquear: `text-${admin ? "gray-900" : "white"} bg-gradient-to-r from-orange-300  to-orange-500 
     hover:bg-gradient-to-br  font-medium  text-sm px-3 py-3 text-center mr-2 mb-2"`,
    panel: ` w-max flex py-10 m-2 h-max bg-gradient-to-r from-${
      admin ? "yellow" : "cyan"
    }-400 via-${admin ? "yellow" : "sky"}-500 to-${
      admin ? "yellow" : "sky"
    }-600  rounded-r-full  `,
    buttonred: `text-${
      admin ? "gray-700" : "white"
    } bg-gradient-to-r from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2 py-3 my-3`,
    buttonorange: `text-${
      admin ? "gray-700" : "white"
    } bg-gradient-to-r from-orange-400 via-orange-500 to-orange-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-orange-300 dark:focus:ring-orange-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2 py-3 my-3`,
    
    mensaje: ` text-3xl tex-center p-3 text-white  shadow-${
      admin ? "yellow" : "cyan"
    }-500 shadow-md w-max    font-semibold ease-in duration-300 text-center rounded-3xl `,
    titulo: ` text-8xl tex-center p-3 text-white w-max    font-semibold ease-in duration-300 text-center rounded-3xl `,
    tituloAdmin: `text-5xl tex-center p-3 text-white w-max    font-semibold ease-in duration-300 text-center rounded-3xl `,
    li: `p-3 text-${admin ? "gray-700" : "white"}  shadow-${
      admin ? "yellow-700" : "blue-500"
    } shadow-md w-max  hover:text-gray-700  font-semibold ease-in duration-300 text-center rounded-3xl cursor-pointer`,
    tableitem: `p-3 text-${admin ? "gray-700" : "white"}  shadow-${
      admin ? "yellow-700" : "blue-500"
    } shadow-md w-max  font-semibold ease-in duration-300 text-center rounded-sm`,
    tabletitulo: `bg-gradient-to-r from-neutral-600 via-neutral-500 to-neutral-600 p-3 text-white  shadow-${
      admin ? "yellow-700" : "blue-500"
    } shadow-md w-max  font-semibold ease-in duration-300 text-center rounded-sm`,
    li2: `p-3 text-red-100 shadow-md hover:text-red-800  font-semibold ease-in duration-300 text-center rounded-3xl cursor-pointer`,
    li3: `text-lg p-4 text-${
      admin ? "yellow" : "cyan"
    }-800  shadow-2xl w-max shadow-${
      admin ? "yellow" : "cyan"
    }-900 hover:text-yellow-00  font-bold ease-in duration-300 text-center rounded-3xl cursor-pointer`,
    lisesion: ` p-3 my-5 text-${admin ? "yellow" : "white"} shadow-${
      admin ? "yellow" : "cyan"
    }-800 shadow-xl w-max  hover:text-${
      admin ? "yellow" : "cyan"
    }-800  font-semibold ease-in duration-300 text-center rounded-3xl cursor-pointer`,
    label: ``,
    input: `p-2 rounded `,
    contenedorInput: `flex flex-col border-4 w-96`,
    labela: `pl-2 pr-8 font-semibold`,
    activo: ` flex flex-row  max-w-4xl  justify-start text-black bg-gradient-to-r from-stone-200  to-stone-300 m-3 rounded-b-lg `,
    noactivo: `flex flex-row  max-w-4xl  justify-start text-black bg-gradient-to-r from-yellow-200  to-yellow-300 m-3 rounded-b-lg `,
  };

  const editarCar = (e, car, pauso) => {
    setCarro(car);
    setCaso(e);
    setPauso(pauso);
  };
  const opcion = (e) => {
    switch (e) {
      case "":
        return (
          <BienvenidoPanel
            administrador={admin}
            estilos={estilos}
          ></BienvenidoPanel>
        );
         
      case "FormUpdate":
        return <FormUpdateUser user={user} estilos={estilos}></FormUpdateUser>;
      case "estadisticas":
        return <Graficos></Graficos>
      case "publicaciones":
        return (
          admin? Cars.filter(e=>e.active).map((el) => {
            return (
              <CardH
                image={el.image}
                estilos={estilos}
                car={el}
                id={el.id}
                editar={editarCar}
                descriptionShort={el.descriptionShort}
                name={el.name}
                email={user.mail}
                admin={admin}
              >
                {" "}
              </CardH>
            );
          }):
          user &&
          user?.cars
            .filter((e) => e.active)
            .map((el) => {
              return (
                <CardH
                  image={el.image}
                  estilos={estilos}
                  car={el}
                  id={el.id}
                  editar={editarCar}
                  descriptionShort={el.descriptionShort}
                  name={el.name}
                  email={user.mail}
                  admin={admin}
                >
                  {" "}
                </CardH>
              );
            })
        );
      case "publicaciones pausadas":
        return (admin? Cars.filter(e=>e.active===false).map((el) => {
          return (
            <CardH
              image={el.image}
              estilos={estilos}
              car={el}
              id={el.id}
              editar={editarCar}
              descriptionShort={el.descriptionShort}
              name={el.name}
              email={user.mail}
              admin={admin}
            >
              {" "}
            </CardH>
          );
        }):
          user &&
          user?.cars
            .filter((e) => e.active === false)
            .map((el) => {
              return (
                <CardH
                  email={user.mail}
                  image={el.image}
                  estilos={estilos}
                  car={el}
                  id={el.id}
                  editar={editarCar}
                  descriptionShort={el.descriptionShort}
                  name={el.name}
                  admin={admin}
                >
                  {" "}
                </CardH>
              );
            })
        );

      case "updatecar":
        return <FormUpdateCar car={carro}></FormUpdateCar>;
      case "favoritos":
        return <Favorite/>
      case "usuarios":
        return <UserTable estilos={estilos}users={allUsers} />;
      default:
        break;
    }
  };
  const cerrarSesion = (e) => {
    navigate("/home");
  };
  return (
    <div className={estilos.container}>
      <section className={estilos.container2}>
        <div className={estilos.panel}>
          <ul className="rounded flex-row px-3">
            <li className={estilos.panelcontenido}>
              <strong>DASHBOARD</strong>
            </li>

            <li
              onClick={() => setCaso("FormUpdate")}
              className={caso === "FormUpdate" ? estilos.li3 : estilos.li}
            >
              {" "}
              Datos De Usuario
            </li>
            <li
              onClick={() => setCaso("publicaciones")}
              className={caso === "publicaciones" ? estilos.li3 : estilos.li}
            >
              {" "}
              Publicaciones{" "}
            </li>
            <li
              onClick={() => setCaso("favoritos")}
              className={caso === "favoritos" ? estilos.li3 : estilos.li}
            >
              Favoritos
            </li>
            <li
              onClick={() => setCaso("publicaciones pausadas")}
              className={
                caso === "publicaciones pausadas" ? estilos.li3 : estilos.li
              }
            >
              Publicaciones <br /> Pausadas
            </li>
            {admin ? (
              <>
                <li
                  onClick={() => setCaso("estadisticas")}
                  className={caso === "estadisticas" ? estilos.li3 : estilos.li}
                >
                  {" "}
                  Estadisticas
                </li>
                <li
                  onClick={() => setCaso("usuarios")}
                  className={caso === "usuarios" ? estilos.li3 : estilos.li}
                >
                  {" "}
                  usuarios
                </li>
              </>
            ) : (
              ""
            )}

            <li onClick={(e) => cerrarSesion(e)} className={estilos.lisesion}>
              Volver a Home
            </li>
          </ul>
        </div>
      </section>
      <section className={estilos.panelsuperior}>
        <div className={estilos.panelnombre}>
          <strong>
            {admin ? "Administrador" : "Perfil De Usuario"}
          </strong>
        </div>
        <section>
          <div>{opcion(caso)}</div>
        </section>
      </section>
    </div>
  );
};
function mapStateToProps(state) {
  return {
    Cars: state.allCars,
    Car: state.car,
    user: state.D_user,
    allUsers: state.allUsers,
    //temperaments: state.temperaments,
  };
}
function mapDispatchToProps(dispatch) {
  return {
    infoUser: (e) => dispatch(infoUseremail(e)),
    getUsers: () => dispatch(getUsers()),
    getCars: () => dispatch(getCars()),
    /*getCars: () => dispatch(getCars()),
    Model: (e) => dispatch(filterForModel(e)),
    Brand: (e) => dispatch(filterForBrand(e)), */
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
