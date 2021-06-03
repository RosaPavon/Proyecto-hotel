const express = require("express");
const router = express.Router();

// /clientes
router.get("/buscar/:dni", function (req, res) {
  req.app.locals.db.collection("clientes").find({ dni: `${req.params.dni}`  })
    .toArray(function (error, datos) {
      if(datos.length !==0){
        res.send({ error: false, contenido: datos  })
      }else{
        res.send({ error: true, mensaje:"usuario no encontrado"});
      }
      
    });
});

router.post("/", function (req, res) {
  let db = req.app.locals.db;
  db.collection("clientes")
    .find({ dni: req.body.dni })
    .toArray(function (err, data) {
      if (err) {
        res.send({ err: true, contenido: err });
      } else {
        if (data.length == 0) {
          req.app.locals.db
            .collection("clientes")
            .insertOne(req.body, function (err, data) {
              err
                ? res.send({ err: true, contenido: err })
                : res.send({
                    err: false,
                    contenido: {
                      respuesta: data,
                      mensaje: "Usuario registrado correctamente",
                    },
                  });
            });
        } else {
          res.send({
            error: false,
            contenido: { mensaje: "Usuario ya registrado" },
          });

          };
        }
      }
    );
});


router.put("/editar", function (req, res) {
  let db= req.app.locals.db
   db.collection("clientes").updateOne({ dni: req.body.dni },{$set: {
        nombre: req.body.nombre,
        apellido: req.body.apellido,   
      },
    },
    function (error, datos) {
      if (error !== null) {
        console.log(error);
        res.send({ mensaje: "Ha habido un error" + error });
      } else {//si no creamos ahora un if no damos feedback al usuario si no encontramos al usuario en la base
        if(datos.matcheCount !=1 ){
        if(datos.modifiedCount==1){
          res.send({error:false, mensaje:"Usuario actualizado"})

        }else{
          res.send({error:false, mensaje:"no se ha podido actualizar"})

        }
      }else{
        res.send({error:false, mensaje:"Usuario no encontrado"})
      }
      }
    }
  );
});

router.delete("/borrar", function (req, res) {
  let db= req.app.locals.db
   db.collection("clientes").deleteOne({ dni: req.body.dni },
    function (error, datos) {
      if (error !== null) {
        console.log(error);
        res.send({ mensaje: "Ha habido un error" + error });
      } else {//si no creamos ahora un if no damos feedback al usuario si no encontramos al usuario en la base
        if(datos.matcheCount !=1 ){
        if(datos.modifiedCount==1){
          res.send({error:false, mensaje:"Usuario borrado"})

        }else{
          res.send({error:false, mensaje:"no se ha podido borrado"})

        }
      }else{
        res.send({error:false, mensaje:"Usuario no encontrado"})
      }
      }
    }
  );
});




module.exports = router;