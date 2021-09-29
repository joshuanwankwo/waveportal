// SPDX-License-Identifier: UNLICENSED

pragma solidity ^0.8.0;

import "hardhat/console.sol";

contract WavePortal{
    uint256 totalWaves;

    uint256 private seed;


    constructor() payable {
        console.log("Contract is now smart!");
    }

    mapping (address => uint256) public lastWavedAt;

    event NewWave(address indexed from, uint256 timeStamp, string message);

    struct Wave{
        address waiver;
        uint256 timeStamp;
        string message;
    }


    Wave[] waves;

    function wave (string memory _message) public {

        require(lastWavedAt[msg.sender] + 10 seconds < block.timestamp, "Must wait for 10 seconds before waiving again");

        lastWavedAt[msg.sender] =block.timestamp;

        totalWaves += 1;
        console.log("%s just waved at judicodes!", msg.sender);

        waves.push(Wave(msg.sender, block.timestamp,  _message));

        uint randomNumber = (block.difficulty + block.timestamp + seed) % 100;
        console.log("Random number generated %s:", randomNumber );

        seed = randomNumber;

        if(randomNumber < 50 ){
            console.log("%s won!", msg.sender);

        uint256 prizeAmount = 0.0001 ether;
        require(prizeAmount <= address(this).balance, "Insuficient balance");
        (bool success, ) = (msg.sender).call{value: prizeAmount}("");
        require(success, "failed to withdraw money from wallet");
        }

        emit NewWave(msg.sender, block.timestamp, _message);


    }

    function getAllWaves() public view returns (Wave[] memory){
        return waves;
    }

    function getTotalWaves() view public returns (uint256){
        console.log("We have %d total waves!", totalWaves);
        return totalWaves;
    }
}