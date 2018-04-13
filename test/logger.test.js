const assert = require('assert');
const fs = require('fs');
const Logger = require('../lib/logger/Logger');

describe('Logger class', () => {
    let logger;
    const testLogFile = './test/logger-test-log.txt';
    const testExpectedFile = './test/logger-expected-test.txt';
    const testExpectedFile2 = './test/logger-expected-test2.txt';

    beforeEach(() => {
        logger = new Logger(testLogFile);  
        logger.log(message);
       
    });

    const message = 'Hello World';

    it('logs message to file given', () => {
        const expected = fs.readFileSync(testExpectedFile, 'utf8').split(' ** ')[1].trim('\n');
        setTimeout(() => {
            const result = fs.readFileSync(testLogFile, 'utf8').split(' ** ')[1].trim('\n');
            assert.equal(result, expected);
        }, 750);
    });

    it('checks two logs and date added to logs', () => {
        logger.log(message);

        const logOne = fs.readFileSync(testExpectedFile2, 'utf8').split('\n')[0];
        const logOneDate = logOne.split(' ** ')[0];
        const logOneMessage = logOne.split(' ** ')[1].trim('\r\n');
        
        const logTwo = fs.readFileSync(testExpectedFile2, 'utf8').split('\n')[1];
        const logTwoDate = logTwo.split(' ** ')[0];
        const logTwoMessage = logTwo.split(' ** ')[1].trim('\r\n');

        const d = new Date(logOneDate);
        const d2 = new Date(logTwoDate);

        assert.equal(isNaN(d.getTime()), false);
        assert.equal(isNaN(d2.getTime()), false);
        assert.equal(logOneMessage, message);
        assert.equal(logTwoMessage, message);
    });
});