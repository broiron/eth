var Web3=require('web3');
var web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8345"));
//console.log("- contract name: ", contractName); //or console.log(contractName[0]);
_abiArray=[{"inputs":[],"name":"getXAge","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"getYAge","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"isMarried","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"int256","name":"age","type":"int256"}],"name":"setXAge","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"testInt","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"update","outputs":[],"stateMutability":"nonpayable","type":"function"}]
//_abiArray=JSON.parse(_abi);      //JSON parsing needed!!
_bin="608060405260016000806101000a81548160ff0219169083151502179055506016600155601960025534801561003457600080fd5b506102ae806100446000396000f3fe608060405234801561001057600080fd5b50600436106100615760003560e01c8062e5561d14610066578063148aa8d714610084578063a2e62045146100a0578063a702314d146100aa578063c23ef142146100c8578063f866375f146100e6575b600080fd5b61006e610104565b60405161007b9190610192565b60405180910390f35b61009e600480360381019061009991906101e8565b610130565b005b6100a861013a565b005b6100b261014d565b6040516100bf9190610192565b60405180910390f35b6100d0610163565b6040516100dd919061022e565b60405180910390f35b6100ee61016d565b6040516100fb919061022e565b60405180910390f35b600060146001541015801561011c5750601460025410155b61012957610128610249565b5b6001905090565b8060018190555050565b6002546001819055506021600281905550565b60008060009054906101000a900460ff16905090565b6000600254905090565b6000600154905090565b60008115159050919050565b61018c81610177565b82525050565b60006020820190506101a76000830184610183565b92915050565b600080fd5b6000819050919050565b6101c5816101b2565b81146101d057600080fd5b50565b6000813590506101e2816101bc565b92915050565b6000602082840312156101fe576101fd6101ad565b5b600061020c848285016101d3565b91505092915050565b6000819050919050565b61022881610215565b82525050565b6000602082019050610243600083018461021f565b92915050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052600160045260246000fdfea26469706673582212208a45a315cf85e07a9390ece48edcbe67fa938e7fd76154e9bca79cb9eae4946f64736f6c634300080c0033";
//console.log("- ABI: " + _abiArray);
//console.log("- Bytecode: " + _bin);

var IntBool = new web3.eth.Contract(_abiArray,"0xE3d1C3907659d2b020a8e031927Cb232caf4DaA6");

async function doIt() {
    const accounts = await web3.eth.getAccounts();
    console.log("Call from: " + accounts[0]);
    IntBool.methods.getXAge().call().then(function(value) {console.log("XAge: ", value);});
    IntBool.methods.getYAge().call().then(function(value) {console.log("YAge: ", value);});
    await IntBool.methods.setXAge(30).send({from:accounts[0],gas:100000})
    IntBool.methods.getXAge().call().then(function(value) {console.log("XAge: ", value);});
}

doIt()
