import "./SearchBar.css";
import React, { useState } from "react";
import { connect, useDispatch } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import {
  getCars,
  OrderForPrice,
  getCarForCondition,
  getCarForName,
} from "../../Redux/Actions.js";

export const SearchBar = ({
  getCarForName,
  OrderForPrice,
  getCarForCondition,
  Cars,
  Car,
}) => {
  const dispatch = useDispatch();
  const history = useNavigate();
  const location = useLocation();
  const [busqueda, setbusqueda] = useState("");

  const handleInput = (e) => {
    e.preventDefault();
    setbusqueda(e.target.value);

  }
  const getbusqueda = () => {
    if (location.pathname === "/createcar") {
      history('/home');
    }
    dispatch(getCarForName(busqueda))
    setbusqueda("");

    // setSort(e.target.value);
  };

  return (
    <>
      <div className="contenedor-SearchBar">
        <input
          onChange={(e) => handleInput(e)}
          type="text"
          placeholder="¿Que auto buscaba...?"
          className="input-SearchBar"
        />
        <button
          onClick={() => getbusqueda()}
          type="submit"
          class="p-2.5 ml-1 text-sm font-medium text-white bg-blue-700 rounded-lg border border-blue-700 hover:bg-blue-800 focus:outline-none shadow-md shadow-black dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          <svg
            class=" smd:w-4 sm:h-4 md:w-4 md:h-4 lg:w-5 lg:h-5 xl:w-6 xl:h-6 "
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            ></path>
          </svg>
        </button>
      </div>
    </>
  );
};

function mapStateToProps(state) {
  return {
    Cars: state.allCars,
    Car: state.car,
    //temperaments: state.temperaments,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    OrderForPrice: (e) => dispatch(OrderForPrice(e)),
    getCarForCondition: (e) => dispatch(getCarForCondition(e)),
    getCars: () => dispatch(getCars()),
    getCarForName: (e) => dispatch(getCarForName(e)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(SearchBar);
