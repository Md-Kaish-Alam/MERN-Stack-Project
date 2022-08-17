import React, { Component } from 'react'
import homepage from '../../assets/background.png'
import '../../Styles/Home.css'
import { Link } from 'react-router-dom'

export default class Wallpaper extends Component {

    constructor() {

        super();
        this.state = {
            locations: [],
            restaurant: []
        }
        // console.log("Wallpaper constructor is called")
    }

    fetchRestaurants = (event) => {
        console.log(event.target.value)
        fetch(`http://localhost:6767/restaurant/${event.target.value}`, { method: 'GET' }) //fetching Restaurants Details
            .then(response => response.json())
            .then(data => this.setState({ restaurant: data.data }))
    }

    componentDidMount() {
        // console.log('Wallpaper componentDidMount is called');
        //call api here
        fetch('http://localhost:6767/locations', { method: 'GET' }) //fetching locations Details
            .then(response1 => response1.json())
            .then(data => this.setState({ locations: data.data }))
    }

    render() {

        let locationOptions = this.state.locations.length && this.state.locations.map(
            (item) =>
                <option key={item.name} value={item.city_id}>
                    {item.name}
                </option>
        )

        let restaurantList= this.state.restaurant.length && <ul>{
            this.state.restaurant.map((item) => 
                <li key={item.name} ><Link to={`/details/${item.name}`}>{item.name}</Link></li>)
                 }</ul>             
        return (
            <div>
                <div>
                    <img src={homepage} width='100%' height='450' alt="" />
                    <div>
                        <div className='logo'>
                            <p>e!</p>
                        </div>
                    </div>
                    {/* <div>
                    <button type='button' className='btn btn-outine-secondary button-1'>Login</button>
                    <button type='button' className='btn btn-outine-secondary button-2'>Create an account</button>
                </div> */}
                    <div className='headings'>Find the best restaurants , cafes , bars</div>
                    <div className='locationSelector'>
                        <select className='locationDropdown' onChange={this.fetchRestaurants} style={{cursor: 'pointer'}}>
                            <option value='0'>Select Location</option>
                            {locationOptions}
                        </select>
                        <div id="notebooks" >
                            <input className="restaurantsinput" type="text" placeholder="Search Restaurant"/>
                            {restaurantList}
                        </div>
                        <span className='glyphicon glyphicon-search search'></span>
                    </div>
                </div>
            </div>
        )
    }
}