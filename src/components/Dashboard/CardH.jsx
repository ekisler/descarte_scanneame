import React from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { useDispatch } from "react-redux";
import {
  getCars,
  infoUseremail,
  updateActiveCar,
  updateVendidoCar,
} from "../../Redux/Actions";
import { useEffect } from "react";
import Loading from "../Loading/Loading";

function CardH({
  image,
  estilos,
  id,
  descriptionShort,
  editar,
  name,
  car,
  email,
admin
}) {
  const estilosaca={
   disponible: `font-extrabold text-${car.vendido?"orange":"green"}-500 text-3xl bg-clip-text   
    `
  }

  const dispatch = useDispatch();

  const navigate = useNavigate();

  const pausar = (e) => {
    e.preventDefault();

    Swal.fire({
      title: ` 😃 \n ¿ Desea  ${
        car.active ? "pausar" : "activar"
      } la publicacion ?`,

      icon: "warning",
      showCancelButton: true,
      confirmButtonText: `${car.active ? "pausar" : "activar"}`,
      showConfirmButton: true,
      confirmButtonColor: "#1d4ed8",
      cancelButtonColor: "#1d4ed8",
      timer: 20000,
    }).then((resultado) => {
      if (resultado.value) {


        dispatch(getCars())
        dispatch(updateActiveCar(car.id, car.active?false:true))
        dispatch(infoUseremail(email))
        Swal.fire({
          title: `Se ${car.active ? "Pauso" : "Activo"} La Publicación`,
          text: `Encuentralo en Publicaciones ${car.active ? "Pausadas " : ""}`,
          confirmButtonColor: "#1d4ed8",
        });
        dispatch(infoUseremail(email));
        dispatch(getCars());
      }
    });
  };
  const EditarCarro = (e) => {
    e.preventDefault();
    editar("updatecar", car, car.active);
  };

  const CarroVendido = () => {
    if (car.vendido) {
      Swal.fire({ title: "carro disponible para venta" });
      dispatch(getCars())
      dispatch(Loading())
      dispatch(updateVendidoCar(car.id, car.vendido ? false : true));
      dispatch(getCars());
    } else {
      Swal.fire({
        title: "¿Logro vender el vehiculo?",
        text: "En caso de confirmar sera redirigido a un formulario para que llene algunos datos del comprador y asi pueda calificar su venta.",
        icon: "warning",
        confirmButtonColor: "#1d4ed8",
        cancelButtonColor: "#1d4ed8",
        showCancelButton: true,
        confirmButtonText: "Si, continuar",
        cancelButtonText: "No, cancelar",
      }).then((result) => {
      /*   console.log("................");
        console.log(car);
        console.log("................");
        console.log(car.id);
 */
        dispatch(updateVendidoCar(car.id, car.vendido ? false : true));
        result.isConfirmed && navigate("/BuyerForm");
      });
    }
  };

  return (
    <div class={car.active ? estilos.activo : estilos.noactivo}>
   
      <div class=" rounded-lg shadow-lg bg-white max-w-sm ">
        <img class="rounded-b-lg max-h-48" src={image} alt="" />
      </div>
      <div class="px-2">
        <h1 className={estilosaca.disponible}>{car.vendido?"vendido":"disponible"}</h1>
        <h5 class=" text-xl font-medium mb-2">{name}</h5>
        <p class=" text-base mb-4">{descriptionShort}</p>

        <button
          onClick={() => navigate("/cars/" + id)}
          className={estilos.buttonlight}
        >
          Detalles
        </button>

        <button onClick={(e) => EditarCarro(e)} className={estilos.buttonlight}>
          Editar
        </button>

        <button onClick={(e) => pausar(e)} className={estilos.buttonred}>
          {car.active ? "pausar" : "activar"}
        </button>
        {admin?console.log(""):
        <button onClick={() => CarroVendido()} className={estilos.buttonorange}>
          {car.vendido ? "activar para venta" : "marcar como vendido"}
        </button>
        }
      </div>
    </div>
  );
}

export default CardH;
