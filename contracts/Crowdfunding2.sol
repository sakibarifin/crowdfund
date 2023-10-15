// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.19;

import "@openzeppelin/contracts/access/Ownable.sol";

contract CrowdFunding2 is Ownable {

    uint256 constant IMPLEMENTATION_TIME_CONSTANT = 2 minutes; //General implementation time will be 30 days
    uint256 constant MILESTONE_TIME_CONSTANT = 2 minutes; //General milestone time will be 15 days
    uint256 constant VOTING_TIME_CONSTANT = 2 minutes; //General voting period will be 15 days

    uint256 public numberOfCampaigns = 0;

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

    event createCampaignEvent(
        address indexed  owner,
        uint256 indexed campaignIndex,
        MILESTONE firstMilestone,
        MILESTONE secondMilestone,
        MILESTONE thirdMilestone
    );

    event donateToCampaignEvent(
        address indexed donator,
        uint256 indexed campaignIndex,
        uint256 indexed donationAmount
    );

    event isCampaignSuccessfulEvent(
        uint256 indexed campaignIndex,
        bool indexed result
    );

    event disburseFeeEvent(
        uint256 indexed campaignIndex,
        address indexed campaignOwner,
        uint256 indexed amount
    );

    event returnFeeEvent(
        uint256 indexed campaignIndex,
        address indexed campaignOwner,
        uint256 indexed amount,
        STATE campaignState
    );

    event votingEvent(
        uint256 indexed campaignIndex,
        address indexed voter,
        bool indexed votingValue,
        STATE campaignState
    );

    event quromReachedEvent(
        uint256 campaignIndex,
        STATE indexed campaignState,
        STATUS indexed votingStatus,
        STATUS indexed campaignStatus
    );

    error checkVotingTimeError(
        uint256 currentTime,
        uint256 implementationDeadline,
        uint256 votingDeadline
    );
    error votingStatusError();
    error votingNotBackerError();


    constructor() Ownable(msg.sender) {}

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

        emit createCampaignEvent(_owner, numberOfCampaigns - 1, campaign.firstMilestone, campaign.secondMilestone, campaign.thirdMilestone);

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

        require(msg.value > 0, "Donating value must be greater than zero");

        uint256 amount = msg.value;

        Campaign storage campaign = campaigns[_id];

        require(campaign.campaignStatus == STATUS.PENDING, "Can not pledge!");

        campaign.donators.push(msg.sender);
        campaign.donations.push(amount);

        campaign.amountCollected = campaign.amountCollected + amount;
        donateTrack[_id][campaign.campaignState][msg.sender] = amount;

        emit donateToCampaignEvent(msg.sender, _id, msg.value);
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
            emit disburseFeeEvent(_id, owner, amount);
        }
        else if (campaign.campaignState == STATE.SECOND_MILESTONE) {
            address payable owner = campaign.owner;
            uint256 amount = (campaign.goal * 35) / 100 ;
            owner.transfer(amount);
            campaign.secondMilestone.isDisbursed = true;
            emit disburseFeeEvent(_id, owner, amount);
        }
        else if (campaign.campaignState == STATE.THIRD_MILESTONE) {
            address payable owner = campaign.owner;
            uint256 amount = (campaign.goal * 35) / 100 ;
            owner.transfer(amount);
            campaign.thirdMilestone.isDisbursed = true;
            emit disburseFeeEvent(_id, owner, amount);
        }
    }

    function returnFee(uint256 _id) external {
        Campaign storage campaign = campaigns[_id];
        require(campaign.campaignStatus == STATUS.FAILED, "Can not return fee");

        if(campaign.campaignState == STATE.FIRST_MILESTONE) {
            if(donateTrack[_id][campaign.campaignState][msg.sender] > 0){
                address payable owner = campaign.owner;
                uint256 amount = (donateTrack[_id][campaign.campaignState][msg.sender] * 70) / 100 ;
                owner.transfer(amount);
                emit returnFeeEvent(_id, owner, amount, campaign.campaignState);
            }
            
        }
        else if(campaign.campaignState == STATE.SECOND_MILESTONE) {
            if(donateTrack[_id][campaign.campaignState][msg.sender] > 0){
                address payable owner = campaign.owner;
                uint256 amount = (donateTrack[_id][campaign.campaignState][msg.sender] * 35) / 100 ;
                owner.transfer(amount);
                emit returnFeeEvent(_id, owner, amount, campaign.campaignState);
            }
        }
    }

    modifier checkVotingTime(uint256 _id, STATE state) {
        Campaign storage campaign = campaigns[_id];
        if(state == STATE.FIRST_MILESTONE) {
            //require(block.timestamp > campaign.firstMilestone.implementationDeadline && block.timestamp <= campaign.firstMilestone.votingDeadline, "Can not vote");
            if(!(block.timestamp > campaign.firstMilestone.implementationDeadline && block.timestamp <= campaign.firstMilestone.votingDeadline)){
                revert checkVotingTimeError(block.timestamp, campaign.firstMilestone.implementationDeadline, campaign.firstMilestone.votingDeadline);
            }
        }
        else if(state == STATE.SECOND_MILESTONE) {
            //require(block.timestamp > campaign.secondMilestone.implementationDeadline && block.timestamp <= campaign.secondMilestone.votingDeadline, "Can not vote");
            if(!(block.timestamp > campaign.secondMilestone.implementationDeadline && block.timestamp <= campaign.secondMilestone.votingDeadline)) {
                revert checkVotingTimeError(block.timestamp, campaign.secondMilestone.implementationDeadline, campaign.secondMilestone.votingDeadline); 
            }
        }
        else if(state == STATE.THIRD_MILESTONE) {
            //require(block.timestamp > campaign.thirdMilestone.implementationDeadline && block.timestamp <= campaign.thirdMilestone.votingDeadline, "Can not vote");
            if(!(block.timestamp > campaign.thirdMilestone.implementationDeadline && block.timestamp <= campaign.thirdMilestone.votingDeadline)){
                revert checkVotingTimeError(block.timestamp, campaign.thirdMilestone.implementationDeadline, campaign.thirdMilestone.votingDeadline);
            }
        }
        _;
    }

     modifier quromReachedTime(uint256 _id, STATE state) {
        Campaign storage campaign = campaigns[_id];
        if(state == STATE.FIRST_MILESTONE) {
            require(block.timestamp > campaign.firstMilestone.votingDeadline, "can not check qurom");
        }
        else if(state == STATE.SECOND_MILESTONE) {
            require(block.timestamp > campaign.secondMilestone.votingDeadline, "can not check qurom");
        }
        else if(state == STATE.THIRD_MILESTONE) {
            require(block.timestamp > campaign.thirdMilestone.votingDeadline, "can not check qurom");
        }
        _;
    }

    function voting(uint256 _id, bool voteValue, STATE state) public checkVotingTime(_id, state) {
        
        //require(voteStatus[_id][state] == STATUS.PENDING, "Voting is not in the Pending state");
        if(voteStatus[_id][state] != STATUS.PENDING){
            revert votingStatusError();
        }
        //require(votingTrack[_id][state][msg.sender] == false, "You are not a backer");
        if(votingTrack[_id][state][msg.sender]){
            revert votingNotBackerError();
        }
        
        Vote memory vote = Vote({
            voter: msg.sender,
            value: voteValue
        });

        votingTrack[_id][state][msg.sender] = true;

        votingDetails[_id][state].push(vote);

        emit votingEvent(_id, msg.sender, voteValue, state);
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
           emit quromReachedEvent(_id, campaign.campaignState, STATUS.SUCCESSFUL, campaign.campaignStatus);
           return true;
        }else {
            voteStatus[_id][state] = STATUS.FAILED;
            campaign.campaignStatus = STATUS.FAILED;
            emit quromReachedEvent(_id, campaign.campaignState, STATUS.FAILED, campaign.campaignStatus);
           return false;
        }
    }
}
