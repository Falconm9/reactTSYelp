//run cors anywhere server
const corsProxy = require('cors-anywhere');

const PORT = 8080;

corsProxy.createServer({
    originWhitelist: [], // Allow all origins
    requireHeader: ['origin', 'x-requested-with'],
    removeHeaders: ['cookie', 'cookie2']
}).listen(PORT, function() {
    console.log('Running CORS Anywhere on:' + PORT);
});