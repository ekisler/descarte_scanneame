import { React, useState, useEffect } from 'react';
import { useNavigate, useLocation } from "react-router-dom";
import { useDispatch } from 'react-redux';
import NavBar from '../NavBar/NavBar';
import { postRating } from '../../Redux/Actions.js';
import { useAuth0 } from '@auth0/auth0-react';
import Swal from 'sweetalert2';

const estilos = {
    input: "border-4 border-gray-300 pl-3 py-4 shadow-sm bg-transparent rounded text-lg focus:outline-none focus:border-blue-500 placeholder-gray-500 text-gray-700",
    contenedor_input_y_titulo: "w-full flex flex-col mb-6",
    titulos: "text-sm sm:text-base  md:text-lg  lg:text-xl leading-8 font-semibold text-gray-800 pl-2 pb-2",
    boton_enviar_informacion: "text-white bg-blue-700 hover:bg-blue-800 focus:outline-none shadow-md shadow-black rounded-full text-center mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-900 dark:focus:ring-blue-800 font-semibold text-lg leading-4 w-auto px-5 py-5 lg:mt-12 mt-6",
    boton_volver_inicio: "text-white bg-blue-700 hover:bg-blue-800 focus:outline-none shadow-md shadow-black rounded-full text-center mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-900 dark:focus:ring-blue-800 font-semibold text-lg leading-4  w-auto px-5 py-5 lg:mt-12 mt-6"
}

const options1 = [{ text: "Deficiente", value: 0 }, { text: "Regular", value: 1 / 5 }, { text: "Aceptable", value: 2 / 5 }, { text: "Buena", value: 3 / 5 }, { text: "Excelente", value: 4 / 5 }];
const options2 = [{ text: "Si", value: 2 / 3 }, { text: "No estoy seguro", value: 1 / 3 }, { text: "No", value: 0 }];
const options3 = [{ text: "Mala", value: 0 }, { text: "Regular", value: 1 / 5 }, { text: "Aceptable", value: 2 / 5 }, { text: "Buena", value: 3 / 5 }, { text: "Excelente", value: 4 / 5 }];

function ConctactForm() {

    const dispatch = useDispatch()
    const { search } = useLocation();
    const history = useNavigate();
    const query = new URLSearchParams(search);
    const idSeller = query.get("id");
    const { isAuthenticated, loginWithRedirect, isLoading } = useAuth0();

    useEffect(() => {
        console.log(isLoading);
    })

    //ESTADO LOCAL DE LOS DATOS A ENVIAR EN EL CORREO
    const [inputCheckBox, setInputCheckBox] = useState({
        question1: false,
        question2: false,
        question3: false,
        question4: false,
        question5: false,
        question6: false,
        question7: false,
        review: ""
    })
    function handleCheckBox(e) {

        if (e.target.checked) {
            setInputCheckBox({
                ...inputCheckBox,
                [e.target.name]: e.target.value
            })
        } else {
            e.preventDefault()
            setInputCheckBox({
                ...inputCheckBox,
                review: e.target.value
            })
        }

    }

    if (!isLoading && !isAuthenticated) {
        Swal.fire({
            title: 'ERROR!',
            text: 'Usted no ha iniciado sesión o no se encuentra registrado!!!',
            icon: 'error',
            confirmButtonColor: "#1d4ed8"
        }).then(() => {
            loginWithRedirect();
        });

    }

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!idSeller) {
            Swal.fire({
                title: 'ERROR!!!',
                text: 'Este formulario no se le ha autorizado!!',
                icon: 'error',
                confirmButtonColor: "#1d4ed8"
            }).then(() => {
                history("/home");
            });
        }
        else if (inputCheckBox.question1 && inputCheckBox.question2 && inputCheckBox.question3 && inputCheckBox.question4 && inputCheckBox.question5 && inputCheckBox.question6 && inputCheckBox.question7) {

            let sumRating = 0;
            for (const question in inputCheckBox) {
                if (question !== "review") {
                    sumRating += Number(inputCheckBox[question]);
                }
            }

            console.log(Math.round(sumRating));

            dispatch(postRating(
                {
                    rating: Math.round(sumRating),
                    userId: idSeller,
                    description: inputCheckBox.review
                }))

            setInputCheckBox({
                question1: false,
                question2: false,
                question3: false,
                question4: false,
                question5: false,
                question6: false,
                question7: false,
            });
            Swal.fire({
                title: 'Calificación enviada',
                text: 'Se ha enviado su información correctamente.',
                icon: 'success',
                confirmButtonColor: "#1d4ed8"
            }).then(() => {
                history("/home");
            });
        }
        else {
            Swal.fire({
                title: 'ERROR!!!',
                text: 'No se han completado los todos los campos.',
                icon: 'error',
                confirmButtonColor: "#1d4ed8"
            })
        }
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
                            <p className="font-semibold lg:text-4xl text-3xl lg:leading-9 leading-7 text-gray-800">Califica al vendedor</p>
                            <div title="Llene el siguiente formulario para calificar al vendedor" className="ml-2 cursor-pointer  text-black">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width={16} height={16}>
                                    <path className="heroicon-ui" d="M12 22a10 10 0 1 1 0-20 10 10 0 0 1 0 20zm0-2a8 8 0 1 0 0-16 8 8 0 0 0 0 16zm0-9a1 1 0 0 1 1 1v4a1 1 0 0 1-2 0v-4a1 1 0 0 1 1-1zm0-4a1 1 0 1 1 0 2 1 1 0 0 1 0-2z" fill="currentColor" />
                                </svg>
                            </div>
                        </div>
                    </div>
                    <form action="#" class="">
                        <div className={estilos.contenedor_input_y_titulo}>
                            <div className='flex flex-col'>
                                <div class={estilos.input}>
                                    <label htmlFor="firstName" class={estilos.titulos}>1. ¿Como fue el tiempo de respuesta o comunicación con el vendedor?</label>
                                    <div class="flex items-center justify-center gap-2 sm:gap-4 md:gap-6 lg:gap-8 mt-4">
                                        {options1.map((e) => {
                                            return (
                                                <div class="flex items-center ">
                                                    <input id="inline-checkbox" type="radio" name="question1" value={e.value} onChange={(e) => handleCheckBox(e)} class="w-6 h-6 text-blue-800 bg-white rounded border-2" />
                                                    <label htmlFor="inline-checkbox" class="ml-1 md:ml-2 text-xs sm:text-sm md:text-base lg:text-lg font-medium text-gray-900">{e.text}</label>
                                                </div>
                                            )
                                        })}
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className={estilos.contenedor_input_y_titulo}>
                            <div className='flex flex-col'>
                                <div class={estilos.input}>
                                    <label htmlFor="firstName" class={estilos.titulos}>2. ¿Como fue la atención del vendedor?</label>
                                    <div class="flex items-center justify-center gap-2 sm:gap-4 md:gap-6 lg:gap-8 mt-4">
                                        {options1.map((e) => {
                                            return (
                                                <div class="flex items-center ">
                                                    <input id="inline-checkbox" type="radio" name="question2" value={e.value} onChange={(e) => handleCheckBox(e)} class="w-6 h-6 text-blue-800 bg-white rounded" required />
                                                    <label htmlFor="inline-checkbox" class="ml-1 md:ml-2 text-xs sm:text-sm md:text-base lg:text-lg font-medium text-gray-900">{e.text}</label>
                                                </div>
                                            )
                                        })}
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className={estilos.contenedor_input_y_titulo}>
                            <div className='flex flex-col'>
                                <div class={estilos.input}>
                                    <label htmlFor="firstName" class={estilos.titulos}>3. ¿El vendedor fue transparente con los detalles del vehículo?</label>
                                    <div class="flex items-center justify-center gap-2 sm:gap-4 md:gap-6 lg:gap-8 mt-4">
                                        {options2.map((e) => {
                                            return (
                                                <div class="flex items-center ">
                                                    <input id="inline-checkbox" type="radio" name="question3" value={e.value} onChange={(e) => handleCheckBox(e)} class="w-6 h-6 text-blue-800 bg-white rounded" required />
                                                    <label htmlFor="inline-checkbox" class="ml-1 md:ml-2 text-xs sm:text-sm md:text-base lg:text-lg font-medium text-gray-900">{e.text}</label>
                                                </div>
                                            )
                                        })}
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className={estilos.contenedor_input_y_titulo}>
                            <div className='flex flex-col'>
                                <div class={estilos.input}>
                                    <label htmlFor="firstName" class={estilos.titulos}>4. ¿El vendedor tenia la documentación al dia?</label>
                                    <div class="flex items-center justify-center gap-2 sm:gap-4 md:gap-6 lg:gap-8 mt-4">
                                        {options2.map((e) => {
                                            return (
                                                <div class="flex items-center ">
                                                    <input id="inline-checkbox" type="radio" name="question4" value={e.value} onChange={(e) => handleCheckBox(e)} class="w-6 h-6 text-blue-800 bg-white rounded" required />
                                                    <label htmlFor="inline-checkbox" class="ml-1 md:ml-2 text-xs sm:text-sm md:text-base lg:text-lg font-medium text-gray-900">{e.text}</label>
                                                </div>
                                            )
                                        })}
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className={estilos.contenedor_input_y_titulo}>
                            <div className='flex flex-col'>
                                <div class={estilos.input}>
                                    <label htmlFor="firstName" class={estilos.titulos}>5. ¿El precio establecido en la publicación lo considera acorde a las condiciones del vehiculo?</label>
                                    <div class="flex items-center justify-center gap-2 sm:gap-4 md:gap-6 lg:gap-8 mt-4">
                                        {options2.map((e) => {
                                            return (
                                                <div class="flex items-center ">
                                                    <input id="inline-checkbox" type="radio" name="question5" value={e.value} onChange={(e) => handleCheckBox(e)} class="w-6 h-6 text-blue-800 bg-white rounded" required />
                                                    <label htmlFor="inline-checkbox" class="ml-1 md:ml-2 text-xs sm:text-sm md:text-base lg:text-lg font-medium text-gray-900">{e.text}</label>
                                                </div>
                                            )
                                        })}
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className={estilos.contenedor_input_y_titulo}>
                            <div className='flex flex-col'>
                                <div class={estilos.input}>
                                    <label htmlFor="firstName" class={estilos.titulos}>6. Grado de satisfacción con la experiencia de compra</label>
                                    <div class="flex items-center justify-center gap-2 sm:gap-4 md:gap-6 lg:gap-8 mt-4">
                                        {options3.map((e) => {
                                            return (
                                                <div class="flex items-center ">
                                                    <input id="inline-checkbox" type="radio" name="question6" value={e.value} onChange={(e) => handleCheckBox(e)} class="w-6 h-6 text-blue-800 bg-white rounded" required />
                                                    <label htmlFor="inline-checkbox" class="ml-1 md:ml-2 text-xs sm:text-sm md:text-base lg:text-lg font-medium text-gray-900">{e.text}</label>
                                                </div>
                                            )
                                        })}
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className={estilos.contenedor_input_y_titulo}>
                            <div className='flex flex-col'>
                                <div class={estilos.input}>
                                    <label htmlFor="firstName" class={estilos.titulos}>7. ¿Recomendarias al vendedor?</label>
                                    <div class="flex items-center justify-center gap-2 sm:gap-4 md:gap-6 lg:gap-8 mt-4">
                                        {options2.map((e) => {
                                            return (
                                                <div class="flex items-center ">
                                                    <input id="inline-checkbox" type="radio" name="question7" value={e.value} onChange={(e) => handleCheckBox(e)} class="w-6 h-6 text-blue-800 bg-white rounded" required />
                                                    <label htmlFor="inline-checkbox" class="ml-1 md:ml-2 text-xs sm:text-sm md:text-base lg:text-lg font-medium text-gray-900">{e.text}</label>
                                                </div>
                                            )
                                        })}
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="mt-6 flex flex-col  w-full">
                            <label htmlFor="review" className={estilos.titulos}>
                                Reseña:
                            </label>
                            <textarea id="review" name="review" onChange={(e) => handleCheckBox(e)} className="bg-transparent border-4 border-gray-300 pl-3 py-3 rounded focus:outline-none focus:border-blue-500 placeholder-gray-500 text-lg text-gray-700" placeholder="Escribe una breve reseña sobre el vendedor" rows={3} defaultValue={""} />
                            <p className="w-full text-right text-xs pt-1 text-black ">Limite de caracteres: 50</p>
                        </div>
                        <div className="container flex justify-center gap-5 mb-20">
                            <button type='submit' onClick={(e) => handleSubmit(e)} className={estilos.boton_enviar_informacion}>Enviar Calificación</button>
                        </div>
                    </form>
                </div>
            </section>
        </div>
    )
}

export default ConctactForm;