pragma solidity >=0.4.22 <0.9.0;

contract Test {
    function test(uint256 testNumber) external pure returns (uint256) {
        assembly {
            let _num := 4
            let _fmp := mload(0x40)
        }
        return testNumber;
    }
}
