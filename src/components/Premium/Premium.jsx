import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { connect } from "react-redux";
import Swal from "sweetalert2";
import axios from "axios";
import {
  getTransaction,
  get_Payment_Link,
  infoUseremail,
  postTransaction,
} from "../../Redux/Actions.js";
export const Premium = ({
  user,
  getTransaction,
  postTransaction,
  transactions,
  get_Payment_Link,
  payment_link,
  premium2,
  usuario,
  infoUseremail,
}) => {
  const [premium, setPremium] = useState(false);
  //const [pay_Link, setPay_Link] = useState("");
  /*  async function createPayment() {
    let { data } = await axios.get("http://localhost:3001/payment");
    console.log(data.init_point);
    setPay_Link(data.init_point);
    return data.init_point;
  } */
  useEffect(() => {
    //console.log("------usuario-------");
    getTransaction();
    const data = {
      nroTransaction: user.email,
      type: "Compra",
      amount: "75000",
      email: user.email,
      date: "2022/10/18",
      userId: usuario.id,
      idTransaction: "245",
      statusTransaction: "Pendiente",
    };
   // console.log(user.email);
    infoUseremail(user.email);
    postTransaction(data);
   // console.log("----data------");
    //console.log(data);
    if (usuario && usuario.premium === true) {
      setPremium(true);
    }
    if(user && user.email){

      get_Payment_Link(user.email);
    }
    listadepremiums();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const getListaID = async () => {
    const data = await axios.get("/transactionsMercadoPago");
    return data;
  };

  const getdataporid = async (id) => {
    const apiExterna = await axios.get("/transMercado/" + id);
    return apiExterna;
  };

  const listadepremiums = async () => {
    if (usuario && usuario.premium === true) {
      setPremium(true);
    } else {
      const { data } = await getListaID();
      if (data.length) {
        //transacciones que fueron hechas
        const d = data.map((e) => e.nroTransaction);
        //console.log("-----------d------------");
        //console.log(d);
        const dato = [];
        for (let i = 0; i < d.length; i++) {
          dato.push(await getdataporid(d[i]));
        }
        for (let j = 0; j < dato.length; j++) {
          if (
            dato[j].data.email === user.email &&
            dato[j].data.status === "approved"
          ) {
            /* console.log("-----dacas--------");
            console.log(dato[j]);
            console.log(user.email);
            console.log("............"); */
            setPremium(true);
            await axios.put("/users/premium/" + user.email);
          }
        }
      }
      /*   console.log("------dato arreglo------");
      console.log(dato);
      console.log("----------------");
      console.log(dato.data.status);
      console.log("------email de auth 0---------");
      console.log(user.email);
      console.log("-------email--------");
      console.log(dato.data.email);
      console.log("---------------");
      console.log(dato.data.status); */
      /* if (user.email == dato.data.email && dato.data.status == "approved") {
        setPremium(true);
        await axios.put("/users/premium/" + user.email);
        ///enviar el id de la publicacion
        ///premium activado
      } */
    }
  };
  //const datos=d.map(async e=> await getdataporid(e))
  //console.log(datos.map(e=>e.data))

  const envio = (e) => {
    Swal.fire({
      title: "Estas a punto de ser del grupo PREMIUM de CARS-MARKET",
      confirmButtonColor: "#1d4ed8",
    }).then(function () {
      window.location = payment_link.init_point;
    });
  };
  // const esPremium = (e) => {};

  const estilos = {
    noPremium:
      "text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-2 py-1.5 text-center mr-2 mb-2",
    Premium:
      "text-white bg-gradient-to-r from-yellow-500 via-yellow-600 to-yellow-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-yellow-300 dark:focus:ring-yellow-800 font-medium rounded-lg text-sm px-2 py-1.5 text-center mr-2 mb-2",
  };
  return (
    <div>
      <button
        disabled={premium === true}
        onClick={(e) => envio(e)}
        className={premium === false ? estilos.noPremium : estilos.Premium}
      >
        {premium === false ? "¿Quieres Ser Premium?" : "Premium"}
      </button>
      {/* <button onClick={(e) => listadepremiums(e)}>mostrar lista</button> */}
    </div>
  );
};

function mapStateToProps(state) {
  return {
    transactions: state.transactions,
    payment_link: state.payment_link,
    usuario: state.D_user,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    postTransaction: (e) => dispatch(postTransaction(e)),
    getTransaction: () => dispatch(getTransaction()),
    get_Payment_Link: (e) => dispatch(get_Payment_Link(e)),
    infoUseremail: (e) => dispatch(infoUseremail(e)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Premium);
