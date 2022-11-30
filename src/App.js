import React from 'react';

// import { Counter } from './features/counter/Counter';//ESTO ES DE REDUX TOOLKIT
import './App.css';
import {BrowserRouter,Route,Routes} from 'react-router-dom'
import Home from './components/Home/Home.jsx'
import FormRegister from './components/FormRegister/FormRegister.jsx'
import FormCar from './components/FormCar/FormCar.jsx'; 
import CardDetail from './components/CardDetail/CardDetail.jsx'
import Login from './components/Login.js'
import PageNotFound from './components/PageNotFound.js'
import LandingPage from './components/LandingPage/LandingPage';
import ConctactForm from './components/contactForm/contactForm';
import Dashboard from './components/Dashboard/Dashboard.jsx';
import FormUpdateCar from './components/Dashboard/FormUpdateCar';
import SellerRatingForm from './components/RatingForms/SellerRatingForm.jsx';
import BuyerForm from './components/RatingForms/BuyerForm.jsx'
import PaymentSucessfull from './components/Payment/PaymentSucessfull';
import PaymentFallid from './components/Payment/PaymentFallid';
import PerfilUser from './components/PerfilUser/PerfilUser';
import BaneoForm from './components/BaneoForm/BaneoForm.jsx'

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes> 
          <Route path='/' exact element = {<LandingPage/>}/>
          <Route path='/home' element={<Home/>}/>
          <Route path='/home/success' element={<Home/>}/>
          <Route path='/login' element={<Login/>}/>
          <Route path='/createuser' element={<FormRegister/>}/>
          <Route path='/createcar' element={<FormCar/>} />
          <Route path='/carEdit' element={<FormUpdateCar/>}/>
          <Route path='/cars/:id' element={<CardDetail/>} />
          <Route path='/Contact' element={<ConctactForm/>}/>
          <Route path='/dashboard' element={<Dashboard/>}/>
          <Route path="/SellerRatingForm" element={<SellerRatingForm />} />
          <Route path="/BuyerForm" element={<BuyerForm />} />
          <Route path="/sucessfull" element={<PaymentSucessfull/>} />
          <Route path="/failed" element={<PaymentFallid/>} />
          <Route path="/perfil/:id" element={<PerfilUser/>}/>
          <Route path="/FormBaneo" element={<BaneoForm/>}/>
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </BrowserRouter>

    </>
  );
}

export default App;
