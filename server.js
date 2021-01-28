const express = require('express')
const bodyParser = require('body-parser')
const app = express()
// ajout de socket.io
const server = require('http').Server(app)
const io = require('socket.io')(server)

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
  
   io.emit('NEWS',"Une personne viens de se connecter")
  
  
  socket.on('SEND_MESSAGE', function(data) {
    messages.push(data)
        io.emit('MESSAGE', data)
    });
   socket.on('GET_MESSAGES', function(data) {
        io.emit('MSGS', {id:data,messages:messages})
    });
})

// on change app par server
server.listen(3000, function () {
 console.log('Votre app est disponible sur localhost:3000 !')
})