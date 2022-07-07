var Web3 = require('web3');
var web3 = new Web3("http://localhost:8345");
var coinbase;
async function getCoinbase() {
    cb = await web3.eth.getCoinbase();
    coinbase = cb;
    console.log("coinbase: "+coinbase);
}
getCoinbase()
