var Web3 = require('web3');
var _abiBinJson = require('./EventTest.json');

var web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8445"));

contractName = Object.keys(_abiBinJson.contracts);
console.log("- contract name: ", contractName);
_abi=_abiBinJson.contracts[contractName].abi;
_abiArray=JSON.parse(JSON.stringify(_abi));
_bin=_abiBinJson.contracts[contractName].bin;
web3.eth.personal.unlockAccount('0xbc3995a91ef543781cd777de3b192acbc03a74a0','mypark2030!');
async function deploy() {
    const accounts = await web3.eth.accounts;
}
