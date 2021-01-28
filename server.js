const express = require('express')
const bodyParser = require('body-parser')
const app = express()

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
   io.emit('news','Voici un nouvel élément envoyé par le serveur')
})

// on change app par server
server.listen(3000, function () {
 console.log('Votre app est disponible sur localhost:3000 !')
})