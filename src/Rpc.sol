//SPDX-License-Identifier: GPL-3.0-or-later
pragma solidity ^0.8.0;

contract A {
    string Athing;
    constructor() { }
    receive() external payable {}
    fallback() external payable {}
    function getBalance() public view returns(uint) {
        return (address(this).balance);
    }
    function setAthing(string memory s) public {
        Athing = s;
    }
    function getAthing() public view returns(string memory) {
        return(Athing);
    }
}

contract B {
    string Bthing;
    constructor() { }
    receive() external payable {}
    fallback() external payable {}
    function getBalance() public view returns(uint) {
        return (address(this).balance);
    }
    function setBthing(string memory s) public {
        Bthing = s;
    }
    function getBthing() public view returns(string memory) {
        return(Bthing);
    }
}
contract Rpc {
    
    mapping (uint => string) private rpc;
    uint balance;
    string res;
    address owner;
    A a1 = new A();
    B b1 = new B();

    event Show(address _address);
    event PrintLog(string str);
    constructor() payable {
        owner = msg.sender;
        balance = 0;
        rpc[0] = "rock";
        rpc[1] = "scissors";
        rpc[2] = "paper";
    }   

    fallback () external {
        emit PrintLog("fallback called");
    }

    function deposit(uint amount) public payable  {
        require(amount==msg.value);
        balance += amount;
    }
    // 베팅 = deposit

    function setA() public payable {
        require(msg.value == 1000);
        a1.setAthing(rpc[uint8(uint256(keccak256(abi.encodePacked(block.timestamp, block.difficulty)))%3)]);
        balance += msg.value;
        emit Show(address(a1));
    }

    function setB(uint num) public payable {
        require(msg.value == 1000);
        b1.setBthing(rpc[num]);
        balance += msg.value;
        emit Show(address(b1));

    }

    function play() public payable {
        string memory Athing = a1.getAthing();
        string memory Bthing = b1.getBthing();
        address a1add = address(a1);
        address b1add = address(b1);
        
        if (keccak256(bytes(Athing)) == keccak256(bytes(Bthing))) {
            res = "tie";
            require(address(this).balance >= 2000);
            payable(a1add).transfer(1000);
            payable(b1add).transfer(1000);
            balance -= 2000;

       
        }
      
        else if ( (keccak256(bytes(Athing)) == keccak256(bytes(rpc[0])) && keccak256(bytes(Bthing)) == keccak256(bytes(rpc[1]))) 
        || 
        ( keccak256(bytes(Athing)) == keccak256(bytes(rpc[1])) && keccak256(bytes(Bthing)) == keccak256(bytes(rpc[2]))) 
        || 
        ( keccak256(bytes(Athing)) == keccak256(bytes(rpc[2])) && keccak256(bytes(Bthing)) == keccak256(bytes(rpc[0])))) {
            res = "A wins";
            require(address(this).balance >= 2000);
            payable(a1add).transfer(address(this).balance);
            balance -= 2000;

        }

        else {
            res = "B wins";
            require(address(this).balance >= 2000);
            payable(b1add).transfer(address(this).balance);
            balance -= 2000;


        }
    }

    function getMatchResult() public view returns (string memory) {
        return res;
    }

    function getBalance() public view returns(uint, uint) {
        return (balance, address(this).balance);
    }

    function getABalance() public view returns(uint) {
        return a1.getBalance();
    }
    function getBbalance() public view returns(uint) {
        return b1.getBalance();
    }
    function sendA() public payable {
        payable(address(a1)).transfer(1000);
    }
}
