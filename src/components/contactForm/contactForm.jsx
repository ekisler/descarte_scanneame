import { React, useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import NavBar from '../NavBar/NavBar';
import { useAuth0 } from '@auth0/auth0-react';
import { sendEmailSeller, copyOfMailBuyer } from '../../Redux/Actions.js';
import Loading from '../Loading/Loading.jsx';
import Swal from 'sweetalert2'
import {useLocalStorage} from './useLocalStorage'

const estilos = {
    input: "border-4 border-gray-300 pl-3 py-3  shadow-sm bg-transparent rounded text-lg focus:outline-none focus:border-blue-500 placeholder-gray-500 text-gray-700",
    contenedor_input_y_titulo: "w-full flex flex-col mb-6",
    titulos: "text-xl leading-8 font-semibold text-gray-800 pb-2",
    boton_enviar_informacion: "text-white bg-blue-700 hover:bg-blue-800 focus:outline-none shadow-md shadow-black rounded-full text-center mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-900 dark:focus:ring-blue-800 font-semibold text-lg leading-4 w-auto px-5 py-5 lg:mt-12 mt-6",
    boton_volver_inicio: "text-white bg-blue-700 hover:bg-blue-800 focus:outline-none shadow-md shadow-black rounded-full text-center mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-900 dark:focus:ring-blue-800 font-semibold text-lg leading-4  w-auto px-5 py-5 lg:mt-12 mt-6"
}

function ConctactForm() {

    const dispatch = useDispatch()
    const history = useNavigate();
    const cardDetail = useSelector((state) => state.carDetail);
    const { user } = useAuth0();

    //LOCAL STORAGE
    const [userCardDetail, setInfo] = useState(
        JSON.parse(window.localStorage.getItem("infoCar"))
    );

    const setLocalStorage = (value) => {
        try {
            setInfo(value);
            window.localStorage.setItem("infoCar", JSON.stringify(value))
        } catch (error) {
            console.error(error);
        }
    }

    useEffect(() => {
        !Array.isArray(cardDetail) && setLocalStorage(cardDetail);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    //ESTADO LOCAL DE LOS DATOS A ENVIAR EN EL CORREO
    const [state, setState] = useLocalStorage('form',{
        firstName: "",
        lastName: "",
        emailbuyer: "",
        message: "",
        emailSeller: "",
        phone: "",
        car:""
    })
    

    //MANEJO DE EVENTOS
    const handleChange = (e) => {
        e.preventDefault();
        setState({ ...state, [e.target.name]: e.target.value, emailSeller: userCardDetail.user.mail, emailbuyer: user.email, car: userCardDetail.name });
        setErrors(validate({ ...state, [e.target.name]: e.target.value }));
    }
    const handleSubmit = async (e) => {
        e.preventDefault();

        if (state.firstName && state.lastName && state.emailbuyer && state.message && state.emailSeller) {
            !state.phone && setState({ ...state, phone: "Numero no especificado" });

            dispatch(sendEmailSeller(state));
            dispatch(copyOfMailBuyer(state));
            setState({
                firstName: "",
                lastName: "",
                emailbuyer: "",
                message: "",
                emailSeller: "",
                phone: ""
            });
            Swal.fire({
                title: 'Mensaje enviado al vendedor',
                text: 'Se ha enviado su información correctamente. Pronto el vendedor le respondera via correo electrónico',
                icon: 'success',
                confirmButtonColor: "#1d4ed8"
            }).then(() => {
                history(`/cars/${userCardDetail.id}`)
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

        if (!input.firstName) {
            errors.firstName = "Se requiere un nombre de usuario";
        } else if (!/^[_A-z]*((-|\s)*[_A-z])*$/g.test(input.firstName)) {
            errors.firstName = "El nombre no puede tener caracteres especiales o números";
        }
        if (!input.lastName) {
            errors.lastName = "Se requiere un apellido";
        } else if (!/^[_A-z]*((-|\s)*[_A-z])*$/g.test(input.lastName)) {
            errors.lastName = "El apellido no puede tener caracteres especiales o números";
        }
        if (!input.message) {
            errors.message = "Se requiere un mensaje";
        }
        else if (input.phone && !/^[0-9]+$/g.test(input.phone)) {
            errors.phone = "El telefono solo puede contener numeros"
        }

        return errors;
    }

    return (!user) ? (<Loading />) : (
        <div className=''>
            <div>
                <NavBar />
            </div>
            <section class="bg-white pt-24">
                <div class="py-8 lg:py-16 px-4 mx-auto max-w-screen-md">
                    <div className="xl:w-ful border-b border-gray-300 mb-5 py-5">
                        <div className="flex justify-center w-11/12 mx-auto xl:w-full xl:mx-0 items-center">
                            <p className="font-semibold lg:text-4xl text-3xl lg:leading-9 leading-7 text-gray-800">Contacta al vendedor</p>
                            <div title="Enviar un correo al dueño del vehiculo para concretar un encuentro personal" className="ml-2 cursor-pointer  text-black">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width={16} height={16}>
                                    <path className="heroicon-ui" d="M12 22a10 10 0 1 1 0-20 10 10 0 0 1 0 20zm0-2a8 8 0 1 0 0-16 8 8 0 0 0 0 16zm0-9a1 1 0 0 1 1 1v4a1 1 0 0 1-2 0v-4a1 1 0 0 1 1-1zm0-4a1 1 0 1 1 0 2 1 1 0 0 1 0-2z" fill="currentColor" />
                                </svg>
                            </div>
                        </div>
                    </div>
                    <p class="mb-8  font-light text-center text-gray-400 text-2xl">Te gusta este auto? Necesitas conocer mas detalles del vehiculo? Quieres concretar un encuentro con el dueño del vehiculo? Ponte en contacto con el vendedor para mas información.</p>
                    <form action="#" class="">
                        <div className='flex gap-4 justify-between'>
                            <div className={estilos.contenedor_input_y_titulo}>
                                <div className='flex flex-col'>
                                    <label for="firstName" class={estilos.titulos}>Nombre:</label>
                                    <input type="text" id="firstName" name="firstName" onChange={(e) => handleChange(e)} class={estilos.input} placeholder="Ingresa tu nombre ..." value={state.firstName}/>
                                </div>
                                {errors.firstName && (<p class="text-red-500 text-lg mt-2">{errors.firstName}</p>)}
                            </div>
                            <div className={estilos.contenedor_input_y_titulo}>
                                <div className='flex flex-col'>
                                    <label for="lastName" class={estilos.titulos}>Apellido:</label>
                                    <input type="text" id="lastName" name="lastName" class={estilos.input} onChange={(e) => handleChange(e)} placeholder="Ingresa tu apellido ..."  value={state.lastName} />
                                </div>
                                {errors.lastName && (<p class="text-red-500 text-lg mt-2">{errors.lastName}</p>)}
                            </div>
                        </div>
                        <div className='flex gap-4 justify-between'>
                            <div className={estilos.contenedor_input_y_titulo}>
                                <label for="emailbuyer" class={estilos.titulos}>Correo:</label>
                                <input type="email" id="emailbuyer" name="emailbuyer" value={user.email} class={estilos.input} placeholder="Ingresa tu E-mail ..." />
                            </div>
                            <div className={estilos.contenedor_input_y_titulo}>
                                <div className='flex flex-col'>
                                    <label for="phone" class={estilos.titulos}>Telefono:</label>
                                    <input type="text" id="phone" name="phone" class={estilos.input} onChange={(e) => handleChange(e)} placeholder="Ingresa tu numero de teléfono ..."  value={state.phone}/>
                                </div>
                                {errors.phone && (<p class="text-red-500 text-lg mt-2">{errors.phone}</p>)}
                            </div>
                        </div>
                        <div className="mt-6 flex flex-col  w-full">
                            <label htmlFor="message" className={estilos.titulos}>
                                Mensaje al vendedor:
                            </label>
                            <textarea id="message" name="message" onChange={(e) => handleChange(e)} className="bg-transparent border-4 border-gray-300 pl-3 py-3 rounded focus:outline-none focus:border-blue-500 placeholder-gray-500 text-lg text-gray-700" placeholder="Escribe tu(s) pregunta(s) ..." rows={5} defaultValue={""}  value={state.message} />
                            <p className="w-full text-right text-xs pt-1 text-black ">Limite de caracteres: 200</p>
                            {errors.message && (<p class="text-red-500 text-lg ">{errors.message}</p>)}
                            <div className="container flex justify-center gap-5 mb-20">
                                <button type='submit' onClick={(e) => handleSubmit(e)} className={estilos.boton_enviar_informacion}>Preguntar</button>
                                <button onClick={() => history(`/cars/${userCardDetail.id}`)} className={estilos.boton_volver_inicio}>Regresar</button>
                            </div>
                        </div>
                    </form>
                </div>
            </section>
        </div>
    )
}

export default ConctactForm;