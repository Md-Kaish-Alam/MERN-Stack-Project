const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const restaurantRoutes = require('./routes/restaurant')
const locationRoutes = require('./routes/location')
const menuRoutes = require('./routes/menu')
const mealTypeRoutes = require('./routes/mealType')
const cors = require('cors')


const PORT = 6767

mongoose.connect('mongodb://localhost:27017/ZomatoFile', () => {
    console.log('mongoDB connected')
},e => console.log(e))

var app = express()

app.use(bodyParser.json())
app.use(cors())
app.use('/restaurant',restaurantRoutes)
app.use('/locations',locationRoutes)
app.use('/menu',menuRoutes)
app.use('/mealtype',mealTypeRoutes)


app.listen(PORT,()=> {
    console.log(`app is running port: ${PORT}`);
})