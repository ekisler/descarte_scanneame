import { React, useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import NavBar from '../NavBar/NavBar';
import { useAuth0 } from '@auth0/auth0-react';
import { sendEmailBuyer, UserEmail, infoUseremail } from '../../Redux/Actions.js';
import Loading from '../Loading/Loading.jsx';
import Swal from 'sweetalert2';


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
    const confirmUserEmail = useSelector((state) => state.emailUser);
    const dataCurrentUser = useSelector((state) => state.D_user);

    //console.log(confirmUserEmail);

    const { user } = useAuth0();

    // //ESTADO LOCAL DE LOS DATOS A ENVIAR EN EL CORREO
    const [state, setState] = useState({
        idSeller: "",
        firstNameSeller: "",
        lastNameSeller: "",
        firstName: "",
        lastName: "",
        emailbuyer: "",
        message: "",
        emailSeller: "",
    })
    //console.log(state)

    useEffect(() => {
        dispatch(UserEmail({ email: state.emailbuyer }))

    }, [dispatch, state.emailbuyer]);

    //MANEJO DE EVENTOS
    const handleChange = (e) => {
        e.preventDefault();
        setState({
            ...state,
            [e.target.name]: e.target.value,
            emailSeller: user.email,
            idSeller: dataCurrentUser.id,
            firstNameSeller: dataCurrentUser.firstName,
            lastNameSeller: dataCurrentUser.lastName
        });
        state.emailbuyer !== "" && dispatch(UserEmail({ email: state.emailbuyer }));
        user && dispatch(infoUseremail(user.email))
        setErrors(validate({ ...state, [e.target.name]: e.target.value }));
    }
    const handleSubmit = (e) => {

        e.preventDefault();

        if (state.firstName && state.lastName && state.emailbuyer && state.message && state.emailSeller) {

            confirmUserEmail[0] ? console.log("Si se encuentra el correo en la BD") : console.log("no se encuentra el correo en la BD");


            if (!confirmUserEmail[0]) {
                Swal.fire({
                    title: 'ERROR!!!',
                    text: 'El correo no es valido',
                    icon: 'error',
                    confirmButtonColor: "#1d4ed8"
                })
            }
            else if (state.emailSeller === state.emailbuyer) {
                Swal.fire({
                    title: 'ERROR!!!',
                    text: 'No puede colocar su propio correo',
                    icon: 'error',
                    confirmButtonColor: "#1d4ed8"
                })
            } else {
                dispatch(sendEmailBuyer(state))
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
                    text: 'Se ha enviado su información correctamente.',
                    icon: 'success',
                    confirmButtonColor: "#1d4ed8"
                }).then(() => {
                    history("/home");
                });
            }
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

    // MANEJO DE VALIDACIONES
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
        if (!input.emailbuyer) {
            errors.emailbuyer = "Se requiere un correo valido";
        } else if (!/^[0-9a-z\s\\.\-\\_\\@]+$/.test(input.emailbuyer)) {
            errors.emailbuyer = "Mayuscula o caracter expecial no permitido";
        }
        if (!input.message) {
            errors.message = "Se requiere un mensaje";
        }
        return errors;
    }

    return (
        <div className=''>
            <div>
                <NavBar />
            </div>
            <section class="bg-white pt-24">
                <div class="py-8 lg:py-16 px-4 mx-auto max-w-screen-md">
                    <div className="xl:w-ful border-b border-gray-300 mb-5 py-5">
                        <div className="flex justify-center w-11/12 mx-auto xl:w-full xl:mx-0 items-center">
                            <p className="font-semibold lg:text-4xl text-3xl lg:leading-9 leading-7 text-gray-800">Datos del comprador</p>
                            <div title="Notificale al comprador para que te califique" className="ml-2 cursor-pointer  text-black">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width={16} height={16}>
                                    <path className="heroicon-ui" d="M12 22a10 10 0 1 1 0-20 10 10 0 0 1 0 20zm0-2a8 8 0 1 0 0-16 8 8 0 0 0 0 16zm0-9a1 1 0 0 1 1 1v4a1 1 0 0 1-2 0v-4a1 1 0 0 1 1-1zm0-4a1 1 0 1 1 0 2 1 1 0 0 1 0-2z" fill="currentColor" />
                                </svg>
                            </div>
                        </div>
                    </div>
                    <p class="mb-8  font-light text-center text-gray-400 text-2xl">"Notificale al comprador para que te califique..."</p>
                    <form action="#" class="">
                        <div className='flex gap-4 justify-between'>
                            <div className={estilos.contenedor_input_y_titulo}>
                                <div className='flex flex-col'>
                                    <label for="firstName" class={estilos.titulos}>Nombre:</label>
                                    <input type="text" id="firstName" name="firstName" onChange={(e) => handleChange(e)} class={estilos.input} placeholder="Ingresa el nombre del comprador ..." />
                                </div>
                                {errors.firstName && (<p class="text-red-500 text-lg mt-2">{errors.firstName}</p>)}
                            </div>
                            <div className={estilos.contenedor_input_y_titulo}>
                                <div className='flex flex-col'>
                                    <label for="lastName" class={estilos.titulos}>Apellido:</label>
                                    <input type="text" id="lastName" name="lastName" class={estilos.input} onChange={(e) => handleChange(e)} placeholder="Ingresa el apellido del comprador..." />
                                </div>
                                {errors.lastName && (<p class="text-red-500 text-lg mt-2">{errors.lastName}</p>)}
                            </div>
                        </div>
                        <div className='flex flex-col'>
                            <div className={estilos.contenedor_input_y_titulo}>
                                <label for="emailbuyer" class={estilos.titulos}>Correo:</label>
                                <input type="email" id="emailbuyer" name="emailbuyer" class={estilos.input} onChange={(e) => handleChange(e)} placeholder="Copie y pegue el correo con el cual se comunicó el comprador ..." />
                            </div>
                            {errors.emailbuyer && (<p class="text-red-500 text-lg ">{errors.emailbuyer}</p>)}
                        </div>
                        <div className="mt-6 flex flex-col  w-full">
                            <label htmlFor="message" className={estilos.titulos}>
                                Mensaje al comprador:
                            </label>
                            <textarea id="message" name="message" onChange={(e) => handleChange(e)} className="bg-transparent border-4 border-gray-300 pl-3 py-3 rounded focus:outline-none focus:border-blue-500 placeholder-gray-500 text-lg text-gray-700" placeholder="Escribe tu(s) pregunata(s) ..." rows={5} />
                            <p className="w-full text-right text-xs pt-1 text-black ">Limite de caracteres: 200</p>
                            {errors.message && (<p class="text-red-500 text-lg ">{errors.message}</p>)}
                            <div className="container flex justify-center gap-5 mb-20">
                                <button type='submit' onClick={(e) => handleSubmit(e)} className={estilos.boton_enviar_informacion}>Enviar formulario</button>
                            </div>
                        </div>
                    </form>
                </div>
            </section>
        </div>
    )
}

export default ConctactForm;