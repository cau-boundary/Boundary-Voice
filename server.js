const fs = require('fs')
const https = require('https');
const next = require("next");
const port = parseInt(process.env.PORT, 10) || 3000;
const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });
const handle = app.getRequestHandler();
const express = require("express");
const { ExpressPeerServer } = require('peer');


// option for https server certificates
const options = {
	key: fs.readFileSync('/etc/letsencrypt/live/homesweethome.cf/privkey.pem'),
	cert: fs.readFileSync('/etc/letsencrypt/live/homesweethome.cf/cert.pem'),
	ca: fs.readFileSync('/etc/letsencrypt/live/homesweethome.cf/chain.pem'),
	requestCert: false,
	rejectUnauthorized: false,
}
// nextjs routing
app.prepare().then(() => {
	const expressApp = express();
	const server = https.createServer(options, expressApp);
	const io = require('socket.io')(server);


	let connected = [];
	const expressPeerServer = ExpressPeerServer(server,{
		allow_discovery: true,
		debug:true
	});

	// express + peerjs setting
	expressApp.use('/media-chat',expressPeerServer);


	// when user connected to peer server, save that id to connected array
	// this is for managing connected person
	expressPeerServer.on("connection", (id)=>{
		let idx = connected.indexOf(id);
		if(idx === -1){
			connected.push(id);
		}
	});
	expressPeerServer.on("disconnect", (id)=>{
		let idx = connected.indexOf(id);
	})

	// nextjs custom rendering
	expressApp.get("/", (req,res) => {
		return app.render(req, res, '/', req.query)
	});
	// nextjs custom rendering
	expressApp.all("*", (req,res) => {
		return handle(req, res)
	});

	// io connection for video/voice chat
	io.on('connection', socket => {
		socket.on('join-room', (roomId,userId)=>{
			socket.join(roomId);
			socket.broadcast.to(roomId).emit('user-connected',userId);
			socket.on('disconnect',()=>{
				socket.broadcast.to(roomId).emit('user-disconnected',userId);
			})
		})
	})
	// listen for secured http connection
	server.listen(port, () => {
		console.log(`> Https Server Ready`);
	});
});
