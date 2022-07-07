var Web3=require('web3');
var _abiBinJson = require('./Bank.json');      //importing a javascript file

//var web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8345"));
var web3 = new Web3(new Web3.providers.WebsocketProvider("ws://localhost:8345"));

contractName=Object.keys(_abiBinJson.contracts); // reading ['src/Bank.sol:Bank']
//console.log("- contract name: ", contractName); //or console.log(contractName[0]);
_abiArray=_abiBinJson.contracts[contractName].abi; //use just as read from file
//_abiArray=JSON.parse(JSON.stringify(_abi));
//_abiArray=JSON.parse(_abi);      //JSON parsing needed!!
//_bin=_abiBinJson.contracts[contractName].bin;
console.log("- ABI: " + _abiArray);
//console.log("- Bytecode: " + _bin);
var bank = new web3.eth.Contract(_abiArray,"0x5b9620b34e8a29953797fEAf0E4aAA53F9Af7047");

async function doIt() {
    const accounts = await web3.eth.getAccounts();
    console.log("Account: " + accounts[0]);
    const balanceBefore = await web3.eth.getBalance(accounts[0]);
    console.log("Account[0] Balance: " + balanceBefore);
    bank.methods.getBalance().call().then(function(bal) {
        console.log("Contract Balance:"+bal[0] + "   this.bal:"+bal[1]);
    });
    
    await bank.methods.deposit(11111).send({from: accounts[0], value:11111});
    await bank.methods.deposit(222).send({from: accounts[0], value:222});
    
    await bank.methods.getBalance().call().then(function(bal) {
        console.log("After Deposit, Contract balance:" + bal[0] + "  this.bal: " + bal[1]);
    });
    
    const account2BeforeBalance = await web3.eth.getBalance(accounts[1]);
    console.log("Balance before forwardTo: " + account2BeforeBalance);
    
    await bank.methods.forwardTo(accounts[1]).send({from: accounts[0], gas: 100000, value:333});
    bank.methods.getBalance().call().then(function(bal) {
        console.log("After ForwardTo, Contract balance:" + bal[0] + "  this.bal:" + bal[1]);
    });
    const account2Balance = await web3.eth.getBalance(accounts[1]);
    console.log("Balance Account[1]: " + account2Balance);
    
    await bank.methods.withdrawAll().send({from: accounts[0]});
    const balanceAfter = await web3.eth.getBalance(accounts[0]);
    console.log("Account[0] Balance after Withdraw: " + balanceAfter);
    
    await web3.eth.sendTransaction({from: accounts[0], to:"0x5b9620b34e8a29953797fEAf0E4aAA53F9Af7047", value:111});
    bank.methods.getBalance().call().then(function(bal) {
        console.log("After Fallback Contract balance:" + bal[0] + "  this.bal:" + bal[1]);
    })
    process.exit(1);
}
doIt()
