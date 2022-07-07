var Web3 = require('web3');
var web3 = new Web3("http://localhost:8345");
var balance;
async function getBalance() {
    accounts = await web3.eth.getAccounts();
    account = accounts[0];
    balance = await web3.eth.getBalance(account);
    console.log("Balance: "+balance);
}
getBalance()
