//* Email y Contraseña del usuario 

const { getUserByEmail } = require("../users/users.controllers")
const {comparePassword} = require("../utils/crypto")
//? El email es unico en mi base de datos


const loginUser = async (email, password) => {
//* este controlador tiene 2 posibles respuestas
//* 1era las credenciales son validas y retorna el usuario
//* 2da las credenciales son INvalidas y retorna false
try {
   const user = await getUserByEmail(email)
    //? user.password tiene la contraseña encriptada en la base de datos
    const verifyPassword = comparePassword(password , user.password)
        if (verifyPassword) {
            return user
        }
        return false
} catch  {
        return false
}
}


    // loginUser('example@example.com', '123asd')
    //     .then(res=> console.log(res))
    //     .catch(err => console.log(err))
    
module.exports = {
    loginUser
}