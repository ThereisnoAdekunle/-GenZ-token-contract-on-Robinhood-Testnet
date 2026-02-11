// SPDX-License-Identifier: MIT
// Compatible with OpenZeppelin Contracts ^5.5.0
pragma solidity ^0.8.27;

import {ERC1363} from "@openzeppelin/contracts/token/ERC20/extensions/ERC1363.sol";
import {ERC20} from "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import {ERC20Burnable} from "@openzeppelin/contracts/token/ERC20/extensions/ERC20Burnable.sol";
import {ERC20FlashMint} from "@openzeppelin/contracts/token/ERC20/extensions/ERC20FlashMint.sol";
import {ERC20Permit} from "@openzeppelin/contracts/token/ERC20/extensions/ERC20Permit.sol";

contract GenerationZ is ERC20, ERC20Burnable, ERC1363, ERC20Permit, ERC20FlashMint {
    constructor(address recipient)
        ERC20("Generation Z", "GenZ")
        ERC20Permit("Generation Z")
    {
        _mint(recipient, 1000000000 * 10 ** decimals());
    }
}
