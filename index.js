const express = require('express')
const app = express()
const http = require('http').Server(app)
const io = require('socket.io')(http)
const path = require('path')
const port = 3000

app.use(express.static(path.join(__dirname, 'public')))
.get('/', chatbox)
io.on('connection', users)
io.on('connection', messages)
http.listen(3000, function(){
  console.log(`Example app listening on port ${port}!`)})

function chatbox(req, res){
  res.sendFile(__dirname + '/public/index.html')
}

function users(socket){
  console.log('a user connected')
  socket.on('disconnect', function(){
    console.log('user disconnected')
  });
}

function messages(socket){
  socket.on('chat message', function(msg){
    io.emit('chat message', msg)
  })
}

function chatman(){
  io.emit('message', 'Hello');

}


// bot:
// if [certainWord] in message {
//   respond with "whatever sentence"
// }
