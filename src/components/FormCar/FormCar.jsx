import { React, useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { postCar, getCars, getUsers } from "../../Redux/Actions";
import { Link, useNavigate } from 'react-router-dom';
import './FormCar.css';
import imagen from '../Card/imagenes/Imagen_Default.png';
import Swal from 'sweetalert2';
import NavBar from '../NavBar/NavBar';
import axios from 'axios';
import { useAuth0 } from '@auth0/auth0-react';



//ESTILOS TAILWIND
const estilos = {
    input: "border-4 border-gray-300 pl-3 py-3 shadow-sm bg-transparent rounded text-lg focus:outline-none focus:border-blue-500 placeholder-gray-500 text-gray-700",
    contenedor_input_y_titulo: "md:w-auto flex flex-col mb-6",
    titulos: "text-xl leading-8 font-semibold text-gray-800 pb-2",
    boton_enviar_informacion: "text-white bg-blue-700 hover:bg-blue-800 focus:outline-none shadow-md shadow-black rounded-full text-center mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-900 dark:focus:ring-blue-800 font-semibold text-lg leading-4 w-auto px-5 py-5 lg:mt-12 mt-6",
    boton_volver_inicio: "text-white bg-blue-700 hover:bg-blue-800 focus:outline-none shadow-md shadow-black rounded-full text-center mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-900 dark:focus:ring-blue-800 font-semibold text-lg leading-4  w-auto px-5 py-5 lg:mt-12 mt-6"
}

const color = ["Negro", "Gris", "Blanco", "Azul", "Plateado", "Rojo", "Marron", "Beige", "Verde", "Amarillo", "Dorado", "Otro"];
const oil = ["Gasolina", "Diésel", "Híbrido", "Gasolina y gas", "Eléctrico"];
const transmition = ["Automatico", "Sincronico"];
const condition = ["Nuevo", "Usado"];

function FormCar() {
    const usuario = useSelector((state) => state.allUsers);
    const { user } = useAuth0();
    const currentUser = usuario.find((el) => el.mail === user?.email && el.id);

    const dispatch = useDispatch();
    const history = useNavigate();

    useEffect(() => {
        dispatch(getCars());
        dispatch(getUsers())
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const [state, setState] = useState({
        userId: user?.id || currentUser?.id,
        name: "",
        brand: "",
        model: "",
        color: "",
        year: "",
        oil: "",
        gate: 2,
        kilometres: "",
        location: "",
        price: "",
        condition: "",
        trasmition: "",
        descriptionLong: "",
        descriptionShort: "",
        image: "",
    })


    //LISTA DESPLEGABLE
    const [show, setShow] = useState(false);
    const [show2, setShow2] = useState(false);
    const [show3, setShow3] = useState(false);
    const [show4, setShow4] = useState(false);
    const [img, setImg] = useState("");

    //MANEJO DE EVENTOS
    const handleChange = (e) => {
        setState({ ...state, [e.target.name]: e.target.value });
        setErrors(validate({ ...state, [e.target.name]: e.target.value }));
    }

    const handleColor = (e) => {
        setShow(false);
        setState({ ...state, color: e.target.value });
    }

    const handleOil = (e) => {
        setShow2(false);
        setState({ ...state, oil: e.target.value });
    }
    const handleTransmition = (e) => {
        setShow3(false);
        setState({ ...state, transmition: e.target.value });
    }
    const handleCondition = (e) => {
        setShow4(false);
        setState({ ...state, condition: e.target.value });
    }
    

    //MANEJO AL ENVIAR EL FORMULARIO
    const handleSubmit = async (e) => {
        e.preventDefault()

            if (state.name && state.brand && state.model && state.year && state.kilometres && state.descriptionShort && state.price && state.descriptionLong) {
                Swal.fire({
                    title: 'Formulario enviado',
                    text: 'Se ha registrado su información correctamente.',
                    icon: 'success',
                    confirmButtonColor: "#1d4ed8"
                });

                dispatch(postCar(state));
                setState({
                    name: "",
                    brand: "",
                    model: "",
                    color: "",
                    year: "",
                    oil: "",
                    gate: 2,
                    kilometres: "",
                    location: "",
                    price: "",
                    condition: "",
                    trasmition: "",
                    descriptionLong: "",
                    descriptionShort: "",
                    image: "",
                });
                history('/home');
            } else {

                Swal.fire({
                    title: 'ERROR!!!',
                    text: 'No se han completado los campos requeridos.',
                    icon: 'error',
                    confirmButtonColor: "#1d4ed8"
                }).then(function () {
                    dispatch(getCars());
                });
            }
         }

    async function uploadImage(file) {
        const formData = new FormData();
        formData.append("file", file[0]);
        formData.append("upload_preset", "iduftmjv");
        const imgUrl = await axios
            .post("https://api.cloudinary.com/v1_1/da1vbkmdr/image/upload", formData)
            .then((response) => response.data.secure_url);
        setImg(imgUrl);
        state.image = imgUrl
    }

    //MANEJO DE VALIDACIONES
    const [errors, setErrors] = useState({});

    function validate(input) {
        let errors = {};

        if (!input.name) {
            errors.name = "Se requiere un titulo"
        } else if (!/^[_A-z0-9]*((-|\s)*[_A-z0-9])*$/g.test(input.name)) {
            errors.name = "El titulo no puede tener caracteres especiales"
        }
        if (!input.brand) {
            errors.brand = "Se requiere la marca del auto"
        }
        if (!input.model) {
            errors.model = "Se requiere el modelo del auto"
        }
        if (!input.year) {
            errors.year = "Se requiere el año del auto"
        } else if (input.year < 1900 || input.year > 2024) {
            errors.year = "Año invalido"
        }
        else if (!/^[0-9]+$/g.test(input.year)) {
            errors.year = "El año solo puede contener numeros"
        }
        if (!input.kilometres) {
            errors.kilometres = "Se requiere el kilometraje actual del auto"
        }
        else if (!/^[0-9]+$/g.test(input.kilometres)) {
            errors.kilometres = "El kilometraje solo puede contener numeros"
        }
        if (!input.price) {
            errors.price = "Se requiere un precio de venta"
        }
        else if (!/^[0-9]+$/g.test(input.price)) {
            errors.price = "El precio solo puede contener numeros"
        }
        if (!input.trasmition) {
            errors.trasmition = "Se requiere la trasmisión"
        }
        if (!input.descriptionShort) {
            errors.descriptionShort = "Se requiere una descripción"
        }
        if (!input.descriptionLong) {
            errors.descriptionLong = "Se requiere una descripción"
        }
        return errors;
    }


    return (

        <div >
            <div>
                <NavBar />
            </div>
            <form id="login" onSubmit={handleSubmit}>
                <div className="bg-white pt-24 dark:bg-white">
                    <div className="container mx-auto bg-white mt-10 rounded px-4">
                        <div className="xl:w-ful border-b border-gray-300 py-5">
                            <div className="flex justify-center w-11/12 mx-auto xl:w-full xl:mx-0 items-center">
                                <p className="font-semibold lg:text-4xl text-3xl lg:leading-9 leading-7 text-gray-800">Registrar la información del vehículo</p>
                                <div title="Detallar todas las caracteristicas del vehiculo" className="ml-2 cursor-pointer  text-black">
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width={16} height={16}>
                                        <path className="heroicon-ui" d="M12 22a10 10 0 1 1 0-20 10 10 0 0 1 0 20zm0-2a8 8 0 1 0 0-16 8 8 0 0 0 0 16zm0-9a1 1 0 0 1 1 1v4a1 1 0 0 1-2 0v-4a1 1 0 0 1 1-1zm0-4a1 1 0 1 1 0 2 1 1 0 0 1 0-2z" fill="currentColor" />
                                    </svg>
                                </div>
                            </div>
                        </div>
                        {/*-------------------------------------------------------------------- Columna 1 ---------------------------------------------------------------------*/}

                        <div className='flex lg:flex-row md:flex-col sm:flex-col md:items-center sm:items-center'>
                            <div className="ml-20 mr-20 w-2/4 pt-8">
                                <div className="container mx-auto">
                                    <div className={estilos.contenedor_input_y_titulo}>
                                        <label htmlFor="name" className={estilos.titulos}>
                                            Título:
                                        </label>
                                        <input type="text" id="name" name="name" className={estilos.input} onChange={(e) => handleChange(e)} placeholder="Titulo breve del vehiculo a mostrar en la publicación..." />
                                        {errors.name && (<p class="text-red-500 text-lg mt-2">{errors.name}</p>)}
                                    </div>
                                    <div className={estilos.contenedor_input_y_titulo}>
                                        <label htmlFor="brand" className={estilos.titulos}>
                                            Marca:
                                        </label>
                                        <input type="text" id="brand" name="brand" className={estilos.input} onChange={(e) => handleChange(e)} placeholder="Ej: Toyota, Chevrolet, Ford, BMW, Ferrari, ..." />
                                        {errors.brand && (<p class="text-red-500 text-lg mt-2">{errors.brand}</p>)}
                                    </div>
                                    <div className={estilos.contenedor_input_y_titulo}>
                                        <label htmlFor="model" className={estilos.titulos}>
                                            Modelo:
                                        </label>
                                        <input type="text" id="model" name="model" className={estilos.input} onChange={(e) => handleChange(e)} placeholder="Ej: Hilux, Cruze II, CR-V, X1, Longan, Corolla ..." />
                                        {errors.model && (<p class="text-red-500 text-lg mt-2">{errors.model}</p>)}
                                    </div>
                                    <div className={estilos.contenedor_input_y_titulo}>
                                        <label htmlFor="year" className={estilos.titulos}>
                                            Año:
                                        </label>
                                        <input type="text" id="year" name="year" className={estilos.input} onChange={(e) => handleChange(e)} placeholder="Ej: 1999, 2000, 2001, ... , 2020, 2021, 2022" />
                                        {errors.year && (<p class="text-red-500 text-lg mt-2">{errors.year}</p>)}
                                    </div>

                                    <label className={estilos.titulos}>
                                        Color:
                                    </label>
                                    <div className="bg-white flex md:w-auto mb-6 mt-3 h-16" >
                                        <div className="border-4 border-gray-300 flex justify-between w-full items-center shadow-sm bg-transparent rounded text-base focus:outline-none">
                                            <p className=" pl-3 py-3 shadow-sm bg-transparent text-lg text-gray-500 tracking-normal">{state.color ? state.color : "Seleccione un color..."}</p>
                                            <div className="bg-white items-center flex rounded-r border-gray-300 border-l">
                                                <div className="cursor-pointer h-10 flex items-center text-gray-600 dark:text-gray-400 mx-3" onClick={() => setShow(!show)}>
                                                    {show ? (
                                                        <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-chevron-up" width={20} height={20} viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
                                                            <path stroke="none" d="M0 0h24v24H0z" />
                                                            <polyline points="6 15 12 9 18 15" />
                                                        </svg>
                                                    ) : (
                                                        <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-chevron-up" width={20} height={20} viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
                                                            <path stroke="none" d="M0 0h24v24H0z" />
                                                            <polyline points="6 9 12 15 18 9" />
                                                        </svg>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    {show && (
                                        <ul className="visible transition duration-300 opacity-100 bg-white shadow rounded mb-4 py-2 md:w-auto ">
                                            {color.map((el) => {
                                                return (
                                                    <li className="cursor-pointer text-gray-700 text-lg leading-3 tracking-normal h-8 hover:bg-gray-100 px-3">
                                                        <button name="color" onClick={(e) => handleColor(e)} value={el ? el : "Otro"} className="font-normal w-full h-8" >{el}</button>
                                                    </li>
                                                )
                                            })}
                                        </ul>
                                    )}

                                    <label className={estilos.titulos}>
                                        Combustible:
                                    </label>
                                    <div className="bg-white flex md:w-auto mb-6 mt-3 h-16" >
                                        <div className="border-4 border-gray-300 flex justify-between w-full items-center shadow-sm bg-transparent rounded text-base focus:outline-none">
                                            <p className=" pl-3 py-3 shadow-sm bg-transparent text-lg text-gray-500 tracking-normal">{state.oil ? state.oil : "Seleccione el tipo de combustible..."}</p>
                                            <div className="bg-white items-center flex rounded-r border-gray-300 border-l">
                                                <div className="cursor-pointer h-10 flex items-center text-gray-600 dark:text-gray-400 mx-3" onClick={() => setShow2(!show2)}>
                                                    {show2 ? (
                                                        <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-chevron-up" width={20} height={20} viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
                                                            <path stroke="none" d="M0 0h24v24H0z" />
                                                            <polyline points="6 15 12 9 18 15" />
                                                        </svg>
                                                    ) : (
                                                        <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-chevron-up" width={20} height={20} viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
                                                            <path stroke="none" d="M0 0h24v24H0z" />
                                                            <polyline points="6 9 12 15 18 9" />
                                                        </svg>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    {show2 && (
                                        <ul className="visible transition duration-300 opacity-100 bg-white shadow rounded mb-4 py-2 md:w-auto">
                                            {oil.map((el) => {
                                                return (
                                                    <li className="cursor-pointer text-gray-700 text-lg leading-3 tracking-normal h-8 hover:bg-gray-100 px-3">
                                                        <button onClick={(e) => handleOil(e)} value={el} className="font-normal w-full h-8" >{el}</button>
                                                    </li>
                                                )
                                            })}
                                        </ul>
                                    )}

                                    <label className={estilos.titulos}>
                                        Nro de puertas:
                                    </label>
                                    <div className="bg-white flex md:w-auto mb-6 mt-3 h-16" >
                                        <div className="border-4 border-gray-300 flex justify-between w-full items-center shadow-sm bg-transparent rounded text-base focus:outline-none">
                                            <div className='flex items-center justify-center w-full' >
                                                <input type="range" name="gate" min="2" max="6" step="1" key="healthScore" defaultValue={2} className="w-4/5" onChange={(e) => handleChange(e)} />
                                            </div>
                                            <div className="bg-white items-center flex rounded-r border-gray-300 border-l">
                                                <div className="h-10 flex items-center p-3 text-lg font-semibold text-gray-900 mx-3">
                                                    <label htmlFor="gate">{state.gate ? state.gate : 2}</label>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className={estilos.contenedor_input_y_titulo}>
                                        <label htmlFor="kilometres" className={estilos.titulos}>
                                            Kilometraje:
                                        </label>
                                        <input type="text" id="kilometres" name="kilometres" className={estilos.input} onChange={(e) => handleChange(e)} placeholder="Ej: 90.000, 100.000, 150.000..." />
                                        {errors.kilometres && (<p class="text-red-500 text-lg mt-2">{errors.kilometres}</p>)}
                                    </div>
                                    <div className="mt-6 flex flex-col  w-full">
                                        <label htmlFor="descriptionShort" className={estilos.titulos}>
                                            Descripción corta:
                                        </label>
                                        <textarea id="descriptionShort" name="descriptionShort" onChange={(e) => handleChange(e)} className="bg-transparent border-4 border-gray-300 pl-3 py-3 rounded focus:outline-none focus:border-blue-500 placeholder-gray-500 text-lg text-gray-700" placeholder="Breve descripción del vehículo (esto aparecera en el título del detalle)" rows={2} defaultValue={""} />
                                        <p className="w-full text-right text-xs pt-1 text-black ">Limite de caracteres: 50</p>
                                    </div>
                                    {errors.descriptionShort && (<p class="text-red-500 text-lg mt-2">{errors.descriptionShort}</p>)}
                                </div>
                            </div>
                            {/*-------------------------------------------------------------------- Columna 2 ---------------------------------------------------------------------*/}
                            <div className='lg:mr-20 w-2/4 pt-8 md:items-center sm:items-center'>
                                <div className="container mx-auto">
                                    <div className='flex justify-center'>
                                        <div className='border-blue-900 border-4 rounded-2xl w-2/4 flex justify-center'>
                                            <img src={state.image ? state.image : imagen} alt="img not found" className='w-auto rounded-2xl' />
                                        </div>
                                    </div>
                                    <div className={estilos.contenedor_input_y_titulo}>
                                        <label htmlFor="image" className={estilos.titulos}>
                                            Imagen:
                                        </label>
                                        <input type="file" id="image" name="image" className={estilos.input} onChange={(e) => uploadImage(e.target.files)} placeholder="Dirección URL de la imagen..." />
                                    </div>

                                    <label className={estilos.titulos}>
                                        Trasmisión:
                                    </label>
                                    <div className="bg-white flex md:w-auto mb-6 mt-3 h-16" >
                                        <div className="border-4 border-gray-300 flex justify-between w-full items-center shadow-sm bg-transparent rounded text-base focus:outline-none">
                                            <p className=" pl-3 py-3 shadow-sm bg-transparent text-lg text-gray-500 tracking-normal">{state.transmition ? state.transmition : "Seleccione la transmisión..."}</p>
                                            <div className="bg-white items-center flex rounded-r border-gray-300 border-l">
                                                <div className="cursor-pointer h-10 flex items-center text-gray-600 dark:text-gray-400 mx-3" onClick={() => setShow3(!show3)}>
                                                    {show3 ? (
                                                        <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-chevron-up" width={20} height={20} viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
                                                            <path stroke="none" d="M0 0h24v24H0z" />
                                                            <polyline points="6 15 12 9 18 15" />
                                                        </svg>
                                                    ) : (
                                                        <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-chevron-up" width={20} height={20} viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
                                                            <path stroke="none" d="M0 0h24v24H0z" />
                                                            <polyline points="6 9 12 15 18 9" />
                                                        </svg>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    {show3 && (
                                        <ul className="visible transition duration-300 opacity-100 bg-white shadow rounded mb-4 py-2 md:w-auto">
                                            {transmition.map((el) => {
                                                return (
                                                    <li className="cursor-pointer text-gray-700 text-lg leading-3 tracking-normal h-8 hover:bg-gray-100 px-3">
                                                        <button onClick={(e) => handleTransmition(e)} value={el} className="font-normal w-full h-8" >{el}</button>
                                                    </li>
                                                )
                                            })}
                                        </ul>
                                    )}

                                    <label className={estilos.titulos}>
                                        Condición:
                                    </label>
                                    <div className="bg-white flex md:w-auto mb-6 mt-3 h-16" >
                                        <div className="border-4 border-gray-300 flex justify-between w-full items-center shadow-sm bg-transparent rounded text-base focus:outline-none">
                                            <p className=" pl-3 py-3 shadow-sm bg-transparent text-lg text-gray-500 tracking-normal">{state.condition ? state.condition : "Seleccione la condición..."}</p>
                                            <div className="bg-white items-center flex rounded-r border-gray-300 border-l">
                                                <div className="cursor-pointer h-10 flex items-center text-gray-600 dark:text-gray-400 mx-3" onClick={() => setShow4(!show4)}>
                                                    {show4 ? (
                                                        <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-chevron-up" width={20} height={20} viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
                                                            <path stroke="none" d="M0 0h24v24H0z" />
                                                            <polyline points="6 15 12 9 18 15" />
                                                        </svg>
                                                    ) : (
                                                        <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-chevron-up" width={20} height={20} viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
                                                            <path stroke="none" d="M0 0h24v24H0z" />
                                                            <polyline points="6 9 12 15 18 9" />
                                                        </svg>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    {show4 && (
                                        <ul className="visible transition duration-300 opacity-100 bg-white shadow rounded mb-4 py-2 md:w-auto">
                                            {condition.map((el) => {
                                                return (
                                                    <li className="cursor-pointer text-gray-700 text-lg leading-3 tracking-normal h-8 hover:bg-gray-100 px-3">
                                                        <button onClick={(e) => handleCondition(e)} value={el ? el : "Usado"} className="font-normal w-full h-8" >{el}</button>
                                                    </li>
                                                )
                                            })}
                                        </ul>
                                    )}
                                    <div className={estilos.contenedor_input_y_titulo}>
                                        <label htmlFor="price" className={estilos.titulos}>
                                            Precio:
                                        </label>
                                        <input type="text" id="price" name="price" className={estilos.input} onChange={(e) => handleChange(e)} placeholder="Indicar el precio a vender..." />
                                        {errors.price && (<p class="text-red-500 text-lg mt-2">{errors.price}</p>)}
                                    </div>
                                    <div className={estilos.contenedor_input_y_titulo}>
                                        <label htmlFor="location" className={estilos.titulos}>
                                            Ubicación:
                                        </label>
                                        <input type="text" id="location" name="location" className={estilos.input} onChange={(e) => handleChange(e)} placeholder="Ej: Estado / Provincia / Ciudad..." />
                                    </div>
                                    <div className="mt-6 flex flex-col  w-full">
                                        <label htmlFor="descriptionLong" className={estilos.titulos}>
                                            Descripción larga:
                                        </label>
                                        <textarea id="descriptionLong" name="descriptionLong" onChange={(e) => handleChange(e)} className="bg-transparent border-4 border-gray-300 pl-3 py-3 rounded focus:outline-none focus:border-blue-500 placeholder-gray-500 text-lg text-gray-700" placeholder="Describa las caracteristicas y detalles que tenga el vehículo" rows={5} defaultValue={""} />
                                        <p className="w-full text-right text-xs pt-1 text-black ">Limite de caracteres: 200</p>
                                    </div>
                                    {errors.descriptionLong && (<p class="text-red-500 text-lg mt-2">{errors.descriptionLong}</p>)}
                                </div>
                            </div>
                        </div>
                        <div className="container flex justify-center gap-5 mb-20">
                            <button type='submit' onClick={(e) => handleSubmit(e)} className={estilos.boton_enviar_informacion}>Enviar información</button>
                            <Link to='/home'>
                                <button className={estilos.boton_volver_inicio}>Regresar</button>
                            </Link>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    )
}

export default FormCar;