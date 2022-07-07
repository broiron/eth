
var Web3 = require('web3');
var _abiBinJson = require('./MyNFT.json');      //importing a javascript file

var web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8345"));

contractName=Object.keys(_abiBinJson.contracts);
_abiArray=_abiBinJson.contracts[contractName[12]].abi;
_bin="0x"+_abiBinJson.contracts[contractName[12]].bin;
var _nft = new web3.eth.Contract(_abiArray,"0x6590a509a4f1B93A1632BaF0F9CAf196cdb17EDA");
var event = _nft.events.Transfer({fromBlock: 0}, function (error, result) {
    if (!error) {
        console.log("Event fired: " + JSON.stringify(result.returnValues));
    }
});
async function doIt() {
    const accounts = await web3.eth.getAccounts();
    var addrFrom = accounts[0];
    var owner = await _nft.methods.getOwner().call();
    var addrTo = accounts[1];
    var uri1 = "https://ipfs.io/ipfs/QmWifTgpQQeDSvqPWNsMYRQbk33MzXUCjCx34XDsEP9yZY";
    var uri2 = "https://ipfs.io/ipfs/QmczZnAmTMDXrr5EREH9zdeoKAWsGTRzSFiC6nPNg642Fi"
    await _nft.methods.mintWithURI(addrTo,uri1).send({from: accounts[0], gas: 1000000});
    console.log("(8) minting from " + addrFrom + " to " + addrTo);
    await _nft.methods.mintWithURI(accounts[2],uri2).send({from: accounts[0],gas: 1000000});
    console.log("(9) minting from " + addrFrom + " to " + accounts[2]);
    
    //process.exit(1); //force exit
}
doIt()
