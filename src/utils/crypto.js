const bcrypt = require('bcrypt');


//! plainPasssword contraseña que recibimos del cliente en texto plano
//! hashedPassword contraseña encriptada en la base de datos

// encripta la contrase;a del usuario cuando se crea o modifca 
const hashPassword= (plainPassword)=>{
    return  bcrypt.hashSync(plainPassword , 10)     
}

// compara si la contrasena root es=  $2b$10$TaMKMcDKioEx9X17c.56e.UZrK1Vds.g0wBXqhuGAUB2AqytvL.Vu
const comparePassword = (plainPassword, hashedPassword)=>{
    //? esta utilidad se usa cuando hacemos un login y recibimos la pass del usuario
    //? y la comparamos con la que tenemos con la de DB
    return bcrypt.compareSync(plainPassword, hashedPassword)
}

// console.log(comparePassword('root','$2b$10$TaMKMcDKioEx9X17c.56e.UZrK1Vds.g0wBXqhuGAUB2AqytvL.Vu'))

module.exports={
    hashPassword,
    comparePassword
}