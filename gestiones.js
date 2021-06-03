const express = require("express");
const router = express.Router();

// /Checkin

router.post("/checkin", function (req, res) {
        req.app.locals.db.collection("habitaciones").find({room:req.body.room}).toArray(function (err, data){
            if(err){
              res.send({err:true, contenido:err})
            }else{
              if(data.lenght ==1){//aqui es si ha encontrado la habitacion
                if(data[0].estado=="libre"){
                  req.app.locals.db.collection("reservas").insertOne({                  
                      dni: req.body.dni,
                      room: req.body.room,
                      in: req.body.in,
                      estado: "ocupada",  
                    
                  }),function(err,data){
                    if(err){
                      res.send({err:true, contenido:err})
                    }else{
                      res.send({err:false, contenido:{mensaje: "habitacion reservada", respuesta: data}})
                    }
                  }
  
                }else{
                  res.send({err:false, contenido:{mensaje: "habitacion ocupada", respuesta: data}})
                }
              }else{
                res.send({err:false, contenido:{mensaje: "habitacion no existente", respuesta: data}})
              }
            }
          })
   
  })

/*router.post("/checkin", function(req, res) {
  
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
         res.send({mensaje: "Reserva realizada"})
       }
     })
   })*/

module.exports = router;