const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const db = require("./db.js")
// ajout de socket.io
const server = require('http').Server(app)
const io = require('socket.io')(server)



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
    db.messages.push(msg)
   io.emit('MESSAGE',msg)
  
  
  socket.on('SEND_MESSAGE', function(data) {
    db.messages.push(data)
        io.emit('MESSAGE', data)
    });
   socket.on('GET_MESSAGES', function(data) {
        io.emit('MSGS', {id:data,messages:db.messages})
    });
})

// on change app par server
server.listen(3000, function () {
 console.log('Votre app est disponible sur localhost:3000 !')
})