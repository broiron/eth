// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
//import "https://github.com/OpenZeppelin/openzeppelin-contracts/blob/v4.4.0/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
//import "https://github.com/OpenZeppelin/openzeppelin-contracts/blob/v4.4.0/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
//import "https://github.com/nibbstack/erc721/blob/2.6.1/src/contracts/ownership/ownable.sol";

contract MyNFT is ERC721URIStorage, Ownable {
    using Counters for Counters.Counter; 
	
    Counters.Counter private _tokenIds;	//NFT id

    constructor() ERC721 ("Hello DApp Screens", "JSL") {}

    struct Item {
        address ownerAdd;
        address nowOwnerAdd;
        uint256 price;
        string tokenURI;
        uint256 time;
    }
    Item[] Items;
    mapping(uint256 => Item) public tokenIdToItem;

    function mintWithURI(address to, string memory tokenURI) public returns(uint256)
    {
        _tokenIds.increment();
        uint256 newTokenId = _tokenIds.current();
        _mint(to, newTokenId);
        _setTokenURI(newTokenId, tokenURI);
        return newTokenId;
    }
    function mintWithIdURI(uint256 _id, address to, string memory tokenURI) public returns(uint256)
    {
        _mint(to, _id);
        _setTokenURI(_id, tokenURI);
        return _id;
    }
    function myTransfer(address from, address to, uint256 _tokenId) public
    {
        transferFrom(from, to, _tokenId);
    }
    function setTokenIdToItem(uint256 _id, address _o, address _to, uint256 _p, string memory _uri, uint256 _t) public
    {
        tokenIdToItem[_id].ownerAdd = _o;
        tokenIdToItem[_id].nowOwnerAdd = _to;
        tokenIdToItem[_id].price = _p;
        tokenIdToItem[_id].tokenURI = _uri;
        tokenIdToItem[_id].time = _t;
        Items.push(tokenIdToItem[_id]);
    }
    function getTokenIdToItem(uint256 tokenId) public view returns (address, address, uint256, string memory, uint256)
    {
        return (tokenIdToItem[tokenId].ownerAdd, tokenIdToItem[tokenId].nowOwnerAdd, tokenIdToItem[tokenId].price, tokenIdToItem[tokenId].tokenURI, tokenIdToItem[tokenId].time);
    }

    function getItemLength() public view returns (uint256)
    {
        return Items.length;
    }
    function getOwner() view public returns(address) {
        return owner();
    }

    function getTokenURI(uint256 tokenId) view public returns(string memory)
    {
        return tokenIdToItem[tokenId].tokenURI;
    }

    function getTotalSupply() view public returns (uint256 tokenId) {
        return _tokenIds.current();
    }
}
