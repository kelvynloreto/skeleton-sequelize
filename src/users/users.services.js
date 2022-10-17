const usersControllers = require('./users.controllers');

const getAllUsers = (req, res) => {
    usersControllers.getAllUsers()
        .then((response) => {
            res.status(200).json(response)
        })
        .catch((err) => {
            res.status(400).json({ message: err.message })
        })
};

const getUserById = (req, res) => {
    const id = req.params.id
    usersControllers.getUserById(id)
        .then((response) => {
            res.status(200).json(response)
        })
        .catch((err) => {
            res.status(404).json({ message: err.message })
        })
};

const patchUser = (req, res) => {
    const id = req.params.id
    //? Solo datos que queremos que el usuario pueda modificar
    const { firstName, lastName, phone, gender, country } = req.body

    usersControllers.updateUser(id, { firstName, lastName, phone, gender, country })
        .then(data => {
            if (data[0]) {
                res.status(200).json({ message: `User with ID: ${id}, edited succesfully!` })
            } else {
                res.status(400).json({ message: 'Invalid ID' })
            }
        })
        .catch(err => {
            res.status(400).json({ message: err.message })
        })
};

const registerUser = (req, res) => {
    const { firstName, lastName, email, password, phone, birthday, gender, country } = req.body
    if (firstName && lastName && email && password && phone && birthday ) {
        // ejecutamos el controlador
        usersControllers.createUser({firstName, lastName, email, password, phone, birthday, gender, country})
        .then(data=>{
            res.status(201).json(data)
        })
        .catch(err => { 
            res.status(400).json({ message: err.message })
        })
    }
    else{
        // error cuando no se envian todos los datos necesarios
        res.status(400).json({message:`All fields must be completed` , fileds:{
            firstName: "String",
            lastName: "String", 
            email: "example@email.com", 
            password: "String", 
            phone: "+52123123123" , 
            birthday: 'YYYY/MM/DD'
        }})
    }

};


const deleteUser = (req, res) => {
    const id = req.params.id
    usersControllers.deleteUser(id)
        .then(data => {
            if (data) {
                res.status(204).json()
            }
            else {
                res.status(404).json({ message: `Invalid ID` })
            }
        })
        .catch(err => {
            res.status(400).json({ message: err.message })
        })
};

//? My user services 

const getMeUser = (req , res)=>{
    const id = req.user.id //? req.user contiene la informacion del token desencriptado
   usersControllers.getUserById(id)
   .then(data => {
    res.status(200).json(data)
   })
   .catch(err=>{
    res.status(400).json({ message: err.message})
   })
}
const patchMe = (req, res) => {
    const id = req.user.id //? req.user contiene la informacion del token desencriptado
    const { firstName, lastName, phone, gender, country } = req.body

    usersControllers.updateUser(id, { firstName, lastName, phone, gender, country })
        .then(data => {
                res.status(200).json({ message: `User with ID: ${id}, edited succesfully!` })
        })
        .catch(err => {
            res.status(400).json({ message: err.message })
        })
};

const deleteMeUser = (req , res)=>{
    const id = req.user.id //? req.user contiene la informacion del token desencriptado
   usersControllers.deleteUser(id)
   .then(data => {
    res.status(200).json(data)
   })
   .catch(err=>{
    res.status(400).json({ message: err.message})
   })
}


module.exports = {
    getAllUsers,
    getUserById,
    patchUser,
    registerUser,
    deleteUser,
    getMeUser,
    patchMe,
    deleteMeUser
}