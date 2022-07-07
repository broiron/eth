loadScript('src/TCounterGeth.js')
contractName=Object.keys(_compiled.contracts)
_abi=JSON.parse(_compiled.contracts[contractName[0]].abi)
//_abi=JSON.parse(_compiled.contracts['src/Example.sol:Example'].abi)
var _contract=eth.contract(_abi);
var _address="";
var _instance=eth.contract(_abi).at(_address);
console.log(_instance.getCounter.call());
_instance.setTimeCalled.sendTransaction({from:eth.accounts[0]});
console.log(_instance.getTimeCalled.call());
_instance.add.sendTransaction({from:eth.accounts[0]});

console.log(_instance.getCounter.call());
console.log(_instance.getTimeCalled.call());

_instance.add.sendTransaction({from:eth.accounts[0]});

console.log(_instance.getCounter.call());
console.log(_instance.getTimeCalled.call());
