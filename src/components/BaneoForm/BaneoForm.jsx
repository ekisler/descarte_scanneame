import { React, useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import NavBar from '../NavBar/NavBar';
import { useAuth0 } from '@auth0/auth0-react';
import { sendEmailAdmi } from '../../Redux/Actions.js';
import Loading from '../Loading/Loading.jsx';
import Swal from 'sweetalert2'
import { useLocalStorage } from '../contactForm/useLocalStorage'

const estilos = {
    input: "border-4 border-gray-300 pl-3 py-3  shadow-sm bg-transparent rounded text-lg focus:outline-none focus:border-blue-500 placeholder-gray-500 text-gray-700",
    contenedor_input_y_titulo: "w-full flex flex-col mb-6",
    titulos: "text-xl leading-8 font-semibold text-gray-800 pb-2",
    boton_enviar_informacion: "text-white bg-blue-700 hover:bg-blue-800 focus:outline-none shadow-md shadow-black rounded-full text-center mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-900 dark:focus:ring-blue-800 font-semibold text-lg leading-4 w-auto px-5 py-5 lg:mt-12 mt-6",
    boton_volver_inicio: "text-white bg-blue-700 hover:bg-blue-800 focus:outline-none shadow-md shadow-black rounded-full text-center mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-900 dark:focus:ring-blue-800 font-semibold text-lg leading-4  w-auto px-5 py-5 lg:mt-12 mt-6"
}

function BaneoForm() {

    const dispatch = useDispatch()
    const history = useNavigate();
    const usuario = useSelector((state) => state.D_user);
    const { user } = useAuth0();

    //LOCAL STORAGE
    const [userStorage, setInfo] = useState(
        JSON.parse(window.sessionStorage.getItem("infoUser"))
    );

    const setLocalStorage = (value) => {
        try {
            setInfo(value);
            window.sessionStorage.setItem("infoUser", JSON.stringify(value))
        } catch (error) {
            console.error(error);
        }
    }

    useEffect(() => {
        !Array.isArray(usuario) && setLocalStorage(usuario);
        return()=>{
            sessionStorage.removeItem("infoUser");
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    //ESTADO LOCAL DE LOS DATOS A ENVIAR EN EL CORREO
    const [state, setState] = useLocalStorage('baneoform', {
        idUser: "",
        firstName: "",
        lastName: "",
        emailUser: "",
        message: "",
    })

    console.log(state)
    //MANEJO DE EVENTOS
    const handleChange = (e) => {
        e.preventDefault();
        setState(
            {
                ...state,
                message: e.target.value,
                idUser: userStorage && userStorage.id,
                firstName:userStorage && userStorage.firstName,
                lastName: userStorage && userStorage.lastName,
                emailUser: userStorage && userStorage.mail,
            });
        setErrors(validate({ ...state, [e.target.name]: e.target.value }));
    }
    const handleSubmit = async (e) => {
        e.preventDefault();

        if (state.message) {
            dispatch(sendEmailAdmi(state));
            setState({
                idUser: "",
                firstName: "",
                lastName: "",
                emailUser: "",
                message: "",
            });
            Swal.fire({
                title: 'Mensaje enviado con exito!',
                text: 'Se ha enviado su información correctamente. Pronto le respondera via correo electrónico',
                icon: 'success',
                confirmButtonColor: "#1d4ed8"
            }).then(() => {
    
                history('/');
            });
        }
        else {
            Swal.fire({
                title: 'ERROR!!!',
                text: 'No se han completado los campos requeridos.',
                icon: 'error',
                confirmButtonColor: "#1d4ed8"
            })
        }
    }

    //MANEJO DE VALIDACIONES
    const [errors, setErrors] = useState({});

    function validate(input) {
        let errors = {};
        if (!input.message) {
            errors.message = "Se requiere un mensaje";
        }

        return errors;

    }

    return (!usuario) ? (<Loading />) : (
        <div className=''>
            <div>
                <NavBar />
            </div>
            <section class="bg-white pt-24">
                <div class="py-8 lg:py-16 px-4 mx-auto max-w-screen-md">
                    <div className="xl:w-ful border-b border-gray-300 mb-5 py-5">
                        <div className="flex justify-center w-11/12 mx-auto xl:w-full xl:mx-0 items-center">
                            <p className="font-semibold lg:text-4xl text-3xl lg:leading-9 leading-7 text-gray-800">Comunicate con el administrador</p>
                            <div title="Explique en un mensaje el por que deberiamos de desbloquear su cuenta" className="ml-2 cursor-pointer  text-black">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width={16} height={16}>
                                    <path className="heroicon-ui" d="M12 22a10 10 0 1 1 0-20 10 10 0 0 1 0 20zm0-2a8 8 0 1 0 0-16 8 8 0 0 0 0 16zm0-9a1 1 0 0 1 1 1v4a1 1 0 0 1-2 0v-4a1 1 0 0 1 1-1zm0-4a1 1 0 1 1 0 2 1 1 0 0 1 0-2z" fill="currentColor" />
                                </svg>
                            </div>
                        </div>
                    </div>
                    <p class="mb-8  font-light text-center text-gray-400 text-2xl">Tuvimos que suspender su cuenta porque detectamos un comportamiento irregular dentro de nuestra página. Para que podamos reactivar su cuenta, por favor escribenos un mensaje
                        dando el motivo del porqué deberiamos de desbloquear su cuenta o si hubo un error al hacerlo, y asi evaluar su caso.</p>
                    <form action="#" class="">
                        <div className='flex gap-4 justify-between'>
                            <div className={estilos.contenedor_input_y_titulo}>
                                <div className='flex flex-col'>
                                    <label for="firstName" class={estilos.titulos}>Nombre:</label>
                                    <input type="text" id="firstName" name="firstName" value={userStorage && userStorage.firstName} class={estilos.input} />
                                </div>
                            </div>
                            <div className={estilos.contenedor_input_y_titulo}>
                                <div className='flex flex-col'>
                                    <label for="lastName" class={estilos.titulos}>Apellido:</label>
                                    <input type="text" id="lastName" name="lastName" class={estilos.input} value={userStorage && userStorage.lastName} />
                                </div>
                            </div>
                        </div>
                        <div className='flex '>
                            <div className={estilos.contenedor_input_y_titulo}>
                                <label for="emailUser" class={estilos.titulos}>Correo:</label>
                                <input type="email" id="emailUser" name="emailUser" value={userStorage && userStorage.mail} class={estilos.input} />
                            </div>
                        </div>
                        <div className="mt-6 flex flex-col  w-full">
                            <label htmlFor="message" className={estilos.titulos}>
                                Mensaje al administrador:
                            </label>
                            <textarea id="message" name="message" onChange={(e) => handleChange(e)} className="bg-transparent border-4 border-gray-300 pl-3 py-3 rounded focus:outline-none focus:border-blue-500 placeholder-gray-500 text-lg text-gray-700" placeholder="Escribe tu mensaje ..." rows={5} defaultValue={""} value={state.message} />
                            <p className="w-full text-right text-xs pt-1 text-black ">Limite de caracteres: 200</p>
                            {errors.message && (<p class="text-red-500 text-lg ">{errors.message}</p>)}
                            <div className="container flex justify-center gap-5 mb-20">
                                <button type='submit' onClick={(e) => handleSubmit(e)} className={estilos.boton_enviar_informacion}>Enviar mensaje</button>
                            </div>
                        </div>
                    </form>
                </div>
            </section>
        </div>
    )
}

export default BaneoForm;