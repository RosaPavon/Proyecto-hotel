
let localClientes=[]


  function anyadir() {
  fetch("/clientes", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify({
  nombre: document.getElementById("nombre").value,
  apellido: document.getElementById("apellido").value,
  dni: document.getElementById("dni").value,  
  }),
})
  .then(res => res.json())
  .then(function(data){
    if (data.err) {
      feedback("Usuario ya registrado");
    }else{
      document.getElementById("feedback").innerHTML =`<p>Bienvenid@ a la AVENTURA ${document.getElementById("nombre").value}  ${document.getElementById("apellido").value},con Dni: ${document.getElementById("dni").value}      </p>`
    }
    })
}

function usuario() {
  fetch("/usuarios/registro", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify({
  username: document.getElementById("username").value,
  password: document.getElementById("password").value,
  }),
})
  .then(res => res.json())
  .then(function(data){
    if (data.err) {
      feedback("Usuario ya registrado");
    }else{
      document.getElementById("feedback").innerHTML =`<p>Usuario creado correctamente</p>`
    }
    })
}

function editar(indice) {
    document.getElementById("nombre").value = localClientes[indice].nombre;
    document.getElementById("apellido").value = localClientes[indice].apellido;
    document.getElementById("dni").value = localClientes[indice].dni;

  }
  
  function editarFinal() {
    fetch("/clientes/editar", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        nombre: document.getElementById("nombre").value,
        apellido: document.getElementById("apellido").value,
        dni: document.getElementById("dni").value,
         }),
    })
      .then((res) => res.json())
      .then(function (datos) {
        datos.modifiedCount !== 1
          ? document.getElementById("feedback").innerHTML =`<p>Usuario modificado ${document.getElementById("nombre").value}  ${document.getElementById("apellido").value},con Dni: ${document.getElementById("dni").value}      </p>`

          : document.getElementById("feedback").innerHTML ="<h3>Se ha producido un error</h3>";
      });
  }

  function borrar(indice) {
    fetch("/clientes/borrar", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
      dni: document.getElementById("dni").value,
    
      }),
    })
    .then(res => res.json())
    .then(function (datos) {
      datos.deletedCount >= 1
        ? imprimir(datos).localClientes=datos.contenido
        : feedback("Usuario eliminado correctamente")
        
    });
  }

  function buscar() {
    fetch(`/clientes/buscar/${document.getElementById("buscar").value}`)
    .then((res) => res.json())
    .then(function (datos) {
      if (datos.error) {
        feedback("Usuario no encontrado");
      } else {
        imprimir(datos);
      }
    });
  }

  function anyadirReserva() {
    fetch("/gestiones/checkin", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify({

  room:document.getElementById("room").value,
  dni: document.getElementById("buscar").value,
  in: document.getElementById("fechain").value,
  
  }),
})
  .then(res => res.json())
  .then(function(data){
    if (data.err) {
      feedback("Error al realizar la reserva");
  
    }else{
      document.getElementById("feedback").innerHTML =`<p>Reserva realizada oki doki</p>`
      console.log(data.contenido)
    }
    })
}


function imprimir(datos) {
 clientes = datos.contenido;
  let parrafo = "";
  for (let i = 0; i < datos.contenido.length; i++) {
    parrafo += `<p>${datos.contenido[i].nombre} ${datos.contenido[i].apellido},con DNI:${datos.contenido[i].dni}`;
  }
   document.getElementById("feedback").innerHTML = `<table>${parrafo}</table>`;

  }


function feedback(string) {
  document.getElementById("feedback").innerHTML = `<p><p>${string}</p></p>`;
}

