const express = require('express')
const bodyParser = require('body-parser')
const app = express()

// ajout de socket.io
const server = require('http').Server(app)
const io = require('socket.io')(server)

var users = []
var messages = []

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:true}))
app.use(express.static('public'))
app.get('/', function (req, res) {
   res.sendFile('/views/index.html', { root: __dirname })
})

app.get('/json', function (req, res) {
   res.status(200).json({"message":"ok"})
})

io.on('connection', (socket) =>{
   console.log(`Connecté au client ${socket.id}`)
   // émission d'un évènement
    var msg= {id:socket.id,user:"ADMIN",message:"Une personne viens de se connecter"}
    messages.push(msg)
   io.emit('MESSAGE',msg)
  
  
  socket.on('SEND_MESSAGE', function(data) {
    messages.push(data)
        io.emit('MESSAGE', data)
    });
})

// on change app par server
server.listen(3000, function () {
 console.log('Votre app est disponible sur localhost:3000 !')
})