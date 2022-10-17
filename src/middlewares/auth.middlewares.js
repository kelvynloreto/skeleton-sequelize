//? Middleware para proteger rutas 

//* 1- Revisar si existe un token
//* 2- Verificar si el token pertenece a un usuario valido
//* 3- Modificar el req y agregar el req.user con la infomacion desencriptada del token

//! estrategia: diferentes maneras de hacer un logibn ( con facebook , google, JWT m github ...)


const { jwtSecret } = require('../config');
const { getUserById } = require('../users/users.controllers');

const JwtStrategy = require('passport-jwt').Strategy; 
//? Passport maneja estrategias para las diferentes autenticaciones

const ExtractJwt = require('passport-jwt').ExtractJwt; 
//? extrae los header de la peticion


//? exportando funcion anonima 

module.exports= (passport) => {
    const options ={
        jwtFromRequest: ExtractJwt.fromAuthHeaderWithScheme('jwt'),
        secretOrKey: jwtSecret
    }
    passport.use(
        new JwtStrategy(options ,async ( decoded, done)=>{
            //? done(error , decoded)
            try {
                const  response = await getUserById(decoded.id)
            if (!response) {
                return done(null, false)
            }
            console.log('decoded JWT' , decoded)
            return done(null, decoded)
            } catch (err) {
                return done(err, false)
            }
        })
    )
}
