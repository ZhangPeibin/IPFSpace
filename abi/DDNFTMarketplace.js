export const ABI = [
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "itemId",
                "type": "uint256"
            }
        ],
        "name": "addDownloadCount",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "itemId",
                "type": "uint256"
            }
        ],
        "name": "addViewCount",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "itemId",
                "type": "uint256"
            }
        ],
        "name": "cancelMarketItem",
        "outputs": [],
        "stateMutability": "payable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "itemId",
                "type": "uint256"
            },
            {
                "internalType": "uint256",
                "name": "price",
                "type": "uint256"
            }
        ],
        "name": "createMarketItem",
        "outputs": [],
        "stateMutability": "payable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "itemId",
                "type": "uint256"
            },
            {
                "internalType": "string",
                "name": "userIcon",
                "type": "string"
            },
            {
                "internalType": "string",
                "name": "userName",
                "type": "string"
            },
            {
                "internalType": "string",
                "name": "userWebSite",
                "type": "string"
            }
        ],
        "name": "createMarketSale",
        "outputs": [],
        "stateMutability": "payable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "string",
                "name": "userIcon",
                "type": "string"
            },
            {
                "internalType": "string",
                "name": "userName",
                "type": "string"
            },
            {
                "internalType": "string",
                "name": "userWebSite",
                "type": "string"
            },
            {
                "internalType": "string",
                "name": "srcCid",
                "type": "string"
            },
            {
                "internalType": "string",
                "name": "preCid",
                "type": "string"
            },
            {
                "internalType": "string",
                "name": "title",
                "type": "string"
            },
            {
                "internalType": "string",
                "name": "description",
                "type": "string"
            },
            {
                "internalType": "string",
                "name": "preFileType",
                "type": "string"
            },
            {
                "internalType": "string",
                "name": "iscnId",
                "type": "string"
            },
            {
                "internalType": "string",
                "name": "fileType",
                "type": "string"
            },
            {
                "internalType": "uint256",
                "name": "fileSize",
                "type": "uint256"
            }
        ],
        "name": "createNFT",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "itemId",
                "type": "uint256"
            },
            {
                "internalType": "bool",
                "name": "addToSharePool",
                "type": "bool"
            }
        ],
        "name": "createSharePoolItem",
        "outputs": [],
        "stateMutability": "payable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "nftContract",
                "type": "address"
            },
            {
                "internalType": "address",
                "name": "ddActiontract",
                "type": "address"
            }
        ],
        "stateMutability": "nonpayable",
        "type": "constructor"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": true,
                "internalType": "uint256",
                "name": "tokenId",
                "type": "uint256"
            }
        ],
        "name": "DDNFTCreated",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": true,
                "internalType": "uint256",
                "name": "itemId",
                "type": "uint256"
            },
            {
                "indexed": true,
                "internalType": "address",
                "name": "nftContract",
                "type": "address"
            },
            {
                "indexed": true,
                "internalType": "uint256",
                "name": "tokenId",
                "type": "uint256"
            },
            {
                "indexed": false,
                "internalType": "address",
                "name": "seller",
                "type": "address"
            },
            {
                "indexed": false,
                "internalType": "address",
                "name": "owner",
                "type": "address"
            },
            {
                "indexed": false,
                "internalType": "uint256",
                "name": "price",
                "type": "uint256"
            },
            {
                "indexed": false,
                "internalType": "bool",
                "name": "sold",
                "type": "bool"
            }
        ],
        "name": "MarketItemCreated",
        "type": "event"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "ddActiontract",
                "type": "address"
            }
        ],
        "name": "setDDActionContract",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "fetchItemsCreated",
        "outputs": [
            {
                "components": [
                    {
                        "internalType": "uint256",
                        "name": "itemId",
                        "type": "uint256"
                    },
                    {
                        "internalType": "address",
                        "name": "nftContract",
                        "type": "address"
                    },
                    {
                        "internalType": "uint256",
                        "name": "tokenId",
                        "type": "uint256"
                    },
                    {
                        "internalType": "address payable",
                        "name": "seller",
                        "type": "address"
                    },
                    {
                        "internalType": "address payable",
                        "name": "owner",
                        "type": "address"
                    },
                    {
                        "internalType": "address payable",
                        "name": "creator",
                        "type": "address"
                    },
                    {
                        "internalType": "string",
                        "name": "userIcon",
                        "type": "string"
                    },
                    {
                        "internalType": "string",
                        "name": "userName",
                        "type": "string"
                    },
                    {
                        "internalType": "string",
                        "name": "userWebSite",
                        "type": "string"
                    },
                    {
                        "internalType": "uint256",
                        "name": "price",
                        "type": "uint256"
                    },
                    {
                        "internalType": "bool",
                        "name": "sold",
                        "type": "bool"
                    },
                    {
                        "internalType": "string",
                        "name": "preCid",
                        "type": "string"
                    },
                    {
                        "internalType": "string",
                        "name": "title",
                        "type": "string"
                    },
                    {
                        "internalType": "string",
                        "name": "description",
                        "type": "string"
                    },
                    {
                        "internalType": "string",
                        "name": "filetype",
                        "type": "string"
                    },
                    {
                        "internalType": "bool",
                        "name": "onMarket",
                        "type": "bool"
                    },
                    {
                        "internalType": "bool",
                        "name": "onSharePool",
                        "type": "bool"
                    },
                    {
                        "internalType": "uint256",
                        "name": "likeNum",
                        "type": "uint256"
                    },
                    {
                        "internalType": "bool",
                        "name": "isMsgSenderLiked",
                        "type": "bool"
                    },
                    {
                        "internalType": "uint256",
                        "name": "viewCount",
                        "type": "uint256"
                    },
                    {
                        "internalType": "uint256",
                        "name": "downloadCount",
                        "type": "uint256"
                    }
                ],
                "internalType": "struct DDNFTMarket.MarketItem[]",
                "name": "",
                "type": "tuple[]"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "fetchMarketItems",
        "outputs": [
            {
                "components": [
                    {
                        "internalType": "uint256",
                        "name": "itemId",
                        "type": "uint256"
                    },
                    {
                        "internalType": "address",
                        "name": "nftContract",
                        "type": "address"
                    },
                    {
                        "internalType": "uint256",
                        "name": "tokenId",
                        "type": "uint256"
                    },
                    {
                        "internalType": "address payable",
                        "name": "seller",
                        "type": "address"
                    },
                    {
                        "internalType": "address payable",
                        "name": "owner",
                        "type": "address"
                    },
                    {
                        "internalType": "address payable",
                        "name": "creator",
                        "type": "address"
                    },
                    {
                        "internalType": "string",
                        "name": "userIcon",
                        "type": "string"
                    },
                    {
                        "internalType": "string",
                        "name": "userName",
                        "type": "string"
                    },
                    {
                        "internalType": "string",
                        "name": "userWebSite",
                        "type": "string"
                    },
                    {
                        "internalType": "uint256",
                        "name": "price",
                        "type": "uint256"
                    },
                    {
                        "internalType": "bool",
                        "name": "sold",
                        "type": "bool"
                    },
                    {
                        "internalType": "string",
                        "name": "preCid",
                        "type": "string"
                    },
                    {
                        "internalType": "string",
                        "name": "title",
                        "type": "string"
                    },
                    {
                        "internalType": "string",
                        "name": "description",
                        "type": "string"
                    },
                    {
                        "internalType": "string",
                        "name": "filetype",
                        "type": "string"
                    },
                    {
                        "internalType": "bool",
                        "name": "onMarket",
                        "type": "bool"
                    },
                    {
                        "internalType": "bool",
                        "name": "onSharePool",
                        "type": "bool"
                    },
                    {
                        "internalType": "uint256",
                        "name": "likeNum",
                        "type": "uint256"
                    },
                    {
                        "internalType": "bool",
                        "name": "isMsgSenderLiked",
                        "type": "bool"
                    },
                    {
                        "internalType": "uint256",
                        "name": "viewCount",
                        "type": "uint256"
                    },
                    {
                        "internalType": "uint256",
                        "name": "downloadCount",
                        "type": "uint256"
                    }
                ],
                "internalType": "struct DDNFTMarket.MarketItem[]",
                "name": "",
                "type": "tuple[]"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "fetchMyNFTs",
        "outputs": [
            {
                "components": [
                    {
                        "internalType": "uint256",
                        "name": "itemId",
                        "type": "uint256"
                    },
                    {
                        "internalType": "address",
                        "name": "nftContract",
                        "type": "address"
                    },
                    {
                        "internalType": "uint256",
                        "name": "tokenId",
                        "type": "uint256"
                    },
                    {
                        "internalType": "address payable",
                        "name": "seller",
                        "type": "address"
                    },
                    {
                        "internalType": "address payable",
                        "name": "owner",
                        "type": "address"
                    },
                    {
                        "internalType": "address payable",
                        "name": "creator",
                        "type": "address"
                    },
                    {
                        "internalType": "string",
                        "name": "userIcon",
                        "type": "string"
                    },
                    {
                        "internalType": "string",
                        "name": "userName",
                        "type": "string"
                    },
                    {
                        "internalType": "string",
                        "name": "userWebSite",
                        "type": "string"
                    },
                    {
                        "internalType": "uint256",
                        "name": "price",
                        "type": "uint256"
                    },
                    {
                        "internalType": "bool",
                        "name": "sold",
                        "type": "bool"
                    },
                    {
                        "internalType": "string",
                        "name": "preCid",
                        "type": "string"
                    },
                    {
                        "internalType": "string",
                        "name": "title",
                        "type": "string"
                    },
                    {
                        "internalType": "string",
                        "name": "description",
                        "type": "string"
                    },
                    {
                        "internalType": "string",
                        "name": "filetype",
                        "type": "string"
                    },
                    {
                        "internalType": "bool",
                        "name": "onMarket",
                        "type": "bool"
                    },
                    {
                        "internalType": "bool",
                        "name": "onSharePool",
                        "type": "bool"
                    },
                    {
                        "internalType": "uint256",
                        "name": "likeNum",
                        "type": "uint256"
                    },
                    {
                        "internalType": "bool",
                        "name": "isMsgSenderLiked",
                        "type": "bool"
                    },
                    {
                        "internalType": "uint256",
                        "name": "viewCount",
                        "type": "uint256"
                    },
                    {
                        "internalType": "uint256",
                        "name": "downloadCount",
                        "type": "uint256"
                    }
                ],
                "internalType": "struct DDNFTMarket.MarketItem[]",
                "name": "",
                "type": "tuple[]"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "fetchSharePoolItems",
        "outputs": [
            {
                "components": [
                    {
                        "internalType": "uint256",
                        "name": "itemId",
                        "type": "uint256"
                    },
                    {
                        "internalType": "address",
                        "name": "nftContract",
                        "type": "address"
                    },
                    {
                        "internalType": "uint256",
                        "name": "tokenId",
                        "type": "uint256"
                    },
                    {
                        "internalType": "address payable",
                        "name": "seller",
                        "type": "address"
                    },
                    {
                        "internalType": "address payable",
                        "name": "owner",
                        "type": "address"
                    },
                    {
                        "internalType": "address payable",
                        "name": "creator",
                        "type": "address"
                    },
                    {
                        "internalType": "string",
                        "name": "userIcon",
                        "type": "string"
                    },
                    {
                        "internalType": "string",
                        "name": "userName",
                        "type": "string"
                    },
                    {
                        "internalType": "string",
                        "name": "userWebSite",
                        "type": "string"
                    },
                    {
                        "internalType": "uint256",
                        "name": "price",
                        "type": "uint256"
                    },
                    {
                        "internalType": "bool",
                        "name": "sold",
                        "type": "bool"
                    },
                    {
                        "internalType": "string",
                        "name": "preCid",
                        "type": "string"
                    },
                    {
                        "internalType": "string",
                        "name": "title",
                        "type": "string"
                    },
                    {
                        "internalType": "string",
                        "name": "description",
                        "type": "string"
                    },
                    {
                        "internalType": "string",
                        "name": "filetype",
                        "type": "string"
                    },
                    {
                        "internalType": "bool",
                        "name": "onMarket",
                        "type": "bool"
                    },
                    {
                        "internalType": "bool",
                        "name": "onSharePool",
                        "type": "bool"
                    },
                    {
                        "internalType": "uint256",
                        "name": "likeNum",
                        "type": "uint256"
                    },
                    {
                        "internalType": "bool",
                        "name": "isMsgSenderLiked",
                        "type": "bool"
                    },
                    {
                        "internalType": "uint256",
                        "name": "viewCount",
                        "type": "uint256"
                    },
                    {
                        "internalType": "uint256",
                        "name": "downloadCount",
                        "type": "uint256"
                    }
                ],
                "internalType": "struct DDNFTMarket.MarketItem[]",
                "name": "",
                "type": "tuple[]"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "getAllItems",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "itemId",
                "type": "uint256"
            }
        ],
        "name": "getItemAtIndex",
        "outputs": [
            {
                "components": [
                    {
                        "internalType": "uint256",
                        "name": "itemId",
                        "type": "uint256"
                    },
                    {
                        "internalType": "address",
                        "name": "nftContract",
                        "type": "address"
                    },
                    {
                        "internalType": "uint256",
                        "name": "tokenId",
                        "type": "uint256"
                    },
                    {
                        "internalType": "address payable",
                        "name": "seller",
                        "type": "address"
                    },
                    {
                        "internalType": "address payable",
                        "name": "owner",
                        "type": "address"
                    },
                    {
                        "internalType": "address payable",
                        "name": "creator",
                        "type": "address"
                    },
                    {
                        "internalType": "string",
                        "name": "userIcon",
                        "type": "string"
                    },
                    {
                        "internalType": "string",
                        "name": "userName",
                        "type": "string"
                    },
                    {
                        "internalType": "string",
                        "name": "userWebSite",
                        "type": "string"
                    },
                    {
                        "internalType": "uint256",
                        "name": "price",
                        "type": "uint256"
                    },
                    {
                        "internalType": "bool",
                        "name": "sold",
                        "type": "bool"
                    },
                    {
                        "internalType": "string",
                        "name": "preCid",
                        "type": "string"
                    },
                    {
                        "internalType": "string",
                        "name": "title",
                        "type": "string"
                    },
                    {
                        "internalType": "string",
                        "name": "description",
                        "type": "string"
                    },
                    {
                        "internalType": "string",
                        "name": "filetype",
                        "type": "string"
                    },
                    {
                        "internalType": "bool",
                        "name": "onMarket",
                        "type": "bool"
                    },
                    {
                        "internalType": "bool",
                        "name": "onSharePool",
                        "type": "bool"
                    },
                    {
                        "internalType": "uint256",
                        "name": "likeNum",
                        "type": "uint256"
                    },
                    {
                        "internalType": "bool",
                        "name": "isMsgSenderLiked",
                        "type": "bool"
                    },
                    {
                        "internalType": "uint256",
                        "name": "viewCount",
                        "type": "uint256"
                    },
                    {
                        "internalType": "uint256",
                        "name": "downloadCount",
                        "type": "uint256"
                    }
                ],
                "internalType": "struct DDNFTMarket.MarketItem",
                "name": "",
                "type": "tuple"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    }
]