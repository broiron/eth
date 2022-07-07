var Web3 = require('web3');
var web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8345"));
var shelloContract = new web3.eth.Contract([{"inputs":[],"name":"sayHello","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"pure","type":"function"}],
                                      "0xB3cCB71Fd915498a1D9EaEbECB8da421899B3128");
shelloContract.methods.sayHello().call().then(function(str) {console.log(str);});
