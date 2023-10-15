[
	{
		"inputs": [],
		"stateMutability": "nonpayable",
		"type": "constructor"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "owner",
				"type": "address"
			}
		],
		"name": "OwnableInvalidOwner",
		"type": "error"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "account",
				"type": "address"
			}
		],
		"name": "OwnableUnauthorizedAccount",
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
				"internalType": "string",
				"name": "description",
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
				"name": "image",
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
				"internalType": "string",
				"name": "_description",
				"type": "string"
			},
			{
				"internalType": "uint256",
				"name": "_goal",
				"type": "uint256"
			},
			{
				"internalType": "string",
				"name": "_image",
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
						"internalType": "string",
						"name": "description",
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
						"name": "image",
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
				"internalType": "uint256",
				"name": "_id",
				"type": "uint256"
			}
		],
		"name": "isCampaignSuccessful",
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
		"name": "returnFee",
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
				"internalType": "enum CrowdFunding2.STATE",
				"name": "state",
				"type": "uint8"
			}
		],
		"name": "updateCampaignState",
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
				"internalType": "enum CrowdFunding2.STATUS",
				"name": "status",
				"type": "uint8"
			}
		],
		"name": "updateCampaignStatus",
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