import { React } from "react";
import {  useSelector } from "react-redux";
import { CarouselProvider, Slider, Slide, ButtonBack, ButtonNext } from "pure-react-carousel";
import "pure-react-carousel/dist/react-carousel.es.css";
import { useNavigate } from "react-router-dom";
import imgDefault from '../Card/imagenes/Imagen_Default.png'

export default function Index() {

    const history = useNavigate();
    const cars = useSelector((state) => state.allCars)
    const carsPremium = cars.filter(e=>e.active).filter((e) => e.premium === true);

    return (
        <div className="container mx-auto w-full flex items-center justify-center ml-5">
            <div className="flex items-center justify-center w-full h-full mt-3 mb-5">
                {/* Carousel for desktop and large size devices */}
                <CarouselProvider className="lg:block hidden" naturalSlideWidth={60} isIntrinsicHeight={true} totalSlides={carsPremium.length} visibleSlides={3} step={1} infinite={true}>
                    <div className="w-full relative flex items-center justify-center">
                        <ButtonBack role="button" aria-label="slide backward" className="absolute z-10 left-0 ml-8  cursor-pointer" id="prev">
                            <svg width={30} height={30} viewBox="0 0 8 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M7 1L1 7L7 13" stroke="white" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        </ButtonBack>
                        <div className="w-full h-full mx-auto overflow-x-hidden overflow-y-hidden">
                            <Slider className="z-0">
                                <div id="slider" className=" flex lg:gap-8 md:gap-6 gap-14 items-center justify-center transition ease-out duration-700">
                                    {carsPremium && carsPremium.map((e) => {
                                        return (
                                            <Slide index={e.brand} onClick={() => history(`/cars/${e.id}`)} className="cursor-pointer" title="Click para ver detalles">
                                                <div className="flex flex-shrink-0 relative" >
                                                    <img src={e.image ? e.image : imgDefault} alt="" className="lg:h-48 xl:h-56 2xl:h-64 w-full cursor-pointer" />
                                                    <div className="bg-gray-800 bg-opacity-30 absolute w-full h-full lg:p-3 xl:p-5">
                                                        <h2 className="lg:text-xl leading-4 text-base lg:leading-5 text-white font-semibold">{e.brand}</h2>
                                                    </div>
                                                </div>
                                            </Slide>
                                        )
                                    })}
                                </div>
                            </Slider>
                        </div>
                        <ButtonNext role="button" aria-label="slide forward" className="absolute z-10 right-0 mr-8" id="next">
                            <svg width={30} height={30} viewBox="0 0 8 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M1 1L7 7L1 13" stroke="white" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        </ButtonNext>
                    </div>
                </CarouselProvider>
                {/* Carousel for tablet and medium size devices */}
                <CarouselProvider className="lg:hidden md:block hidden" naturalSlideWidth={100} isIntrinsicHeight={true} totalSlides={carsPremium.length} visibleSlides={2} step={1} infinite={true}>
                    <div className="w-full relative flex items-center justify-center">
                        <ButtonBack role="button" aria-label="slide backward" className="absolute z-10 left-0 ml-8" id="prev">
                            <svg width={30} height={30} viewBox="0 0 8 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M7 1L1 7L7 13" stroke="white" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        </ButtonBack>
                        <div className="w-full h-full mx-auto overflow-x-hidden overflow-y-hidden">
                            <Slider>
                                <div id="slider" className="h-full flex lg:gap-8 md:gap-6 gap-14 items-center justify-start transition ease-out duration-700">
                                    {carsPremium && carsPremium.map((e) => {
                                        return (
                                            <Slide index={e.brand}>
                                                <div className="flex flex-shrink-0 relative w-full sm:w-auto">
                                                    <img src={e.image ? e.image : imgDefault} alt="black chair and white table" className="object-cover object-center w-full" />
                                                    <div className="bg-gray-800 bg-opacity-30 absolute w-full h-full p-6">
                                                        <h2 className="lg:text-xl leading-4 text-base lg:leading-5 text-white font-semibold">{e.brand}</h2>
                                                    </div>
                                                </div>
                                            </Slide>
                                        )
                                    })}
                                </div>
                            </Slider>
                        </div>
                        <ButtonNext role="button" aria-label="slide forward" className="absolute z-10 right-0 mr-8" id="next">
                            <svg width={30} height={30} viewBox="0 0 8 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M1 1L7 7L1 13" stroke="white" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        </ButtonNext>
                    </div>
                </CarouselProvider>
                {/* Carousel for mobile and Small size Devices */}
                <CarouselProvider className="block md:hidden " naturalSlideWidth={100} isIntrinsicHeight={true} totalSlides={carsPremium.length} visibleSlides={1} step={1} infinite={true}>
                    <div className="w-full relative flex items-center justify-center">
                        <ButtonBack role="button" aria-label="slide backward" className="absolute z-10 left-0 ml-8 " id="prev">
                            <svg width={30} height={30} viewBox="0 0 8 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M7 1L1 7L7 13" stroke="white" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        </ButtonBack>
                        <div className="w-full h-full mx-auto overflow-x-hidden overflow-y-hidden">
                            <Slider>
                                <div id="slider" className="h-full w-full flex lg:gap-8 md:gap-6 items-center justify-start transition ease-out duration-700">
                                    {carsPremium && carsPremium.map((e) => {
                                        return (
                                            <Slide index={e.brand}>
                                                <div className="flex flex-shrink-0 relative w-full sm:w-auto">
                                                    <img src={e.image ? e.image : imgDefault} alt="black chair and white table" className="object-cover object-center w-full" />
                                                    <div className="bg-gray-800 bg-opacity-30 absolute w-full h-full p-6">
                                                        <h2 className="lg:text-xl leading-4 text-base lg:leading-5 text-white font-semibold">{e.brand}</h2>
                                                    </div>
                                                </div>
                                            </Slide>
                                        )
                                    })}
                                </div>
                            </Slider>
                        </div>
                        <ButtonNext role="button" aria-label="slide forward" className="absolute z-10 right-0 mr-8" id="next">
                            <svg width={30} height={30} viewBox="0 0 8 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M1 1L7 7L1 13" stroke="white" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        </ButtonNext>
                    </div>
                </CarouselProvider>
            </div>
        </div>
    );
}
