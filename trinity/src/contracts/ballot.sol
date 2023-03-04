pragma solidity ^0.4.17;

// contract for voting in a ballot
contract Ballot{
    address public owner;
    struct Voter{
        uint weight;
        bool voted;
        uint vote;
        string name;
    }
    // struct for a proposal
    struct Candidate{
        string name;
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
    mapping(uint => Candidate) listCandidates;

    constructor() public{
        owner = msg.sender;
    }

    Event[] public events;

    // create voting event
    function createEvent(string _name, string _endTime, uint _expectedVotes, string[] _candidateNames, uint[] _candidateIds, uint evenId) public{
        require(msg.sender == owner, "Only the owner can create an event");
        events.push(Event({
            name: _name,
            endTime: _endTime,
            expectedVotes: _expectedVotes,
            totalVotes: 0,
        }));

        // create candidates and map them to the event
        for(uint i = 0; i < _candidateNames.length; i++){
            listCandidates[evenId] = (Candidate({
                name: _candidateNames[i],
                id: _candidateIds[i],
                voteCount: 0
            }));
        }
    }
}