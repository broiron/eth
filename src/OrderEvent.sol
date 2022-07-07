//SPDX-License-Identifier: GPL-3.0-or-later
pragma solidity ^0.8.0;

contract OrderEvent {
    
    address owner;
    uint balance;
    uint unitPrice;
    bytes2 _itemId;
    string add; 

    //event OrderLog(string);
    event OrderLog(bytes2 _itemId, uint _value);
    //event OrderLog(uint256 timestamp);
    event OrderLog(address indexed _from, bytes2 _itemId, uint indexed quantity, uint indexed unitprice, string add);

    constructor() {
        owner = msg.sender;
        balance = 0;
    }

    function order(bytes2 _itemId_, uint quantity, uint unitPrice_, string memory add_) public payable {
        
        unitPrice = unitPrice_;
        add = add_;
        _itemId = _itemId_;

        //uint256 orderTime = block.timestamp;
        uint256 orderAmount = quantity * unitPrice;
        require(msg.value == orderAmount);
        balance += orderAmount;
        //emit OrderLog("Ordered");
        //emit OrderLog(orderTime);
        //주소, 상품항목번호, 주문개수, 단가, 배송지
        emit OrderLog(msg.sender, _itemId, quantity, unitPrice, add);
    }

    function getBalance() public view onlyOwner returns(uint, uint) {
        return (balance, address(this).balance);
    }
    
    modifier onlyOwner {
        require(msg.sender==owner);
        _;
    }
    

}
