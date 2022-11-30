import { React, useEffect, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getUsers, postUser } from "../../Redux/Actions";
import Swal from "sweetalert2";
import NavBar from "../NavBar/NavBar";
import imagen from "../Card/imagenes/usuario.png";
import Loading from "../Loading/Loading.jsx";
import axios from "axios";

//ESTILOS TAILWIND
const estilos = {
  input:
    "border-4 border-gray-300 pl-3 py-3 shadow-sm bg-transparent rounded text-lg focus:outline-none focus:border-blue-500 placeholder-gray-500 text-gray-700",
  contenedor_input_y_titulo: "md:w-auto flex flex-col mb-6",
  titulos: "text-xl leading-8 font-semibold text-gray-800 pb-2",
  boton_enviar_informacion:
    "text-white bg-blue-700 hover:bg-blue-800 focus:outline-none shadow-md shadow-black rounded-full text-center mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-900 dark:focus:ring-blue-800 font-semibold text-lg leading-4 w-auto px-5 py-5 lg:mt-12 mt-6",
  boton_volver_inicio:
    "text-white bg-blue-700 hover:bg-blue-800 focus:outline-none shadow-md shadow-black rounded-full text-center mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-900 dark:focus:ring-blue-800 font-semibold text-lg leading-4  w-auto px-5 py-5 lg:mt-12 mt-6",
};

function FormRegister() {
  const { user, isAuthenticated, isLoading } = useAuth0();
  const usuarios = useSelector((state) => state.allUsers);
  const dispatch = useDispatch();
  const history = useNavigate();

  useEffect(() => {
    dispatch(getUsers());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const userEmail = user && user.email;
  const buscados = usuarios && usuarios.find((u) => u.mail === userEmail);
  const [switche, setSwitche] = useState(false);
  const [img, setImg] = useState("");

  const [dataPerfil, setDataPerfil] = useState({
    firstName: "",
    lastName: "",
    mail: "",
    whatsApp: "",
    address: "",
    imgPerfil: "",
  });

  async function uploadImage(file) {
    const formData = new FormData();
    formData.append("file", file[0]);
    formData.append("upload_preset", "iduftmjv");
    const imgUrl = await axios
      .post("https://api.cloudinary.com/v1_1/da1vbkmdr/image/upload", formData)
      .then((response) => response.data.secure_url);
    setImg(imgUrl);
    dataPerfil.imgPerfil = imgUrl;
  }

  //VALIDACIONES
  const [errors, setErrors] = useState({});

  function validate(input) {
    let errors = {};

    if (!input.firstName) {
      errors.firstName = "Se requiere un nombre de usuario";
    } else if (!/^[_A-z]*((-|\s)*[_A-z])*$/g.test(input.firstName)) {
      errors.firstName =
        "El nombre no puede tener caracteres especiales o números";
    }
    if (!input.lastName) {
      errors.lastName = "Se requiere un apellido";
    } else if (!/^[_A-z]*((-|\s)*[_A-z])*$/g.test(input.lastName)) {
      errors.lastName =
        "El apellido no puede tener caracteres especiales o números";
    }
    if (!input.whatsApp) {
      errors.whatsApp = "Se requiere un numero telefonico";
    } else if (!/^[0-9]+$/g.test(input.whatsApp)) {
      errors.whatsApp = "El telefono solo puede contener numeros";
    }

    return errors;
  }

  if (!user && isLoading) {
    return <Loading />;
  } else if (isAuthenticated && buscados && buscados.active === false) {
      history("/home");
  } else if (isAuthenticated && !user.email_verified) {
    Swal.fire({
      title: "Usuario no verificado",
      text: "Por favor verifique su bandeja correo, valide su registro y recargue de nuevo la pagina",
      icon: "error",
      confirmButtonColor: "#1d4ed8",
      showCancelButton: false,
      showConfirmButton: false,
      allowOutsideClick: false,
      allowEscapeKey: false,
    });
  } else if (isAuthenticated && buscados === undefined) {
    if (!switche) {
      Swal.fire({
        title: "Completa el registro",
        text: "Llene los siguientes campos para completar el registro",
        icon: "warning",
        confirmButtonColor: "#1d4ed8",
        showCancelButton: false,
        showConfirmButton: true,
        allowOutsideClick: false,
        allowEscapeKey: false,
      }).then(function () {
        setSwitche(true);
        setDataPerfil({
          ...dataPerfil,
          mail: user.email,
        });
      });
    }
  } else if (isAuthenticated && buscados) {
    Swal.fire({
      title: "Inicio se sesión satisfactorio",
      icon: "success",
      confirmButtonColor: "#1d4ed8",
      showCancelButton: false,
      showConfirmButton: true,
      allowOutsideClick: false,
      allowEscapeKey: false,
    }).then(function () {
      history("/home");
    });
  }

  const handleChange = (e) => {
    setSwitche(true);
    setDataPerfil({ ...dataPerfil, [e.target.name]: e.target.value });
    !dataPerfil.imgPerfil && setDataPerfil({ ...dataPerfil, imgPerfil: "https://i.ibb.co/h9PXX01/usuario.png" })
    setErrors(validate({ ...dataPerfil, [e.target.name]: e.target.value }));
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (dataPerfil.firstName && dataPerfil.lastName && dataPerfil.whatsApp) {
      Swal.fire({
        title: "Formulario enviado",
        text: "Se ha registrado su información correctamente.",
        icon: "success",
        confirmButtonColor: "#1d4ed8",
      });

      dispatch(postUser(dataPerfil));
      setDataPerfil({
        firstName: "",
        lastName: "",
        mail: "",
        whatsApp: "",
        address: "",
        imgPerfil: "",
      });
      getUsers();
      history("/home");
    } else {
      Swal.fire({
        title: "ERROR!!!",
        text: "No se han completado los campos requeridos.",
        icon: "error",
        confirmButtonColor: "#1d4ed8",
      }).then(function () {
        dispatch(getUsers());
      });
    }
  };

  return (
    <div class="">
      <NavBar />
      {buscados === undefined && (
        <form id="login" onSubmit="">
          <div className="bg-white pt-24 dark:bg-white">
            <div className="container mx-auto bg-white mt-10 rounded px-4">
              <div className="xl:w-ful border-b border-gray-300 py-5">
                <div className="flex justify-center w-11/12 mx-auto xl:w-full xl:mx-0 items-center">
                  <p className="font-semibold lg:text-4xl text-3xl lg:leading-9 leading-7 text-gray-800">
                    Completa tu perfil
                  </p>
                  <div
                    title="Complete todo los campos para tener un mejor perfil"
                    className="ml-2 cursor-pointer  text-black"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      width={16}
                      height={16}
                    >
                      <path
                        className="heroicon-ui"
                        d="M12 22a10 10 0 1 1 0-20 10 10 0 0 1 0 20zm0-2a8 8 0 1 0 0-16 8 8 0 0 0 0 16zm0-9a1 1 0 0 1 1 1v4a1 1 0 0 1-2 0v-4a1 1 0 0 1 1-1zm0-4a1 1 0 1 1 0 2 1 1 0 0 1 0-2z"
                        fill="currentColor"
                      />
                    </svg>
                  </div>
                </div>
              </div>
              {/*-------------------------------------------------------------------- Columna 1 ---------------------------------------------------------------------*/}

              <div className="flex lg:flex-row md:flex-col sm:flex-col md:items-center sm:items-center">
                <div className="ml-20 mr-20 w-2/4 pt-8">
                  <div className="container mx-auto">
                    <div className={estilos.contenedor_input_y_titulo}>
                      <label htmlFor="name" className={estilos.titulos}>
                        Nombre:
                      </label>
                      <input
                        type="text"
                        id="firstName"
                        name="firstName"
                        className={estilos.input}
                        onChange={(e) => handleChange(e)}
                        placeholder="Indicar nombre completo ..."
                      />
                      {errors.firstName && (
                        <p class="text-red-500 text-lg mt-2">
                          {errors.firstName}
                        </p>
                      )}
                    </div>
                    <div className={estilos.contenedor_input_y_titulo}>
                      <label htmlFor="lastName" className={estilos.titulos}>
                        Apellido:
                      </label>
                      <input
                        type="text"
                        id="lastName"
                        name="lastName"
                        className={estilos.input}
                        onChange={(e) => handleChange(e)}
                        placeholder="Indicar apellidos ..."
                      />
                      {errors.lastName && (
                        <p class="text-red-500 text-lg mt-2">
                          {errors.lastName}
                        </p>
                      )}
                    </div>
                    <div className={estilos.contenedor_input_y_titulo}>
                      <label htmlFor="mail" className={estilos.titulos}>
                        Correo:
                      </label>
                      <input
                        type="text"
                        id="mail"
                        name="mail"
                        className={estilos.input}
                        value={user && user.email}
                        placeholder="Indicar dirección de correo electrónico ..."
                      />
                    </div>
                    <div className={estilos.contenedor_input_y_titulo}>
                      <label htmlFor="whatsApp" className={estilos.titulos}>
                        Teléfono:
                      </label>
                      <input
                        type="text"
                        id="whatsApp"
                        name="whatsApp"
                        className={estilos.input}
                        onChange={(e) => handleChange(e)}
                        placeholder="Indicar numero telefónico ..."
                      />
                      {errors.whatsApp && (
                        <p class="text-red-500 text-lg mt-2">
                          {errors.whatsApp}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
                {/*-------------------------------------------------------------------- Columna 2 ---------------------------------------------------------------------*/}
                <div className="lg:mr-20 w-2/4 pt-8 md:items-center sm:items-center">
                  <div className="container mx-auto">
                    <div className="flex flex-col justify-center items-center mb-6">
                      <div className="border-blue-900 border-4 rounded-2xl w-2/4 flex justify-center">
                        <img
                          src={
                            dataPerfil.imgPerfil ? dataPerfil.imgPerfil : "https://i.ibb.co/h9PXX01/usuario.png"
                          }
                          alt="img not found"
                          className="w-auto rounded-2xl"
                        />
                      </div>
                      <div className="pt-5 text-sm text-slate-500">
                        Cuando suba la imagen espere unos minutos a que se muestre en el recuadro.
                      </div>
                    </div>
                    <div className={estilos.contenedor_input_y_titulo}>
                      <label htmlFor="image" className={estilos.titulos}>
                        Imagen de perfil:
                      </label>
                      <input
                        type="file"
                        id="image"
                        name="image"
                        className={estilos.input}
                        onChange={(e) => uploadImage(e.target.files)}
                      />
                    </div>
                    <div className={estilos.contenedor_input_y_titulo}>
                      <label htmlFor="address" className={estilos.titulos}>
                        Dirección:
                      </label>
                      <textarea
                        type="text"
                        id="address"
                        name="address"
                        className={estilos.input}
                        onChange={(e) => handleChange(e)}
                        placeholder="Indicar su dirección ..."
                      />
                      {/* {errors.price && (<p class="text-red-500 text-lg mt-2">{errors.price}</p>)} */}
                    </div>
                  </div>
                </div>
              </div>
              <div className="container flex justify-center">
                <button
                  type="submit"
                  onClick={(e) => handleSubmit(e)}
                  className={estilos.boton_enviar_informacion}
                >
                  Enviar información
                </button>
              </div>
            </div>
          </div>
        </form>
      )}
    </div>
  );
}

export default FormRegister;
