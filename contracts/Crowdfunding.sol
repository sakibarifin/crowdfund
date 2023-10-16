// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.19;

import "@openzeppelin/contracts/access/Ownable.sol";

contract CrowdFunding2 is Ownable {

    uint256 constant IMPLEMENTATION_TIME_CONSTANT = 30 days;
    uint256 constant MILESTONE_TIME_CONSTANT = 15 days;
    uint256 constant VOTING_TIME_CONSTANT = 7 days;

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
        uint256 pledgeDeadline;
        uint256 implementationDeadline;
        uint256 votingDeadline;
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

    struct Vote {
        address voter;
        bool value;
    }

    mapping (uint256 => mapping( STATE => STATUS )) voteStatus;

    mapping (uint256 => mapping( STATE => mapping( address => bool))) votingTrack;
    mapping (uint256 => mapping( STATE => mapping( address => uint256))) donateTrack;
    mapping (uint256 => mapping( STATE => Vote[] )) votingDetails;

    mapping(uint256 => Campaign) public campaigns;

    uint256 public numberOfCampaigns = 0;

    function createCampaign(address payable _owner, string memory _title, string memory _description, uint256 _goal, string memory _image) public returns (uint256) {
        Campaign storage campaign = campaigns[numberOfCampaigns];

        require(campaign.deadline < block.timestamp, "The deadline should be a date in the future.");

        campaign.owner = _owner;
        campaign.title = _title;
        campaign.description = _description;
        campaign.goal = _goal;
        campaign.amountCollected = 0;
        campaign.image = _image;

        uint256 currentTime = block.timestamp;
        
        campaign.firstMilestone = MILESTONE({
            pledgeDeadline: currentTime + MILESTONE_TIME_CONSTANT,
            implementationDeadline: currentTime + MILESTONE_TIME_CONSTANT + IMPLEMENTATION_TIME_CONSTANT, 
            votingDeadline: currentTime + MILESTONE_TIME_CONSTANT + IMPLEMENTATION_TIME_CONSTANT + VOTING_TIME_CONSTANT,
            isDisbursed: false
        });
        campaign.secondMilestone = MILESTONE({
            pledgeDeadline: 0,
            implementationDeadline: campaign.firstMilestone.votingDeadline + IMPLEMENTATION_TIME_CONSTANT,
            votingDeadline : campaign.firstMilestone.votingDeadline + IMPLEMENTATION_TIME_CONSTANT + VOTING_TIME_CONSTANT,
            isDisbursed: false
        });
        campaign.thirdMilestone = MILESTONE({
            pledgeDeadline: 0,
            implementationDeadline: campaign.secondMilestone.votingDeadline + IMPLEMENTATION_TIME_CONSTANT,
            votingDeadline : campaign.secondMilestone.votingDeadline + IMPLEMENTATION_TIME_CONSTANT + VOTING_TIME_CONSTANT,
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

        require(msg.value > 0);

        uint256 amount = msg.value;

        Campaign storage campaign = campaigns[_id];

        require(campaign.campaignStatus == STATUS.PENDING, "Can not pledge!");

        campaign.donators.push(msg.sender);
        campaign.donations.push(amount);

        campaign.amountCollected = campaign.amountCollected + amount;
        donateTrack[_id][campaign.campaignState][msg.sender] = amount;
    }

    function isCampaignSuccessful(uint256 _id) public view returns(bool){
        Campaign storage campaign = campaigns[_id];
        
        uint256[] memory donations = campaign.donations;
        uint256 target = 0;
        for (uint i = 0; i < donations.length; i++){
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

    function disburseFee(uint256 _id) internal{
        Campaign storage campaign = campaigns[_id];
        
        if (campaign.campaignState == STATE.FIRST_MILESTONE) {
            address payable owner = campaign.owner;
             uint256 amount = (campaign.goal * 30) / 100 ;
            owner.transfer(amount);
            campaign.firstMilestone.isDisbursed = true;
        }
        else if (campaign.campaignState == STATE.SECOND_MILESTONE) {
            address payable owner = campaign.owner;
            uint256 amount = (campaign.goal * 35) / 100 ;
            owner.transfer(amount);
            campaign.secondMilestone.isDisbursed = true;
        }
        else if (campaign.campaignState == STATE.THIRD_MILESTONE) {
            address payable owner = campaign.owner;
            uint256 amount = (campaign.goal * 35) / 100 ;
            owner.transfer(amount);
            campaign.thirdMilestone.isDisbursed = true;
        }
    }

    function returnFee(uint256 _id) external {
        Campaign storage campaign = campaigns[_id];
        require(campaign.campaignStatus == STATUS.FAILED);

        if(campaign.campaignState == STATE.FIRST_MILESTONE) {
            if(donateTrack[_id][campaign.campaignState][msg.sender] > 0){
                address payable owner = campaign.owner;
                uint256 amount = (donateTrack[_id][campaign.campaignState][msg.sender] * 70) / 100 ;
                owner.transfer(amount);
            }
        }
        else if(campaign.campaignState == STATE.SECOND_MILESTONE) {
            if(donateTrack[_id][campaign.campaignState][msg.sender] > 0){
                address payable owner = campaign.owner;
                uint256 amount = (donateTrack[_id][campaign.campaignState][msg.sender] * 35) / 100 ;
                owner.transfer(amount);
            }
        }
    }

    modifier checkVotingTime(uint256 _id, STATE state) {
        Campaign storage campaign = campaigns[_id];
        if(state == STATE.FIRST_MILESTONE) {
            require(block.timestamp > campaign.firstMilestone.implementationDeadline && block.timestamp <= campaign.firstMilestone.votingDeadline);
        }
        else if(state == STATE.SECOND_MILESTONE) {
            require(block.timestamp > campaign.secondMilestone.implementationDeadline && block.timestamp <= campaign.secondMilestone.votingDeadline);
        }
        else if(state == STATE.THIRD_MILESTONE) {
            require(block.timestamp > campaign.thirdMilestone.implementationDeadline && block.timestamp <= campaign.thirdMilestone.votingDeadline);
        }
        _;
    }

     modifier quromReachedTime(uint256 _id, STATE state) {
        Campaign storage campaign = campaigns[_id];
        if(state == STATE.FIRST_MILESTONE) {
            require(block.timestamp > campaign.firstMilestone.votingDeadline);
        }
        else if(state == STATE.SECOND_MILESTONE) {
            require(block.timestamp > campaign.secondMilestone.votingDeadline);
        }
        else if(state == STATE.THIRD_MILESTONE) {
            require(block.timestamp > campaign.thirdMilestone.votingDeadline);
        }
        _;
    }

    function voting(uint256 _id, bool voteValue, STATE state) public checkVotingTime(_id, state) {
        
        require(voteStatus[_id][state] == STATUS.PENDING);
        require(votingTrack[_id][state][msg.sender] == false);
        
        Vote memory vote = Vote({
            voter: msg.sender,
            value: voteValue
        });

        votingTrack[_id][state][msg.sender] = true;

        votingDetails[_id][state].push(vote);
    }

    function quromReached(uint256 _id, STATE state) public quromReachedTime(_id, state) returns(bool) {

        uint256 votersLen = votingDetails[_id][state].length;
        Campaign storage campaign = campaigns[_id];

        uint256 yesVotersCount = 0;
        uint256 noVotersCount = 0;
        uint256 totalVoters = 0;

        for(uint256 i = 0; i < votersLen; i++) {
            if(votingDetails[_id][state][i].value == true ){
                yesVotersCount++;
                totalVoters++;
            }else{
                noVotersCount++;
                totalVoters++;
            }
        }

        if(yesVotersCount >= noVotersCount) {
           voteStatus[_id][state] = STATUS.SUCCESSFUL;
           if (campaign.campaignState == STATE.FIRST_MILESTONE) campaign.campaignState = STATE.SECOND_MILESTONE;
           else if (campaign.campaignState == STATE.SECOND_MILESTONE) campaign.campaignState = STATE.THIRD_MILESTONE;
           else if (campaign.campaignState == STATE.THIRD_MILESTONE) campaign.campaignStatus = STATUS.SUCCESSFUL;
           disburseFee(_id);
           return true;
        }else {
            voteStatus[_id][state] = STATUS.FAILED;
            campaign.campaignStatus = STATUS.FAILED;
           return false;
        }
    }
}
