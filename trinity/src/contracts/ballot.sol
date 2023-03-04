pragma solidity ^0.5.0;

// contract for voting in a ballot
contract Ballot{
    address public owner;
    struct Voter{
        uint weight;
        bool voted;
        uint voteTo;
    }
    // struct for a proposal
    struct Candidate{
        bytes32 name;
        uint id;
        uint voteCount;
    }

    struct Event{
        string name;
        string endTime;
        uint expectedVotes;
        uint totalVotes;
    }

    // mapping of voters
    mapping(address => Voter) voters;

    // array of proposals
    mapping(uint => Candidate []) listCandidates;

    constructor() public{
        owner = msg.sender;
    }

    Event[] public events;

    // create voting event
    function createEvent(string memory _name, string memory _endTime, uint _expectedVotes, bytes32[] memory _candidateNames, uint[] memory _candidateIds, uint evenId) public returns(bool success){
        require(msg.sender == owner, "Only the owner can create an event");
        events.push(Event({
            name: _name,
            endTime: _endTime,
            expectedVotes: _expectedVotes,
            totalVotes: 0
        }));

        // create candidates and map them to the event
        for(uint i = 0; i < _candidateNames.length; i++){
            listCandidates[evenId].push(Candidate({
                name: _candidateNames[i],
                id: _candidateIds[i],
                voteCount: 0
            }));
        }

        return true;
    }

    // vote for a candidate
    function approvalVoting(uint _eventId, uint [] _candidateId) public{
        if(voters[msg.sender].weight == 0){
            voters[msg.sender] = Voter({
                weight: 1,
                voted: false,
                voteTo: 0
            });
        }
        Voter storage sender = voters[msg.sender];
        require(!sender.voted, "Already voted");
        sender.voted = true;
        sender.voteTo = _candidateId;
        events[_eventId].totalVotes += 1;
        for(uint i = 0; i < _candidateId.length; i++){
            listCandidates[_eventId][_candidateId[i]].voteCount += 1;
        }
    }

    function singleVoting(uint _eventId, uint _candidateId) public{
        if(voters[msg.sender].weight == 0){
            voters[msg.sender] = Voter({
                weight: 1,
                voted: false,
                voteTo: 0
            });
        }
        Voter storage sender = voters[msg.sender];
        require(!sender.voted, "Already voted");
        sender.voted = true;
        sender.voteTo = _candidateId;
        events[_eventId].totalVotes += 1;
        listCandidates[_eventId][_candidateId].voteCount += 1;
    }

    function isOwner () public view returns(bool){
        return msg.sender == owner;
    }


}