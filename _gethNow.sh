
_dir=./eth/
_log=./eth/my.log
geth --identity "broiron" \
--allow-insecure-unlock \
--http --http.addr "localhost" --http.port "8445" --http.corsdomain "*" \
--datadir $_dir \
--port "38445" \
--http.api "admin,db,eth,debug,miner,net,shh,txpool,personal,web3" \
--networkid 33 
