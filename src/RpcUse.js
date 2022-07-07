var Web3=require('web3');
var web3=new Web3(new Web3.providers.HttpProvider("http://localhost:8345"));
var fs=require('fs');
var _str = fs.readFileSync("src/Rpc.json");
var _json=JSON.parse(_str)
//var _abiArray=JSON.parse(_json.contracts.sHello2.abi);
//var _abiArray=JSON.parse(_json.contracts["src/Rpc.sol:Rpc"].abi);
var _abiArray=_json.contracts["src/Rpc.sol:Rpc"].abi;

var Rpc = new web3.eth.Contract(_abiArray, "0xAC31d726d15a028d9Ff6122D53E4f1aD7e7C8ba0");

async function doIt() {
    const accounts = await web3.eth.getAccounts();
    console.log("Account: " + accounts[0]);
    await Rpc.methods.setA().send({from: accounts[0],gas:600000, value:1000}, function(err) {
        console.log("setting A...");
    });
    // 0 = "rock", 1 = "scissors", 2 = "paper"
    await Rpc.methods.setB(0).send({from: accounts[0],gas:600000, value:1000}, function(err) {
        console.log("setting B...")
    });
    
    await Rpc.methods.play().send({from: accounts[0],gas:600000}, function(err) {
        console.log("Playing RPC...")
    })
    
    await Rpc.methods.getMatchResult().call().then(function(res) {
        console.log("Match Result: " + res)
    });
    
        
    await Rpc.methods.getABalance().call().then(function(res) {
        console.log("Balance of Contract A: " + res)
    });
    
    await Rpc.methods.getBbalance().call().then(function(res) {
        console.log("Balance of Contract B: " + res)
    });
    
    await Rpc.methods.getBalance().call().then(function(res) {
        console.log("Balance of Contract RPC: " + res[0] + " , " + res[1])
    });
    
}

doIt()
