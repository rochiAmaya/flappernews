exports.config = {
    framework: 'mocha',
    mochaOpts: {
        timeout: 30000
    },
    seleniumAddress: 'http://localhost:4444/wd/hub',
    specs: [
        //ACA van los archivos que quiero q se corran con protractor.
        'tests/e2e/login.test.js'

    ]
};