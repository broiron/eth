var Web3 = require('web3');
var _abiBinJson = require('./MyNFT.json');      //importing a javascript file

var web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8345"));

contractName=Object.keys(_abiBinJson.contracts);
//console.log(contractName);
console.log(contractName[13]);
_abiArray=_abiBinJson.contracts[contractName[12]].abi;
_bin="0x"+_abiBinJson.contracts[contractName[12]].bin;
async function deploy() {
    const accounts = await web3.eth.getAccounts();
    console.log("Deploying the contract from " + accounts[0]);
    var deployed = await new web3.eth.Contract(_abiArray)
        .deploy({data: _bin})
        .send({from: accounts[0], gas: 3800000}, function(err, transactionHash) {
                if(!err) console.log("hash: " + transactionHash); 
        })
        //.then(function(newContractInstance){
        //    console.log(newContractInstance)
        //});
    console.log("(7) solution")
    console.log("---> The contract deployed to: " + deployed.options.address)
}
deploy()
