var Web3=require('web3');
var fs = require('fs');
var _abiBinJson = require('./OrderEvent.json');      //importing a javascript file

var web3 = new Web3(new Web3.providers.WebsocketProvider("ws://localhost:8345"));
contractName=Object.keys(_abiBinJson.contracts); // reading ['src/OrderEvent.sol:OrderEvent']
//console.log("- contract name: ", contractName); //or console.log(contractName[0]);
_abiArray=_abiBinJson.contracts[contractName].abi; //use just as read from file
//_abiArray=JSON.parse(JSON.stringify(_abi));
//_abiArray=JSON.parse(_abi);      //JSON parsing needed!!
//_bin=_abiBinJson.contracts[contractName].bin;
console.log("- ABI: " + _abiArray);
//console.log("- Bytecode: " + _bin);
//var _test = new web3.eth.Contract(_abiArray,"0xb8Cf4A0104759636aB490CFc4ce56E6751a411F7");
//var event = _test.events.MyLog({fromBlock: 0}, function (error, result) {
//    if (!error) {
//        console.log("Event fired: " + JSON.stringify(result.returnValues));
//    }
//});

async function doIt() {
    var _order = new web3.eth.Contract(_abiArray, '0xb8Cf4A0104759636aB490CFc4ce56E6751a411F7');
    const accounts = await web3.eth.getAccounts();
    console.log("Account: " + accounts[0]);
    var event = _order.events.OrderLog({
            //filter: {_from: accounts[0], _value: [20,50]},
            filter: {_from: accounts[0], _value: 30},
            fromBlock: 'latest', toBlock: 'pending'
        }, function (error, result) {
        if (!error) {
            log = JSON.stringify(result.returnValues);
            //console.log("Event fired: " + JSON.stringify(result) + "\n---> " + JSON.stringify(result.returnValues));
            console.log("Event fired: " + log);
            fs.appendFile("src/OrderEvent.txt", log, "utf-8", function(e) {
                if(!e) {
                    console.log(">> Writing to file");
                    }
                });
            }
    });
    
    var value;
    const balanceBefore = await web3.eth.getBalance(accounts[0]);
    console.log("Balance before: " + balanceBefore);
    // this will fire an event
    my = await _order.methods.order("0x1111", 3, 100, "Hongji-dong Jongro-gu Seoul")
        .send({from: accounts[0], gas: 600000, value:300})
        //.then(function(my) {console.log("---> MyFunction called " + JSON.stringify(my.events.OrderLog.returnValues));});
    console.log("---> MyFunction called " + JSON.stringify(my.events.OrderLog.returnValues));
    // this will fire another event
    my = await _order.methods.order("0x1111", 5, 100, "Hongji-dong Jongro-gu Seoul")
        .send({from: accounts[0], gas: 600000, value:500});
    console.log("---> MyFunction called " + JSON.stringify(my.events.OrderLog.returnValues));
    // this will NOT fire another event
    my = await _order.methods.order("0x1111", 20, 100, "Hongji-dong Jongro-gu Seoul")
        .send({from: accounts[0], gas: 600000, value:2000});
    console.log("---> MyFunction called " + JSON.stringify(my.events.OrderLog.returnValues));
    const balanceAfter = await web3.eth.getBalance(accounts[0]);
    console.log("Balance after: " + balanceAfter);
    console.log("Balance diff: " + (balanceBefore - balanceAfter));
    
    _order.methods.getBalance().call().then(function(err, bal) {
        if(!err) {
            console.log("Contract Balance:" +bal[0] + "    this.bal:"+bal[1]);
        
        }
    });
    
    process.exit(1); //force exit to disconnect websocket
}

doIt()
