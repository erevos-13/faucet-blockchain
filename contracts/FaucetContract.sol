pragma solidity >=0.4.22 <0.9.0;



contract Faucet {
    // storage variables

    // uint public funds = 1000; // positive values only
    // int public counter = -10;

    // uint32 public test = 4294967295;
    
    // // funds [0x323423] = 500 

    // this is spacial function
    // it's called when you mkae a trancasion that doesn't specify function name to call

    // Exteranl function are part of the contract interaface 
    // which means they can be called via contract and other trancstion 

    receive() external payable {}

}

