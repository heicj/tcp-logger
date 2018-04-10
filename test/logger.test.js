const assert = require('assert');
const fs = require('fs');
const { promisify } = require('util');
const unlink = promisify(require('fs').unlink);
const Logger = require('../lib/logger/Logger');

describe('Logger class', () => {
    let logger;
    const testLogFile = './test/logger-test-log.txt';
    const testExpectedFile = './test/logger-expected-test.txt';

    beforeEach(() => {
        logger = new Logger(testLogFile);  
        unlink(testLogFile)
            .catch(err => {
                if(err.code !== 'ENOENT') throw err; 
            });  
    });

    after(() => {
        unlink(testLogFile)
            .catch(err => {
                if(err.code !== 'ENOENT') throw err; 
            }); 
    });

    it('logs message to file given', () => {
        const message = 'Hello World';
        logger.log(message);
        const expected = fs.readFileSync(testExpectedFile);
        assert.ok(expected);
    });
});