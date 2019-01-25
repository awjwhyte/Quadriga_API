const axios = require('axios');
const client = require('./quadriga');

// client.privateCall('balance', {});
client.publicCall('transactions', {book: 'xbt_usd'})
