//import logo from './logo.svg';
import './App.css';
import Home from './components/Home/Home'
import React from 'react';
import RestaurantsDetails from './components/RestaurantsDetails/RestaurantsDetails';
import Filter from './components/RestaurantsDetails/Filter'
import {
  Routes,
  Route,
} from 'react-router-dom'


function App() {
  return (
    <Routes>
      <Route path='/' element={<Home/>} />
      <Route path='/details/:rName' element={<RestaurantsDetails/>} />
      <Route path='/filter' element={<Filter/>}/>
    </Routes>
      
  );
}

export default App;