import React, { useState } from "react";
import { useEffect } from "react";
import { connect } from "react-redux";
import {
  getCars,
  OrderForPrice,
  getCarForCondition,
  filterForModel,
  filterForBrand,
} from "../../Redux/Actions.js";
export const Filters = ({
  getCars,
  OrderForPrice,
  getCarForCondition,
  Cars,
  Car,
  Model,
  Brand,
}) => {
  const estilos = {
    select:
      "block p-2 mb-6 w-full mr-1 text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500",
    label: "block mb-2 text-lg font-medium text-white dark:text-white",
    button:
      "text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800",
    contenedorcolor:
      "text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2",
    buttonlight:
      "text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2",
    buttonvacio:"relative inline-flex items-center justify-center p-0.5 mb-2 mr-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-purple-600 to-blue-500 group-hover:from-purple-600 group-hover:to-blue-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800"
    };
  //console.log(estilos.select)
  let orderPrice = (e) => {
    e.preventDefault();
    setPrice(e.target.value);
    OrderForPrice(e.target.value);
    // setSort(e.target.value);
  };
  let filterForCondition = (e) => {
    e.preventDefault();
    console.log(e.target.value);
    setCondition(e.target.value);
    getCarForCondition(e.target.value);
    console.log(e.target.value);
  };
  useEffect(()=>{
    setCondition("none");
    setPrice("none");
    setBrand("none");
    setMinYear("none");
    setMaxYear("none");
  },[])
  let filterclear = (e) => {
    e.preventDefault();
    setModelmin(0);
    let select = document.getElementById("selectcondition");
    select.option = "none";
    getCars();
    setCondition("none");
    setPrice("none");
    setBrand("none");
    setMinYear("none");
    setMaxYear("none");
    console.log(select);
    //elemento.reset();
  };
  let filterForModel = (e) => {
    e.preventDefault();
    console.log(modelmin);
    console.log(modelmax);
    Model([modelmin, modelmax]);
  };
  let filterForBrand = (e) => {
    e.preventDefault();
    setBrand(e.target.value);
    Brand(e.target.value);
  };
  let fYearmin = (e) => {
    e.preventDefault();
    setMinYear(e.target.value);
    setModelmin(e.target.value);
  };
  let fModelmax = (e) => {
    e.preventDefault();
    setModelmax(e.target.value);
    setMaxYear(e.target.value);
  };
  function filterRepetidos(base) {
    const datos = Car.map((e) => e[base]);
    const unicos = [...new Set(datos)];
    unicos.sort(function (a, b) {
      return a - b;
    });

    return unicos;
  }
  useEffect(() => {}, []);
  const [brand, setBrand] = useState("");
  const [modelmin, setModelmin] = useState(0);
  const [modelmax, setModelmax] = useState(0);
  const [minYear, setMinYear] = useState(0);
  const [maxYear, setMaxYear] = useState(0);
  const [condition, setCondition] = useState([]);
  const [price, setPrice] = useState(0);
  return (
    <>
      <div id="contenedor" class=" w-48" >
        <div class="fixed pt-5">
        <label className={estilos.label}> ORDENAR POR PRECIO </label>
        <div>
          <select
            value={price}
            className={estilos.select}
            onChange={(e) => orderPrice(e)}
          >
            <option value="none" disabled selected defaultValue>
              Precio
            </option>
            <option value="priceAsc">Precio Minimo</option>
            <option value="priceDesc">Precio Maximo</option>
          </select>
        </div>

        <label className={estilos.label}> CONDICIÓN</label>
        <div>
          <select
            id="selectcondition"
            value={condition}
            className={estilos.select}
            onChange={(e) => filterForCondition(e)}
          >
            <option value="none" disabled selected defaultValue>
              Condición
            </option>
            <option value="Nuevo">Nuevo</option>
            <option value="Usado">Usado</option>
          </select>
        </div>

        <div>
          <h2 className={estilos.label}> FILTRAR POR AÑO</h2>
          <div className="flex flex-row ">
            <select
              value={minYear}
              className={estilos.select}
              onChange={(e) => fYearmin(e)}
            >
              <option value="none" disabled selected defaultValue>
                desde-
              </option>
              {Car &&
                filterRepetidos("year").map((e) => (
                  <option value={e} key={e}>
                    {e}
                  </option>
                ))}
            </select>
            <select
              value={maxYear}
              className={estilos.select}
              onChange={(e) => fModelmax(e)}
            >
              <option value="none" disabled selected defaultValue>
                -hasta
              </option>
              {Car &&
                filterRepetidos("year")
                  .filter((e) => e >= modelmin)
                  .map((e) => (
                    <option
                      disabled={modelmin != 0 ? false : true}
                      value={e}
                      key={e}
                    >
                      {e}
                    </option>
                  ))}
            </select>
          </div>
          <button
            className={estilos.buttonlight}
            onClick={(e) => filterForModel(e)}
          >
            Enviar Rango De Año
          </button>
          <div>
            <div>
              <label className="block mb-2 text-lg font-medium text-white dark:text-white">
                MARCA
              </label>
            </div>
            <select
              value={brand}
              id="selectrbrand"
              className={estilos.select}
              onChange={(e) => filterForBrand(e)}
            >
              <option value="none" disabled selected defaultValue>
                Marca
              </option>
              {Car &&
                filterRepetidos("brand").map((e) => (
                  <option value={e} key={e}>
                    {e}
                  </option>
                ))}
            </select>
          </div>
          <div>
            <button className={estilos.button} onClick={(e) => filterclear(e)}>
              Limpiar los filtros
            </button>
          </div>
        </div>
        </div>
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
    Model: (e) => dispatch(filterForModel(e)),
    Brand: (e) => dispatch(filterForBrand(e)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Filters);
