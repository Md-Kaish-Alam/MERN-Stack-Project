import React, { Component } from 'react'
import MealType from './Mealtype';
import '../../Styles/Home.css'

export default class QuickSearch extends Component {

    constructor() {
        super();
        this.state = {
            mealtype: []
        }
    }

    componentDidMount() {
        fetch('http://localhost:6767/mealtype', { method: 'GET' })
            .then(response => response.json())
            .then(data => this.setState({ mealtype: data.data }))
    }
    render() {

        let quickSearchList = this.state.mealtype.length && this.state.mealtype.map((item) => <MealType item={item} key={item.name}></MealType>)

        console.log(quickSearchList);

        return (
            <div>
                <div className='quicksearchText'>
                    <p className='quicksearchHeading'>
                        QuickSearch
                    </p>
                    <p className='quicksearchSubHeading'>
                        Discover restaurants by type of meal
                    </p>
                </div>
                <div className='quicksearch'>
                    <div classname='container-fluid'>
                        <div className='row'>
                            {quickSearchList}
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
