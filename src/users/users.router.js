const router = require('express').Router();
const userServices = require('./users.services') 


//!para rutas protegidas
const passport = require('passport')
require('../middlewares/auth.middlewares')(passport)



//? Rutas Raiz 
router.get('/',userServices.getAllUsers)
// passport.authenticate('jwt',{session: false}) middlewares

//? ruta de informacion propia del usuario loggeado
router.route('/me')
.get(
    passport.authenticate('jwt',{session: false}),
    userServices.getMeUser
    )
.patch(
    passport.authenticate('jwt',{session: false}),
    userServices.patchMe
)
.delete(
    passport.authenticate('jwt',{session: false}),
    userServices.deleteMeUser
)


//* el register ira en la ruta /auth/register
//? Rutas dinamicas por ID

router.route('/:id')
.get(userServices.getUserById)
.patch(userServices.patchUser)
.delete(userServices.deleteUser)

//! router.get('/:id')
//! router.patch('/:id')
//! router.delete('/:id')
//! router.put('/:id')


module.exports= router;