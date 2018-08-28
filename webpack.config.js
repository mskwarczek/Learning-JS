const path = require('path');

module.exports = {
    entry: './js/src/app.js',
    output: {
        path: path.resolve(__dirname, './js/build'),
        filename: 'app.bundle.js'
    }
};