//SPDX-License-Identifier: GPL-3.0-or-later
pragma solidity ^0.8.0;

contract Bank {
    address owner;
    uint balance;
    
    event PrintLog(address from, uint amount);
    constructor() {
        owner = msg.sender;
        balance = 0;
    }
    receive() external payable {}
    fallback() external payable {
        emit PrintLog(msg.sender, msg.value);
    }
    function deposit(uint amount) public payable  {
        require(amount==msg.value);
        balance += amount;
    }
    function withdrawAll() public {
        balance -= address(this).balance;
        payable(msg.sender).transfer(address(this).balance);
    }
    function getBalance() public view returns(uint, uint) {
        return (balance, address(this).balance);
    }
    function forwardTo(address payable _receiver) public payable  {
        require(msg.sender == owner);
        _receiver.transfer(msg.value);
    }    
}
