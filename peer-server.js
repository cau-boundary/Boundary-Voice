const PeerServer = require('peer').PeerServer;

const server = PeerServer({
    port: 443,
    path: '/media-chat',
});