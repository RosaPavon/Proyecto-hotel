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
                        req.app.locals.db.collection("habitaciones").updateOne({ room: req.body.room },{$set: {
                             estado: "ocupada" 
                           },
                         },
                         function (error, datos) {
                           if (error !== null) {
                             console.log(error);
                             res.send({ mensaje: "Ha habido un error" + error });
                           } else {//si no creamos ahora un if no damos feedback al usuario si no encontramos al usuario en la base
                             if(datos.matcheCount !=1 ){
                             if(datos.modifiedCount==1){
                               res.send({error:false, mensaje:"Habitación"})
                     
                             }else{
                               res.send({error:false, mensaje:"no se ha podido actualizar"})
                     
                             }
                           }else{
                             res.send({error:false, mensaje:"habitación no encontrado"})
                           }
                           }
                         }
                       );
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