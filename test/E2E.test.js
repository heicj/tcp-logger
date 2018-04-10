const assert = require('assert');
const fs = require('fs');
const app = require('../lib/app');
const net = require('net');
const clients = require('../lib/Client');
const logger = require('../lib/logger/Logger');

describe('tests E2E', () => {

    const clientLogFile = './test/client-log-file.txt';
    const clientExpectedLog = './test/client-expected-log.txt';
    const PORT = 15678;
    // const server = app.createServer(clientLogFile);
    // let logger;


    beforeEach(done => {
        // logger = new Logger(testLogFile);  
       
        app.listen(PORT, done);
    });

    let client1 = null;
    beforeEach(done => {
        client1 = net.connect(PORT, () => {
            client1.setEncoding('utf8');
            done();
        });
    });

    afterEach(() => {
        client1.destroy();
        fs.truncate(clientLogFile, 0, function(){ console.log('done'); }); /*eslint-disable-line */
        app.close();
    });

    it.skip('client writes message to log file', (done)=> {
        const message = 'Client message';
        client1.write(message, () => {
            const expectedMessage = fs.readFileSync(clientExpectedLog, 'utf8').split(' ** ')[1].trim('\n');
            const clientLog = fs.readFileSync(clientLogFile, 'utf8').split(' ** ')[1].trim('\n');
            assert.equal(expectedMessage, clientLog);
            done();
        });
    });
    
});