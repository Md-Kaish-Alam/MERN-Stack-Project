import React from 'react'
import '../../Styles/Home.css'

export default function MealType(props) {

    const { name, content, image } = props.item
    return (

            <div className='col-sm-4 col-md-4 col-lg-4'>
                <div className='titleContainer rounded-start'>
                    <div className='titleComponent1'>
                        <img src={require('../../' + image)} alt='Foodimage' className='rounded-start' height='135' width='145' />
                    </div>
                    <div className='titleComponent2'>
                        <div className='componentHeading'>
                            {name}
                        </div>
                        <div className='componentSubHeading'>
                            {content}
                        </div>
                    </div>
                </div>
            </div>
    )
}

