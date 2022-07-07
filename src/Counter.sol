pragma solidity ^0.8.0;
contract Counter {
    uint256 counter = 0;
    uint256 startTime;
    function add() public {
        counter++;
    }
    function subtract() public {
        counter--;
    }
    function getCounter() public view returns (uint256) {
        return counter;
    }

    function setTimeCalled() public {
        startTime=block.timestamp;
    }

    function getTimeCalled() view public returns(uint256) {
        return block.timestamp;
    }

}
