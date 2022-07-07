my=[]
var Web3 = require('web3');
var web3 = new Web3("http://localhost:8345");
var val  = web3.utils.toWei('1', 'ether');
var Web3 = require('web3');
var balance;
async function getBalance() {
    accounts = await web3.eth.getAccounts();
    account = accounts[0];
    balance = await web3.eth.getBalance(account);
    console.log("Balance: "+balance);
}
getBalance()
async function Transac() {
    accounts = await web3.eth.getAccounts();
    account = accounts[0];
    web3.eth.personal.sendTransaction({from:account, to:"0xbc3995a91ef543781cd777de3b192acbc03a74a0", value:val});
}
Transac()
