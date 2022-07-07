var Web3 = require('web3');
var web3 = new Web3("http://localhost:8345");
var account
var balance;
async function weiToEther() {
    accounts = await web3.eth.getAccounts();
    account = accounts[0];
    balance = await web3.eth.getBalance(account);
    ethbal = web3.utils.fromWei(balance, 'ether');
    console.log("Balance: "+ethbal+"/ether");
}
weiToEther()
