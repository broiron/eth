var doPromise = new Promise(function(myResolve, myReject) {
    myResolve(123); // 함수가 성공적으로 구현되면 123을 return
    myReject("Rejected"); // Error나면 rejected를 return
});

doPromise.then(function(my){
        console.log("RETURNED: "+my); // 성공일 경우
    }, function(err) {
        console.log("ERROR: "+err); // 실패일 경우
    });
