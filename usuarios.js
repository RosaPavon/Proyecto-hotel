const express = require("express");
const bcrypt = require("bcrypt")
const router = express.Router();

// /Usuarios
router.post("/registro", function(req, res) {
    let username = req.body.username;
    let password = req.body.password;
    let contraseinaCifrada = bcrypt.hashSync( password, 10 );
   
    req.app.locals.db.collection("usuarios").insertOne({username: username, password:contraseinaCifrada}, function(err, result){
       if(err !== null){
         res.send({mensaje: "Error al registrar el usuario"} )
       }else{
         res.send({mensaje: "Usuario registrado correctamente"})
       }
     })
   })

module.exports = router;