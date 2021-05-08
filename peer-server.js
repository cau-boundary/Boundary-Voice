const PeerServer = require('peer').PeerServer;

const server = PeerServer({
    port: 443,
    path: '/media-chat',
    ssl: {
        key: fs.readFileSync('/etc/letsencrypt/live/homesweethome.cf/privkey.pem'),
        cert: fs.readFileSync('/etc/letsencrypt/live/homesweethome.cf/cert.pem'),
        ca: fs.readFileSync('/etc/letsencrypt/live/homesweethome.cf/chain.pem'),
    }
});