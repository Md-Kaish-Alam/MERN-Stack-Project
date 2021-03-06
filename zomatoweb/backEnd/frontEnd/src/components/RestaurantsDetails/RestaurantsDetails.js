import React from 'react'
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import { useParams } from 'react-router-dom'
import { useEffect, useState } from 'react';
import Header from '../Common/Header'
import '../../Styles/details.css'
import Modal from 'react-modal'

Modal.setAppElement('#root')

const modalStyle = {
  overlay: {
    position: 'fixed',
    zIndex: 1020,
    top: 0,
    left: 0,
    width: '100vw',
    height: '100vh',
    background: 'rgba(255, 255, 255, 0.75)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  content: {
    left: 'auto',
    right: 'auto',
    width: 'auto',
    tranform: 'translate(-50%,-50%)'
  }
}

export default function RestaurantsDetails() {

  

  const { rName } = useParams()
 
  const [restaurant, setRestaurant] = useState({})
  const [isMenuModalOpen, setIsMenuModalOpen] = useState(false)
  const [isFullImageOpen, setFullImageOpen] = useState(false)
  const [menu, setMenu] = useState({})
  const [totalPrice, setTotalPrice] = useState(0)


  useEffect(() => {      //behave like componentDidMount if second parameter is a blank array and if it is not blank it behaves like componentDidUpdate
    fetch(`http://localhost:6767/restaurant/details/${rName}`, { method: 'GET' })
      .then(response => response.json())
      .then(data => setRestaurant(data.data))
  }, [rName])

 

  const fetchMenu = () => {
    fetch(`http://localhost:6767/restaurant/menu/${rName}`, { method: 'GET' })
      .then(response => response.json())
      .then(data => setMenu(data.data))
  }

  const addTotalPrice = (item) => {

    let price = totalPrice + item.itemPrice;
    setTotalPrice(price);
  }

  const remTotalPrice = (item) => {
    let price = totalPrice - item.itemPrice;
    if (price < 0) {
      price = 0;
      setTotalPrice(price);
    }
    else {
      setTotalPrice(price);
    }
  }

  const loadScript = (src) => {
    return new Promise((resolve) => {
      const script = document.createElement('script');
      script.src = src;
      script.onload = () => {
        resolve(true)
      }
      script.onerror = () => {
        resolve(false)
      }
      document.body.appendChild(script)
    })
  }

  const openRazorpay = async () => {   //creating order in razorpay by calling backend api

    try {
      let orderData;
      orderData = await fetch(`http://localhost:6767/pay`, {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ amount: totalPrice })
      }).then(resp => resp.json())

      //open razorpay window
      const options = {
        key: "rzp_test_wnR0tFBazk0lwY",
        name: 'zomato food delivery app',
        amount: orderData.amount,
        currency: orderData.currency,
        order_id: orderData.id,
        prefill: {
          email: 'hahiri5791@shbiso.com',
          contact: '202-555-0183'
        },
        handler: function (response) {
          //call api that would save transactions in DataBase
          fetch(`http://localhost:6767/pay/save`, {
            method: 'POST',
            headers: { 'content-type': 'application/json' },
            body: JSON.stringify({
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
              razorpay_amount: orderData.amount,
            })
          }).then(resp => console.log(resp))
        }
      }
      const paymentWindow = new window.Razorpay(options)
      paymentWindow.open()
    } catch (error) {
      console.log(error)
    }
  }
  const { name, thumb, cost, Cuisine, address } = restaurant
  let cuisineList = !(Cuisine === undefined) && Cuisine.length && Cuisine.map((item) => item.name)
  
  return (
    <div>
      <Header></Header>
      <div className="container">
        <div className='img-container'>
          <img src={thumb} height='500px' width='100%' alt='Foodimage' />
          <button className='gallery-button' onClick={() => setFullImageOpen(true)}>Click to see image</button>
        </div>
        <button
          className='btn btn-danger'
          style={{ float: 'right', margin: '15px', backgroundColor: '#ce0505' }}
          onClick={() => { setIsMenuModalOpen(true); fetchMenu(); }}>
          Place Online Order
        </button>
        <div className='heading'>{name}</div>
        <div className='tab-content'>
          <Tabs>
            <TabList
              style={{
                borderBottom: '1px solid black'
              }}
            >
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
      <div>
        <Modal isOpen={isMenuModalOpen}>
          <div>
            <div className='row'>
              <div className='col-sm-9'>
                <h2>Menu</h2>
              </div>
              <div className='col-sm-3'>
                <button className='btn btn-danger float-end' onClick={() => setIsMenuModalOpen(false)} style={modalStyle}>X</button>
              </div>
            </div>
            <div className='menu'>
              <ul>
                {
                  menu.length && menu.map((item, index) =>
                    <li key={index}>
                      <div>
                        {
                          item.isVeg ? <span className='text-success fs-6'>Veg</span> :
                            <span className='text-danger fs-6'>Non-Veg</span>
                        }
                      </div>
                      <div className='cuisine'>{item.itemName}</div>
                      <div className='cuisine'>&#8377;{item.itemPrice}</div>
                      <div className='cuisine'>{item.itemDescription}</div>
                      <div className='cart-btn'>
                        <button className='btn btn-secondary cart-btn' onClick={() => addTotalPrice(item)}>Add</button>
                        <button className='btn btn-secondary cart-btn' onClick={() => remTotalPrice(item)}>Remove</button>
                      </div>
                    </li>)
                }
              </ul>
              <hr />
              <div className='totalPay'>
                <h3 className='col-sm-9'>Total Price : {totalPrice}</h3>
                <button
                  className='btn btn-danger pay-btn'
                  onClick={() => {
                    setIsMenuModalOpen(false);
                    loadScript(`https://checkout.razorpay.com/v1/checkout.js`);
                    openRazorpay();
                  }}>
                  Pay Now
                </button>
              </div>
            </div>
          </div>
        </Modal>
      </div>
      <div>
        <Modal
          isOpen={isFullImageOpen}
        >
          <div className='cut'>
            <button className='btn btn-light float-end' onClick={() => setFullImageOpen(false)}>X</button>
          </div>
          <img src={thumb} height='93%' width='100%' alt='Foodimage' />    
        </Modal>
      </div>
    </div>
  )
}