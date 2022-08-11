import './App.css';
// import {useState} from 'react'
import Home from './components/Home/Home'

import React from 'react';
import RestaurantsDetails from './components/RestaurantsDetails/RestaurantsDetails';
import Filter from './components/RestaurantsDetails/Filter'
import Login from './components/Common/Login'
import Register from './components/Common/Register'
import { Routes, Route} from 'react-router-dom'


function App() {

  // const [ user , setLoginUser] = useState({})
  return (
    <Routes>
      <Route exact path='/' element={<Home />} />
      {/* <Route exact path='/'>
        {
          user && user._id ? <Home /> : <Login setLoginUser = {setLoginUser}/>
        }
      </Route> */}
      <Route path='/details/:rName' element={<RestaurantsDetails />} />
      <Route path='/filter' element={<Filter />} />
      <Route path='/register' element={<Register />} />
      <Route path='/login' element={<Login/>} />
    </Routes>

  );
}

export default App;