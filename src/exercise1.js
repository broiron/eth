
console.log("Block Number:", eth.blockNumber);
console.log( admin.nodeInfo['enode']);
console.log("Number of Peers:", net.peerCount);

if (net.peerCount!=0){
	console.log("Peers Info:\n", admin.peers);
}

console.log("Accounts:", eth.accounts);

for (var i=0;  i < eth.accounts.length; i++){
	var bal = eth.getBalance(eth.accounts[i]);
	console.log('Balance',i,':',web3.fromWei(bal, "ether"), '(ether)');
}

console.log("Changing Coinbase");
console.log("Before:", eth.coinbase);
miner.setEtherbase(eth.accounts[1]);
console.log("After:", eth.coinbase);

console.log("Number of Pendning Transaction:", txpool.status['pending']);
if (txpool.status['pending'] == 0){
	console.log(JSON.stringify(txpool.inspect));
	console.log("Status: There are no trasactions in Transaction pool"); 
}

console.log("Block Number:", eth.blockNumber);
console.log("마이닝이나 transaction이 없었으므로 block number는 변함이 없다.");
