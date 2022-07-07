var Web3=require('web3');
var _abiBinJson = require('./ByteStringTest.json');      //importing a javascript file

var web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8345"));
contractName=Object.keys(_abiBinJson.contracts); // reading
//console.log("- contract name: ", contractName); //or console.log(contractName[0]);
_abi=_abiBinJson.contracts[contractName].abi;
_abiArray=JSON.parse(JSON.stringify(_abi));
//_abiArray=JSON.parse(_abi);      //JSON parsing needed!!
//_bin=_abiBinJson.contracts[contractName].bin;
//console.log("- ABI: " + _abiArray);
//console.log("- Bytecode: " + _bin);

var ByteString = new web3.eth.Contract(_abiArray,"0x32fa3f18fc5C53522AE945B866760E5F2B298F9B");

async function doIt() {
    const accounts = await web3.eth.getAccounts();
    console.log("Call from: " + accounts[0]);
    await ByteString.methods.getString().call().then(function(value) {console.log("MyString: ", value);});
    await ByteString.methods.getB1().call().then(function(value) {console.log("B1: ", value);});
    await ByteString.methods.getB2().call().then(function(value) {console.log("B2: ", value);});
    await ByteString.methods.getB23().call().then(function(value) {console.log("B23: ", value);});
    await ByteString.methods.getBytes().call().then(function(value) {console.log("Bytes: ", value);});
    await ByteString.methods.getLengOfBytes23().call().then(function(value) {console.log("Byte23 len: ", value);});
    await ByteString.methods.getLenOfBytes().call().then(function(value) {console.log("Byte len: ", value);});

    //await ByteString.methods.start().send({from:accounts[0],gas:100000});
}

doIt()
