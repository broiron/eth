
var Web3 = require('web3');
var web3 = new Web3("http://localhost:8345");
var balance;
async function getInfo() {
    accounts = await web3.eth.getAccounts();
    account0 = accounts[0];
    account1 = accounts[1];
    console.log("ac0:",account0, "ac1:",account1)
    
    balance0 = await web3.eth.getBalance(account0);
    balance1 = await web3.eth.getBalance(account1);
    console.log("bal of ac0:",balance0, "ac1:",balance1);


    await web3.eth.personal.sendTransaction({from:account0, to:account1, value:"1111"}).then(function(err, Resolved) {
        console.log("callback-sending ac0 -> ac1");});
    
    tx = await web3.eth.getTransaction("0x9baccb0e64f1b6ae9b05610ae83f535a128511e6907176f1f86ae3d2ff059ebf");
    console.log("transactionHash:",tx.hash);
    
    gasPrice = tx.gasPrice;
    gasCost = tx.gas;
    
    totalGas = gasPrice*gasCost;
    console.log("gas costs:",totalGas);
    
    console.log("nonce:",tx.nonce);
    
    balance0_ = await web3.eth.getBalance(account0);
    balance1_ = await web3.eth.getBalance(account1);
    
    diff1 = parseInt(balance0_) - parseInt(balance0);
    diff2 = parseInt(balance1_) - parseInt(balance1);
    console.log("bal diff1:",diff1, "bal diff2:",diff2);
    
    var sum=0;
    for (var i=0; i<10; i++) {
        sum = sum + parseInt(await web3.eth.getBalance(accounts[i]));
        console.log("sum:",i,"adding",i,"bal:",sum);
    }
    
    console.log("balance total:",sum);
         
}
getInfo()

