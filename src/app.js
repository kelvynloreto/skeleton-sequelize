//? dependencies 
const express = require('express')
const db = require('./utils/database')

//? files 
const {port} = require('./config');
const userRouter = require('./users/users.router')
const authRouter = require('./auth/auth.router')

//? initial configs
const app = express()

app.use(express.json())

db.authenticate()
    .then(()=> console.log('Database Authenticated'))
    .catch(err=> console.log(err))

db.sync()
    .then(()=> console.log('Database Synced'))
    .catch(err=> console.log(err))


app.get('/',
//! middleware
// (req, res, next) => {
//     if(req.method !== 'GET'){
//         console.log('Se esta ejecutando un middleware',req.method)
//         next()
//     } else {
//         res.status(400).json({message:'Ey, hiciste una peticion GET'})
//     }
// } ,
(req, res) => {
    res.status(200).json({
        message: 'OK!',
        users: `localhost:${port}/api/v1/users`
    })
});

app.use('/api/v1/users', userRouter)
app.use('/api/v1/auth', authRouter)

app.listen(port, () => {
    console.log(`Server started at port ${port}`)
})

