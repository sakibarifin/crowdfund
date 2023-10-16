[
    {
      "inputs": [],
      "name": "alreadyVotedError",
      "type": "error"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "currentTime",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "implementationDeadline",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "votingDeadline",
          "type": "uint256"
        }
      ],
      "name": "checkVotingTimeError",
      "type": "error"
    },
    {
      "inputs": [],
      "name": "donateToCampaignError",
      "type": "error"
    },
    {
      "inputs": [],
      "name": "notBackerError",
      "type": "error"
    },
    {
      "inputs": [],
      "name": "votingStatusError",
      "type": "error"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "address",
          "name": "previousOwner",
          "type": "address"
        },
        {
          "indexed": true,
          "internalType": "address",
          "name": "newOwner",
          "type": "address"
        }
      ],
      "name": "OwnershipTransferred",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "address",
          "name": "owner",
          "type": "address"
        },
        {
          "indexed": true,
          "internalType": "uint256",
          "name": "campaignIndex",
          "type": "uint256"
        },
        {
          "components": [
            {
              "internalType": "uint256",
              "name": "pledgeDeadline",
              "type": "uint256"
            },
            {
              "internalType": "uint256",
              "name": "implementationDeadline",
              "type": "uint256"
            },
            {
              "internalType": "uint256",
              "name": "votingDeadline",
              "type": "uint256"
            },
            {
              "internalType": "bool",
              "name": "isDisbursed",
              "type": "bool"
            },
            {
              "internalType": "bool",
              "name": "isExpired",
              "type": "bool"
            }
          ],
          "indexed": false,
          "internalType": "struct CrowdFunding2.MILESTONE",
          "name": "firstMilestone",
          "type": "tuple"
        },
        {
          "components": [
            {
              "internalType": "uint256",
              "name": "pledgeDeadline",
              "type": "uint256"
            },
            {
              "internalType": "uint256",
              "name": "implementationDeadline",
              "type": "uint256"
            },
            {
              "internalType": "uint256",
              "name": "votingDeadline",
              "type": "uint256"
            },
            {
              "internalType": "bool",
              "name": "isDisbursed",
              "type": "bool"
            },
            {
              "internalType": "bool",
              "name": "isExpired",
              "type": "bool"
            }
          ],
          "indexed": false,
          "internalType": "struct CrowdFunding2.MILESTONE",
          "name": "secondMilestone",
          "type": "tuple"
        },
        {
          "components": [
            {
              "internalType": "uint256",
              "name": "pledgeDeadline",
              "type": "uint256"
            },
            {
              "internalType": "uint256",
              "name": "implementationDeadline",
              "type": "uint256"
            },
            {
              "internalType": "uint256",
              "name": "votingDeadline",
              "type": "uint256"
            },
            {
              "internalType": "bool",
              "name": "isDisbursed",
              "type": "bool"
            },
            {
              "internalType": "bool",
              "name": "isExpired",
              "type": "bool"
            }
          ],
          "indexed": false,
          "internalType": "struct CrowdFunding2.MILESTONE",
          "name": "thirdMilestone",
          "type": "tuple"
        }
      ],
      "name": "createCampaignEvent",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "uint256",
          "name": "campaignIndex",
          "type": "uint256"
        },
        {
          "indexed": true,
          "internalType": "address",
          "name": "campaignOwner",
          "type": "address"
        },
        {
          "indexed": true,
          "internalType": "uint256",
          "name": "amount",
          "type": "uint256"
        }
      ],
      "name": "disburseFeeEvent",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "address",
          "name": "donator",
          "type": "address"
        },
        {
          "indexed": true,
          "internalType": "uint256",
          "name": "campaignIndex",
          "type": "uint256"
        },
        {
          "indexed": true,
          "internalType": "uint256",
          "name": "donationAmount",
          "type": "uint256"
        }
      ],
      "name": "donateToCampaignEvent",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "uint256",
          "name": "campaignIndex",
          "type": "uint256"
        },
        {
          "indexed": true,
          "internalType": "bool",
          "name": "result",
          "type": "bool"
        }
      ],
      "name": "isCampaignSuccessfulEvent",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "campaignIndex",
          "type": "uint256"
        },
        {
          "indexed": true,
          "internalType": "enum CrowdFunding2.STATE",
          "name": "campaignState",
          "type": "uint8"
        },
        {
          "indexed": true,
          "internalType": "enum CrowdFunding2.STATUS",
          "name": "votingStatus",
          "type": "uint8"
        },
        {
          "indexed": true,
          "internalType": "enum CrowdFunding2.STATUS",
          "name": "campaignStatus",
          "type": "uint8"
        }
      ],
      "name": "quromReachedEvent",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "uint256",
          "name": "campaignIndex",
          "type": "uint256"
        },
        {
          "indexed": true,
          "internalType": "address",
          "name": "campaignOwner",
          "type": "address"
        },
        {
          "indexed": true,
          "internalType": "uint256",
          "name": "amount",
          "type": "uint256"
        },
        {
          "indexed": false,
          "internalType": "enum CrowdFunding2.STATE",
          "name": "campaignState",
          "type": "uint8"
        }
      ],
      "name": "returnFeeEvent",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "uint256",
          "name": "campaignIndex",
          "type": "uint256"
        },
        {
          "indexed": true,
          "internalType": "address",
          "name": "voter",
          "type": "address"
        },
        {
          "indexed": true,
          "internalType": "bool",
          "name": "votingValue",
          "type": "bool"
        },
        {
          "indexed": false,
          "internalType": "enum CrowdFunding2.STATE",
          "name": "campaignState",
          "type": "uint8"
        }
      ],
      "name": "votingEvent",
      "type": "event"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "name": "campaigns",
      "outputs": [
        {
          "internalType": "address payable",
          "name": "owner",
          "type": "address"
        },
        {
          "internalType": "string",
          "name": "title",
          "type": "string"
        },
        {
          "internalType": "uint256",
          "name": "goal",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "deadline",
          "type": "uint256"
        },
        {
          "components": [
            {
              "internalType": "uint256",
              "name": "pledgeDeadline",
              "type": "uint256"
            },
            {
              "internalType": "uint256",
              "name": "implementationDeadline",
              "type": "uint256"
            },
            {
              "internalType": "uint256",
              "name": "votingDeadline",
              "type": "uint256"
            },
            {
              "internalType": "bool",
              "name": "isDisbursed",
              "type": "bool"
            },
            {
              "internalType": "bool",
              "name": "isExpired",
              "type": "bool"
            }
          ],
          "internalType": "struct CrowdFunding2.MILESTONE",
          "name": "firstMilestone",
          "type": "tuple"
        },
        {
          "components": [
            {
              "internalType": "uint256",
              "name": "pledgeDeadline",
              "type": "uint256"
            },
            {
              "internalType": "uint256",
              "name": "implementationDeadline",
              "type": "uint256"
            },
            {
              "internalType": "uint256",
              "name": "votingDeadline",
              "type": "uint256"
            },
            {
              "internalType": "bool",
              "name": "isDisbursed",
              "type": "bool"
            },
            {
              "internalType": "bool",
              "name": "isExpired",
              "type": "bool"
            }
          ],
          "internalType": "struct CrowdFunding2.MILESTONE",
          "name": "secondMilestone",
          "type": "tuple"
        },
        {
          "components": [
            {
              "internalType": "uint256",
              "name": "pledgeDeadline",
              "type": "uint256"
            },
            {
              "internalType": "uint256",
              "name": "implementationDeadline",
              "type": "uint256"
            },
            {
              "internalType": "uint256",
              "name": "votingDeadline",
              "type": "uint256"
            },
            {
              "internalType": "bool",
              "name": "isDisbursed",
              "type": "bool"
            },
            {
              "internalType": "bool",
              "name": "isExpired",
              "type": "bool"
            }
          ],
          "internalType": "struct CrowdFunding2.MILESTONE",
          "name": "thirdMilestone",
          "type": "tuple"
        },
        {
          "internalType": "uint256",
          "name": "amountCollected",
          "type": "uint256"
        },
        {
          "internalType": "string",
          "name": "category",
          "type": "string"
        },
        {
          "internalType": "string",
          "name": "subcategory",
          "type": "string"
        },
        {
          "internalType": "enum CrowdFunding2.STATE",
          "name": "campaignState",
          "type": "uint8"
        },
        {
          "internalType": "enum CrowdFunding2.STATUS",
          "name": "campaignStatus",
          "type": "uint8"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address payable",
          "name": "_owner",
          "type": "address"
        },
        {
          "internalType": "string",
          "name": "_title",
          "type": "string"
        },
        {
          "internalType": "uint256",
          "name": "_goal",
          "type": "uint256"
        },
        {
          "internalType": "string",
          "name": "_category",
          "type": "string"
        },
        {
          "internalType": "string",
          "name": "_subcategory",
          "type": "string"
        }
      ],
      "name": "createCampaign",
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
          "name": "_id",
          "type": "uint256"
        },
        {
          "internalType": "enum CrowdFunding2.STATE",
          "name": "state",
          "type": "uint8"
        }
      ],
      "name": "donateToCampaign",
      "outputs": [],
      "stateMutability": "payable",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "getCampaigns",
      "outputs": [
        {
          "components": [
            {
              "internalType": "address payable",
              "name": "owner",
              "type": "address"
            },
            {
              "internalType": "string",
              "name": "title",
              "type": "string"
            },
            {
              "internalType": "uint256",
              "name": "goal",
              "type": "uint256"
            },
            {
              "internalType": "uint256",
              "name": "deadline",
              "type": "uint256"
            },
            {
              "components": [
                {
                  "internalType": "uint256",
                  "name": "pledgeDeadline",
                  "type": "uint256"
                },
                {
                  "internalType": "uint256",
                  "name": "implementationDeadline",
                  "type": "uint256"
                },
                {
                  "internalType": "uint256",
                  "name": "votingDeadline",
                  "type": "uint256"
                },
                {
                  "internalType": "bool",
                  "name": "isDisbursed",
                  "type": "bool"
                },
                {
                  "internalType": "bool",
                  "name": "isExpired",
                  "type": "bool"
                }
              ],
              "internalType": "struct CrowdFunding2.MILESTONE",
              "name": "firstMilestone",
              "type": "tuple"
            },
            {
              "components": [
                {
                  "internalType": "uint256",
                  "name": "pledgeDeadline",
                  "type": "uint256"
                },
                {
                  "internalType": "uint256",
                  "name": "implementationDeadline",
                  "type": "uint256"
                },
                {
                  "internalType": "uint256",
                  "name": "votingDeadline",
                  "type": "uint256"
                },
                {
                  "internalType": "bool",
                  "name": "isDisbursed",
                  "type": "bool"
                },
                {
                  "internalType": "bool",
                  "name": "isExpired",
                  "type": "bool"
                }
              ],
              "internalType": "struct CrowdFunding2.MILESTONE",
              "name": "secondMilestone",
              "type": "tuple"
            },
            {
              "components": [
                {
                  "internalType": "uint256",
                  "name": "pledgeDeadline",
                  "type": "uint256"
                },
                {
                  "internalType": "uint256",
                  "name": "implementationDeadline",
                  "type": "uint256"
                },
                {
                  "internalType": "uint256",
                  "name": "votingDeadline",
                  "type": "uint256"
                },
                {
                  "internalType": "bool",
                  "name": "isDisbursed",
                  "type": "bool"
                },
                {
                  "internalType": "bool",
                  "name": "isExpired",
                  "type": "bool"
                }
              ],
              "internalType": "struct CrowdFunding2.MILESTONE",
              "name": "thirdMilestone",
              "type": "tuple"
            },
            {
              "internalType": "uint256",
              "name": "amountCollected",
              "type": "uint256"
            },
            {
              "internalType": "string",
              "name": "category",
              "type": "string"
            },
            {
              "internalType": "string",
              "name": "subcategory",
              "type": "string"
            },
            {
              "internalType": "address[]",
              "name": "donators",
              "type": "address[]"
            },
            {
              "internalType": "uint256[]",
              "name": "donations",
              "type": "uint256[]"
            },
            {
              "internalType": "enum CrowdFunding2.STATE",
              "name": "campaignState",
              "type": "uint8"
            },
            {
              "internalType": "enum CrowdFunding2.STATUS",
              "name": "campaignStatus",
              "type": "uint8"
            }
          ],
          "internalType": "struct CrowdFunding2.Campaign[]",
          "name": "",
          "type": "tuple[]"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "_id",
          "type": "uint256"
        }
      ],
      "name": "getDonators",
      "outputs": [
        {
          "internalType": "address[]",
          "name": "",
          "type": "address[]"
        },
        {
          "internalType": "uint256[]",
          "name": "",
          "type": "uint256[]"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "string",
          "name": "_category",
          "type": "string"
        },
        {
          "internalType": "string",
          "name": "_subcategory",
          "type": "string"
        }
      ],
      "name": "getGoalSuggestion",
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
          "name": "_id",
          "type": "uint256"
        },
        {
          "internalType": "enum CrowdFunding2.STATE",
          "name": "state",
          "type": "uint8"
        }
      ],
      "name": "getVoters",
      "outputs": [
        {
          "components": [
            {
              "internalType": "address",
              "name": "voter",
              "type": "address"
            },
            {
              "internalType": "bool",
              "name": "value",
              "type": "bool"
            }
          ],
          "internalType": "struct CrowdFunding2.Vote[]",
          "name": "",
          "type": "tuple[]"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "_id",
          "type": "uint256"
        }
      ],
      "name": "isGoalAchieved",
      "outputs": [
        {
          "internalType": "bool",
          "name": "",
          "type": "bool"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "numberOfCampaigns",
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
      "inputs": [],
      "name": "owner",
      "outputs": [
        {
          "internalType": "address",
          "name": "",
          "type": "address"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "_id",
          "type": "uint256"
        },
        {
          "internalType": "enum CrowdFunding2.STATE",
          "name": "state",
          "type": "uint8"
        }
      ],
      "name": "quromReached",
      "outputs": [
        {
          "internalType": "bool",
          "name": "",
          "type": "bool"
        }
      ],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "renounceOwnership",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "_id",
          "type": "uint256"
        }
      ],
      "name": "returnFeeIfFailed",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "newOwner",
          "type": "address"
        }
      ],
      "name": "transferOwnership",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "_id",
          "type": "uint256"
        },
        {
          "internalType": "bool",
          "name": "voteValue",
          "type": "bool"
        },
        {
          "internalType": "enum CrowdFunding2.STATE",
          "name": "state",
          "type": "uint8"
        }
      ],
      "name": "voting",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    }
  ]