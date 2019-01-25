const axios = require('axios');
const crypto = require('crypto');
const config = require('./config.json');
const nonce = new Date() * 1000;

const validPrivateMethods = {
  balance:'balance',
  transactions:'user_transactions',
  openOrders: 'open_orders',
  lookupOrder: 'lookup_order',
  cancelOrder: 'cancel_order',
  buy: 'buy',
  sell: 'sell',
  btcDeposit: 'bitcoin_deposit_address',
  btcWithdraw: 'bitcoin_withdrawal',
  bchDeposit: 'bitcoincash_deposit_address',
  bchWithdraw: 'bitcoincash_withdrawal',
  btgDeposit: 'bitcoingold_deposit_address',
  btgWithdraw: 'bitcoingold_withdrawal',
  ltcDeposit: 'litecoin_deposit_address',
  ltcWithdraw: 'litecoin_withdrawal',
  ethDeposit: 'ether_deposit_address',
  ethWithdrawal: 'ether_withdrawal'
};

const validPublicMethods = {
  price: 'ticker',
  orderBook: 'order_book',
  recentTrades: 'transactions'
};

const messageSignature = () => {
  const hash = crypto.createHmac('sha256', config.secret).update(nonce + config.id + config.key);
  // const signature = crypto.createHmac('sha256', config.secret2).update(hash.digest());
  return hash.digest('hex')
}

const params = {
  key: config.key,
  nonce: nonce,
  signature: messageSignature()
};

const books = ['btc_cad', 'btc_usd', 'eth_cad', 'eth_usd', 'ltc_cad', 'ltc_btc', 'bch_cad', 'bch_btc', 'bsv_cad', 'btg_cad', 'btg_btc'];
const currencies = ['cad', 'usd', 'btc', 'ltc', 'bch', 'btg', 'eth'];


const merge = (obj1, obj2) => {
  Object.keys(obj2).forEach(function(key) { obj1[key] = obj2[key]; });
  return obj1;
};

const publicCall = async (call, options) => {
  if (Object.values(validPublicMethods).includes(call)) {
    let action = call === 'ticker' ? axios.post(config.url + call + '?book=' + options) : axios.post(config.url + call, options)
    try {
      let res = await action
      console.log(res.data)
    } catch (e) {
      console.log(e)
    }
  } else {
    console.log(`\n${call} is not a valid public method\n`)
    console.log('Available Public methods are:', Object.values(validPublicMethods))
  }
}

const privateCall = async (call, options) => {
  if (Object.values(validPrivateMethods).includes(call)) {
    try {
      let res = await axios.post(config.url + call, merge(params, options));
        console.log(res.data);
      } catch (e) {
        console.log(e)
      }
    } else {
      console.log(`\n${call} is not a valid Private method!\n`);
      console.log('Available Private methods are:', Object.values(validPrivateMethods))
    }
  }
  module.exports = {
    privateCall,
    publicCall
  };
