const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const restaurantRoutes = require('./routes/restaurant')
const locationRoutes = require('./routes/location')
const menuRoutes = require('./routes/menu')
const mealTypeRoutes = require('./routes/mealType')
const paymentRoutes = require('./routes/payment')
const cors = require('cors')


const PORT = process.env.PORT || 6767

const DBCONNECTINGSTRING = `mongodb+srv://KaishAlam:Fp0MlaJlUzzh97Ys@cluster0.nrq1r.mongodb.net/ZomatoFile`
// `mongodb://localhost:27017/ZomatoFile`

mongoose.connect(DBCONNECTINGSTRING, () => {
    console.log('mongoDB connected')
},e => console.log(e))

var app = express()

app.use(bodyParser.json())
app.use(cors())
app.use('/restaurant',restaurantRoutes)
app.use('/locations',locationRoutes)
app.use('/restaurant/menu',menuRoutes)
app.use('/mealtype',mealTypeRoutes)

app.use('/pay',paymentRoutes)


//heroku configuration
if(process.env.NODE_ENV='production'){
    app.use(express.static('frontend/build'))
}

app.listen(PORT,()=> {
    console.log(`app is running port: ${PORT}`);
})