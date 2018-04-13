const assert = require('assert');
const fs = require('fs');
const app = require('../lib/app');
const net = require('net');

describe('tests E2E', () => {

    const clientLogFile = './test/client-log-file.txt';
    const clientExpectedLog = './test/client-expected-log.txt';
    const PORT = 15678;

    beforeEach(done => {
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
        app.close();
    });

    it('client writes message to log file', (done)=> {
        const message = 'Client message';
        client1.write(message, () => {
            const expectedMessage = fs.readFileSync(clientExpectedLog, 'utf8').split(' ** ')[1].trim('\n');
            const clientLog = fs.readFileSync(clientLogFile, 'utf8').split('\n')[0].split(' ** ')[1].trim('\n');
            assert.equal(expectedMessage, clientLog);
            done();
        });
    });
    
});