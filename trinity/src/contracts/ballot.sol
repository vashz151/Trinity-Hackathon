pragma solidity ^0.5.0;
pragma experimental ABIEncoderV2; 

// contract for voting in a ballot
contract Ballot{
    address public owner;
    struct Voter{
        uint weight;
        bool voted;
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
        string typ;
        string desc;
        string organiser;
        uint expectedVotes;
        uint totalVotes;
        uint eventId;

    }

    event EventCreated(string name, string endTime, string typ, string desc, string organiser, uint expectedVotes, uint totalVotes, uint eventId);

    event voteCasted(uint eventId, uint candidateId, uint voteCount, uint totalVotes);
    // mapping of voters
    mapping(address => Voter) voters;

    // array of proposals
    mapping(uint => Candidate []) listCandidates;

    constructor() public{
        owner = msg.sender;
    }

    Event[] public events;

    // create voting event
    function createEvent(string memory _name,string memory desc, string memory organiser, string memory _endTime, uint _expectedVotes, bytes32[] memory _candidateNames, uint[] memory _candidateIds, uint evenId, string memory typ) public returns(bool success){
        require(msg.sender == owner, "Only the owner can create an event");
        events.push(Event({
            name: _name,
            endTime: _endTime,
            expectedVotes: _expectedVotes,
            totalVotes: 0,
            typ: typ,
            eventId: evenId,
            desc: desc, 
            organiser: organiser
        }));

        emit EventCreated(_name, _endTime, typ, desc, organiser, _expectedVotes, 0, evenId);
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

    function getEvents() public view returns(Event[] memory){
        return events;
    }

    function getEventById(uint _eventId) public view returns(Event memory){
        Event memory eventsi;
        for(uint i = 0; i < events.length; i++){
            if(events[i].eventId == _eventId){
                eventsi = events[i];
            }
        }
        return eventsi;
    }

    function getEventLength() public view returns(uint){
        return events.length;
    }

    function getEventByIndex(uint index) public view returns(Event memory){
        return events[index];
    }

    function getCandidatesLength(uint _eventId) public view returns(uint){
        return listCandidates[_eventId].length;
    }

    function getCandidate(uint _eventId, uint index) public view returns(Candidate memory){
        return listCandidates[_eventId][index];
    }

    // vote for a candidate
    function approvalVoting(uint _eventId, uint [] memory _candidateId) public{
        if(voters[msg.sender].weight == 0){
            voters[msg.sender] = Voter({
                weight: 1,
                voted: false
            });
        }
        Voter storage sender = voters[msg.sender];
        require(!sender.voted, "Already voted");
        sender.voted = true;
        events[_eventId].totalVotes += 1;
        for(uint i = 0; i < _candidateId.length; i++){
            msg.sender.transfer(0.5 ether);
            listCandidates[_eventId][_candidateId[i]].voteCount += 1;
        }
    }

    function singleVoting(uint _eventId, uint _candidateId) public{
        if(voters[msg.sender].weight == 0){
            voters[msg.sender] = Voter({
                weight: 1,
                voted: false
            });
        }
        Voter storage sender = voters[msg.sender];
        require(!sender.voted, "Already voted");
        sender.voted = true;
        events[_eventId].totalVotes += 1;
        msg.sender.transfer(0.5 ether);
        listCandidates[_eventId][_candidateId].voteCount += 1;
        emit voteCasted(_eventId, _candidateId, listCandidates[_eventId][_candidateId].voteCount, events[_eventId].totalVotes);
    }

    function isOwner () public view returns(bool){
        return msg.sender == owner;
    }

    function showOwner () public view returns(address){
        return owner;
    }


}