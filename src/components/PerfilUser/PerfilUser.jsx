import { React, useEffect } from 'react'
import { getUser } from '../../Redux/Actions';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useNavigate } from "react-router-dom";
import Card from "../Card/Card.jsx";
import NavBar from '../NavBar/NavBar';

const estilos = {
  button_regresar_inicio: "text-white bg-blue-700 hover:bg-blue-800 focus:outline-none shadow-md shadow-black rounded-full text-center mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-900 dark:focus:ring-blue-800 font-semibold text-lg leading-4  w-auto py-4 px-4 lg:mt-12 mt-6",
}

function PerfilUser() {

  const dispatch = useDispatch();
  const history = useNavigate();

  const userDetail = useSelector(state => state.user);
  const cardDetail = useSelector((state) => state.carDetail);

  const car = userDetail.cars;
  const reviewsUser = cardDetail.user && cardDetail.user.reviews;
  const ratings = reviewsUser && reviewsUser.map(e => e.rating);
  const ratingUser = ratings && Math.round(ratings.reduce((a, b) => a + b, 0) / ratings.length);

  let { id } = useParams();

  useEffect(() => {
    dispatch(getUser(id))
  }, [dispatch, id])

  return (
    <div>
      <div>
        <NavBar />
      </div>
      <div className='pt-40 pb-10 bg-gradient-to-r from-cyan-500 to-blue-500 flex justify-center'>
        <div className='w-9/12 bg-white flex flex-col rounded-3xl shadow-xl'>
          <div className='flex justify-between'>
            <div className='flex'>
              <div className='pl-20'>
                <img src={userDetail.imgPerfil} alt='img not found' className='rounded-full w-36 shadow-xl border-none -mt-16' />
              </div>
              <div>
                <div className='font-semibold lg:text-4xl sm:text-2xl md:text-2xl text-3xl leading-10 text-gray-600 mt-8 ml-6'>{userDetail.firstName} {userDetail.lastName}</div>
                <div class="flex gap-1 ml-6 mt-2">
                  <svg aria-hidden="true" class={(reviewsUser && ratingUser >= 1) ? "sm:w-6 sm:h-6 md:w-7 md:h-7 lg:w-8 lg:h8 xl:w-9 xl:h-9 text-yellow-400" : "sm:w-6 sm:h-6 md:w-7 md:h-7 lg:w-8 lg:h8 xl:w-9 xl:h-9 text-gray-300"} fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><title>First star</title><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path></svg>
                  <svg aria-hidden="true" class={(reviewsUser && ratingUser >= 2) ? "sm:w-6 sm:h-6 md:w-7 md:h-7 lg:w-8 lg:h8 xl:w-9 xl:h-9 text-yellow-400" : "sm:w-6 sm:h-6 md:w-7 md:h-7 lg:w-8 lg:h8 xl:w-9 xl:h-9 text-gray-300"} fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><title>Second star</title><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path></svg>
                  <svg aria-hidden="true" class={(reviewsUser && ratingUser >= 3) ? "sm:w-6 sm:h-6 md:w-7 md:h-7 lg:w-8 lg:h8 xl:w-9 xl:h-9 text-yellow-400" : "sm:w-6 sm:h-6 md:w-7 md:h-7 lg:w-8 lg:h8 xl:w-9 xl:h-9 text-gray-300"} fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><title>Third star</title><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path></svg>
                  <svg aria-hidden="true" class={(reviewsUser && ratingUser >= 4) ? "sm:w-6 sm:h-6 md:w-7 md:h-7 lg:w-8 lg:h8 xl:w-9 xl:h-9 text-yellow-400" : "sm:w-6 sm:h-6 md:w-7 md:h-7 lg:w-8 lg:h8 xl:w-9 xl:h-9 text-gray-300"} fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><title>Fourth star</title><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path></svg>
                  <svg aria-hidden="true" class={(reviewsUser && ratingUser === 5) ? "sm:w-6 sm:h-6 md:w-7 md:h-7 lg:w-8 lg:h8 xl:w-9 xl:h-9 text-yellow-400" : "sm:w-6 sm:h-6 md:w-7 md:h-7 lg:w-8 lg:h8 xl:w-9 xl:h-9 text-gray-300"} fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><title>Fifth star</title><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path></svg>
                </div>
              </div>
            </div>
            <div className='mr-10'>
              <button
                title="Regresar al inicio"
                className={estilos.button_regresar_inicio}
                onClick={() => history(`/cars/${cardDetail.id}`)}>
                Regresar
              </button>
            </div>
          </div>
          <div className='flex justify-center border-y-2 border-gray-300 my-5 mx-20'>
            <div className='sm:text-xl md:text-2xl lg:text-3xl text-gray-600 font-semibold py-3  '>
              Publicaciones
            </div>
          </div>
          <div className='flex mb-10 lg:flex-row justify-center'>
            <div className='grid grid-cols-3  gap-0 w-9/12'>
              {car && car.map(el => (
                <Card
                  key={el.id}
                  id={el.id}
                  image={el.image}
                  descriptionShort={el.descriptionShort}
                  price={el.price}
                  kilometres={el.kilometres}
                  transmition={el.transmition}
                  year={el.year}
                  prem={el.premium}

                />
              ))
              }
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PerfilUser