// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.19;

import "@openzeppelin/contracts/access/Ownable.sol";

contract CrowdFunding2 is Ownable {

    enum STATE {
        FIRST_MILESTONE,
        SECOND_MILESTONE,
        THIRD_MILESTONE
    }

    enum STATUS {
        PENDING,
        SUCCESSFUL,
        FAILED
    }

    struct MILESTONE {
        uint256 deadline;
        bool isDisbursed;
    }
    struct Campaign {
        address payable owner;
        string title;
        string description;
        uint256 goal;
        uint256 deadline;
        MILESTONE firstMilestone;
        MILESTONE secondMilestone;
        MILESTONE thirdMilestone;
        uint256 amountCollected;
        string image;
        address[] donators;
        uint256[] donations;
        STATE campaignState;
        STATUS campaignStatus;
    }

    mapping(uint256 => Campaign) public campaigns;

    uint256 public numberOfCampaigns = 0;

    constructor() Ownable(msg.sender) {}

    function createCampaign(address payable _owner, string memory _title, string memory _description, uint256 _goal, uint256 _deadline, string memory _image, uint256 _firstMilestoneDeadline, uint256 _secondMilestoneDeadline, uint256 _thirdMilestoneDeadline) public returns (uint256) {
        Campaign storage campaign = campaigns[numberOfCampaigns];

        require(campaign.deadline < block.timestamp, "The deadline should be a date in the future.");

        campaign.owner = _owner;
        campaign.title = _title;
        campaign.description = _description;
        campaign.goal = _goal;
        campaign.deadline = _deadline;
        campaign.amountCollected = 0;
        campaign.image = _image;
        
        campaign.firstMilestone = MILESTONE({
            deadline : _firstMilestoneDeadline,
            isDisbursed: false
        });
        campaign.secondMilestone = MILESTONE({
            deadline : _secondMilestoneDeadline,
            isDisbursed: false
        });
        campaign.thirdMilestone = MILESTONE({
            deadline : _thirdMilestoneDeadline,
            isDisbursed: false
        }); 
        campaign.campaignState = STATE.FIRST_MILESTONE;
        campaign.campaignStatus = STATUS.PENDING;

        numberOfCampaigns++;

        return numberOfCampaigns - 1;
    }

    function updateCampaignState(uint256 _id, STATE state) public onlyOwner {
        Campaign storage campaign = campaigns[_id];

        campaign.campaignState = state;
    }

    function updateCampaignStatus(uint256 _id, STATUS status) public onlyOwner {
        Campaign storage campaign = campaigns[_id];

        campaign.campaignStatus = status;
    } 

    function donateToCampaign(uint256 _id) public payable {

        uint256 amount = msg.value;

        Campaign storage campaign = campaigns[_id];

        require(campaign.campaignStatus == STATUS.PENDING, "Can not pledge!");

        campaign.donators.push(msg.sender);
        campaign.donations.push(amount);

        (bool sent,) = payable(address(this)).call{value: amount}("");

        if(sent) {
            campaign.amountCollected = campaign.amountCollected + amount;
        }
    }

    function isCampaignSuccessful(uint256 _id) public view returns(bool){
        Campaign storage campaign = campaigns[_id];
        
        uint256[] memory donations = campaign.donations;
        uint256 target = 0;
        for (uint i = 0; i< donations.length; i++){
            target += donations[i];
        }

        if(target >= campaign.goal){
            return true;
        }else {
            return false;
        }
    }

    function getDonators(uint256 _id) view public returns (address[] memory, uint256[] memory) {
        return (campaigns[_id].donators, campaigns[_id].donations);
    }

    function getCampaigns() public view returns (Campaign[] memory) {
        Campaign[] memory allCampaigns = new Campaign[](numberOfCampaigns);

        for(uint i = 0; i < numberOfCampaigns; i++) {
            Campaign storage item = campaigns[i];

            allCampaigns[i] = item;
        }

        return allCampaigns;
    }

    // function disburseFee(uint256 _id) public onlyOwner{
    //     Campaign storage campaign = campaigns[_id];
    //     require(campaign.campaignStatus == STATUS.PENDING);
    //     if (campaign.campaignState == STATE.FIRST_MILESTONE && campaign.firstMilestone.isDisbursed == false) {
    //         address payable owner = campaign.owner;
    //         uint256 amount = (campaign.goal * 30) / 100 ;
    //         owner.transfer(amount);
    //         campaign.firstMilestone.isDisbursed = true;
    //     }

    // }
}
