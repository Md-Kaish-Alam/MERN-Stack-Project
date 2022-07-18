import React from 'react'
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import {useParams} from 'react-router-dom'
import { useEffect, useState } from 'react';
import Header from '../Common/Header'
import '../../Styles/details.css'

export default function RestaurantsDetails() {

  const {rName}=useParams()
  const [restaurant,setRestaurant] = useState({})
  
  useEffect(() =>{      //behave like componentDidMount if second parameter is a blank array and if it is not blank it behaves like componentDidUpdate
    fetch(`http://localhost:6767/restaurant/details/${rName}` ,{method: 'GET'})
      .then(response => response.json())
      .then(data =>setRestaurant(data.data))
  },[rName])

  const{name,thumb,cost,Cuisine,address}=restaurant
  let cuisineList = !(Cuisine === undefined) && Cuisine.length && Cuisine.map((item)=>item.name)
  return (
    <div>
      <Header></Header>
      <div>
        <img src={thumb} height='500px' width='100%' alt='Foodimage' />
        {/* <button className='gallery-button'>Click to see image</button> */}
      </div>
      <button className='btn btn-danger' style={{float: 'right' , margin:'15px' , backgroundColor:'#ce0505'}}>Place Online Order</button>
      <div className='heading'>{name}</div>
      <div>
        <Tabs> 
          <TabList>
            <Tab>OverView</Tab>
            <Tab>Contact</Tab>
          </TabList>
          <TabPanel>
            <div className='about'>About the Place</div>
            <div className='head'>Cuisine</div>
              {cuisineList}
            <div className='head'>Average Cost</div>
            <div className='value'>&#8377;{cost}</div>
          </TabPanel>
          <TabPanel>
            <div className='head'>Phone Number</div>
            <div className='value'>+91-7061238198</div>
            <div className='head'>{name}</div>
            <div className='value'>{address}</div>
          </TabPanel>
        </Tabs>
      </div>
    </div>
  )
}