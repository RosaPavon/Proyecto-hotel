const express = require("express");
const router = express.Router();

// /Checkin

router.post("/checkin", function (req, res) {
        req.app.locals.db.collection("habitaciones").find({room:req.body.room}).toArray(function (err, data){
            if(err){
              res.send({err:true, contenido:err})
            }else{
              if(data.length >=1){//aqui es si ha encontrado la habitacion
                if(data[0].estado =="libre"){
                    req.app.locals.db.collection("reservas").insertOne({
                        dni: req.body.dni,
                        room: req.body.room,
                        in: req.body.in,
                        estado: "ocupada"
                    }, 
                        function(err, result){
                       if(err !== null){
                         res.send({mensaje: "Error al registrar la reserva"} )
                       }else{
                         res.send({contenido:data, mensaje: "Reserva realizada"})
                       }
                     })
                   
  
                }else{
                  res.send({err:false, contenido:{mensaje: "habitacion ocupada", respuesta: data}})
                }
              }else{
                res.send({err:false, contenido:{mensaje: "habitacion no existente", respuesta: data}})
              }
            }
          })
   
  })

module.exports = router;