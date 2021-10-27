require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const fileUpload = require('express-fileupload')
const cookieParser = require('cookie-parser')
const courseRoutes = require('./routes/course.routes') ; 
const courseDetailsRoute = require('./routes/detailscourse.routes') ; 
const questionsRoute =require('./routes/questions.routes') ; 
const app = express()
app.use(express.json())
app.use(cookieParser())
app.use(cors())
// app.use(fileUpload({
//     useTempFiles: true
// }))
require('dotenv').config({
    path: '/.env'
})

// Connect to mongodb
const URI = process.env.MONGODB_URL_LOCAL
mongoose.connect(URI, {
    useCreateIndex: true,
    useFindAndModify: false,
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(()=>{
    console.log("Connected..")
}).catch(er=>{
    console.log("ER",er.message) ; 
})





// Routes
app.use('/api/user', require('./routes/userRouter'))
app.use('/api', require('./routes/upload'))
app.use('/api', require('./routes/categoryRouter'))
app.use('/api', require('./routes/formationRouter'))
app.use('/api/course',courseRoutes) ; 
app.use('/api/details',courseDetailsRoute) ; 
app.use('/api/questions',questionsRoute) ; 
app.use('/uploads', express.static(__dirname + '/uploads'));
const PORT = process.env.PORT || 5000
app.listen(PORT, () =>{
    console.log('Serveur is running on port', PORT)
})