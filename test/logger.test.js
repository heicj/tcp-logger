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
        fs.truncate(testLogFile, 0, function(){ console.log('done'); }); /*eslint-disable-line */
    });

    it('logs message to file given', () => {
        const message = 'Hello World';
        logger.log(message);
        // logger.log(message);
        const expected = fs.readFileSync(testExpectedFile, 'utf8').split(' ** ')[1].trim('\n');
        const result = fs.readFileSync(testLogFile, 'utf8').split(' ** ')[1].trim('\n');
        assert.equal(result, expected);
    });
});