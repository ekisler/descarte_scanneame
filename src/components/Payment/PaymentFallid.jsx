import React from 'react'
import { useNavigate } from 'react-router-dom';

function PaymentFallid() {
    const navigate =useNavigate();
    return (
  
        <div className="grid place-items-center h-screen flex bg-gradient-to-r from-orange-500   to-orange-800">
      <div className="flex flex-col items-center py-4"> 
  
      <h1 className=" text-center  text-black font-bold  py-4   text-5xl ">
            {" "}
            CARS-MARKET
          </h1>     
          <p className=" text-center  text-white py-4   text-4xl ">
            {" "}
             Tu Pago <strong>NO</strong> Fue Acreditado, puedes intentar hacer el <br/>pago de nuevo 
          </p>
       <button
       class=" rounded w-max px-6 py-4 text-4xl my-5 font-sans font-semibold text-white transition duration-300 ease-in-out delay-300  bg-cyan-600 border-b-4 border-cyan-800 rounded shadow-lg shadow-blue-600/50  hover:border-blue-600"  onClick={()=>navigate("/home")}>Home</button>
      </div>
       </div>
    );
}

export default PaymentFallid