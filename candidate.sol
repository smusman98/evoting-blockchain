pragma solidity >= 0.4.22 <0.9.0;

contract Candidate {

    uint256 public totalCandidates;
    uint256 public totalVotes;

    constructor() public {
        totalCandidates = 0;
        totalVotes = 0;
    }

    struct candidate {
        uint256 id;
        string name;
        string area;
        string email;
        uint256 votesReceived;
    }

    struct voter {
        uint256 candidateId;
        address walletAddress;
    }

    candidate[] public candidates;
    voter[] public voters;

    event candidateEvent(uint256 id, string name, string area, string email, uint256 votesReceived);

    function getCandidates(uint256 _id) public view returns(uint256, string memory, string memory, string memory, uint256) {
        return ( candidates[_id].id, candidates[_id].name, candidates[_id].area, candidates[_id].email, candidates[_id].votesReceived );
    }

    function getCandidatesCount() public returns( uint256 _totalCandidates ) {
        _totalCandidates = totalCandidates;
        return _totalCandidates;
    }

    function insert(string memory name, string memory area, string memory email ) public returns (uint256 _totalCandidates) {
        
        uint256 votesReceived = 0;
        uint256 id = totalCandidates + 1;
        candidate memory newCandidate = candidate(id, name, area, email, votesReceived);
        candidates.push(newCandidate);
        totalCandidates++;

        _totalCandidates = totalCandidates;

        emit candidateEvent(id, name, area, email, votesReceived);
        return _totalCandidates;
    }

    function updateCandidate(uint256 id, string memory name, string memory area, string memory email, uint256 votesReceived) public {
        for( uint256 i = 0; i <= totalCandidates; i++ ) {
            if( candidates[i].id == id ) {
                candidates[i].name = name;
                candidates[i].area = area;
                candidates[i].email = email;
                candidates[i].votesReceived = votesReceived;
                break;
            }
        }
    }

    function voteCandidate(uint candidateId, address _walletAddress) public {
        bool voted = false;
        for (uint i=0; i< totalVotes; i++)
        {
            if (voters[i].walletAddress == _walletAddress)
            {
                voted = true;
            }
        }
        if( !voted ) {
            for( uint256 i = 0; i <= totalCandidates; i++ ) {
                if( candidates[i].id == candidateId ) {
                    candidates[i].votesReceived = candidates[i].votesReceived + 1;
                    voter memory newVote = voter(candidateId, _walletAddress);
                    voters.push(newVote);
                    totalVotes++;
                    break;
                }
            }
        }   
    } 
    
}