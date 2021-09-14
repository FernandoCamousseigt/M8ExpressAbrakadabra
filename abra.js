
//Para correr:
    //npm install express --save  
    //npm init (luego enter enter ... yes)
    //node abra.js
    //ir a browser y escribir http://localhost:3000

const express = require("express")    //Crea una instancia de Express con una constante 'express'
const app = express()   //Guarda en una constante “app” la ejecución de la instancia anterior


//método “listen” de la constante “app” para definir en el primer parámetro el puerto 3000 y como segundo parámetro, una función callback que imprima por consola que el servidor fue inicializado en el puerto 3000
app.listen(3000, () => {
  console.log("El servidor está inicializado en el puerto 3000. Escriba en browser localhost:3000")
})

// Middleware. Se especifica directorio y se hace 'publico'
app.use(express.static('assets'))

//Arreglo de usuarios
const usuarios = [
  "Juan",
  "Jocelyn",
  "Astrid",
  "Maria",
  "Ignacia",
  "Javier",
  "Brian"
];

//Muestra usuarios a traves de la ruta  /abracadabra/usuarios
app.get('/abracadabra/usuarios', (req, res) => {
  res.json(usuarios) //para devolverlo como json
  //o como res.send(usuarios)
})


//Middleware para la ruta /abracadabra/juego/:usuario para validar el usuario .ej http://localhost:3000/abracadabra/juego/Astrid o /jhonny
 app.use('/abracadabra/juego/:usuario', (req, res, next) => {  
  const usuarioIngresado = req.params.usuario                                  //params.usuario porque es /:usuario
  console.log(usuarioIngresado)
 //ej de .includes en https://www.w3schools.com/jsref/jsref_includes_array.asp
  const validacion = usuarios.includes(usuarioIngresado)     
  
  validacion
  ? next()                
  : res.sendFile(__dirname + '/assets/who.jpeg')  //en caso de fracaso muestra foto
})

  //en caso de exito
  app.get('/abracadabra/juego/:usuario', (req, res) => {
    res.sendFile(__dirname + '/index.html')
  }) 

app.get("/", (req, res) => {
  res.sendFile(__dirname + '/index.html')
})  

//Lo anterior también se puede realizar con if y else

//ruta /abracadabra/conejo/:n que valide si el parámetro “n” coincide con el número generado de forma aleatoria. En caso de ser exitoso, devolver la imagen del conejo, de lo contrario devolver la imagen de Voldemort
app.get('/abracadabra/conejo/:n', (req, res) => {
  const numAleatorio = Math.floor(Math.random() * (4-1)) +1
  const numParame = req.params.n

  numParame ==numAleatorio
  ? res.sendFile(__dirname + '/assets/conejito.jpg')
  : res.sendFile(__dirname + '/assets/voldemort.jpg')
})

//ruta generica
app.get("*", (req, res) => {
  res.send('Esta página no existe...')  //al consultar una ruta que no esté definida en el servidor
});