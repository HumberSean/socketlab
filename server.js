//LAB 3 - SOCKET CHAT
const app = require('express')();
const http = require('http').createServer(app);
const io = require('socket.io')(http);

app.get('/', function(req, res){
	res.sendFile(__dirname + '/index-SOLVED.html');
});

//====SOCKET FUNCTIONALITY========
io.on('connection', function(socket){
	console.log('A user connected');
	
	socket.on('chat message', function(msgObj){
		console.log('msg sent');
		io.emit('chat message', msgObj);
	});
	
	socket.on('add user', function(newUser){
		console.log('Welcome ' + newUser);
		io.emit('add user', newUser);
	});

	socket.on('end chat', function(uID) {
		io.emit('end chat', uID);
	});

	socket.on('disconnect', function(){
		console.log('A user disconnected');
	});
});//END OF SOCKET SERVER LISTENER


//SET SERVER LISTENING
http.listen(process.env.PORT ||3000, function(){
	console.log('Waiting for visitors!');
});