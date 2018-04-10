const net = require('net');
const Logger = require('./logger/Logger');
const Clients = require('./Clients');

const clients = new Clients();

const server = net.createServer(client /* client socket */ => {
    client.setEncoding('utf8');
    const logger = new Logger('./logger/logFile.js');

    clients.add(client);

    client.on('data', data => {
        logger.log(data);
    });

    client.on('close', () => {
        clients.remove(client);
    });

});

module.exports = server;