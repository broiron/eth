var primary = eth.accounts[0];
console.log("primary ac: ",primary);
console.log("balance: ",eth.getBalance(primary));
loadScript('src/CounterGeth.js');
contractName=Object.keys(_compiled.contracts); // 
//_abi=JSON.parse(_compiled.contracts['src/Example.sol:Example'].abi)
//_bin=_compiled.contracts['src/Example.sol:Example'].bin
_abi=JSON.parse(_compiled.contracts[contractName[0]].abi)
_bin=_compiled.contracts[contractName[0]].bin

_class=eth.contract(_abi);
console.log('bin code: ', _bin)
//this async way does not work from the Jupyter Notebook
_object=_class.new({from:primary,data:'0x'+_bin,gas:1000000}, function(err, contract) {
  if (!err && contract.address)t
    console.log("contractAddress: ", contract.address);
    console.log("transactionHash: ", contract.transactionHash);
});
