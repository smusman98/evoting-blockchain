var _account = '';
var votingContract = '';
var lastCandidateID = 0;

const connectToMetamask = async () => {
    if( window.ethereum !== "undefined" ) {
        console.log( 'Connecting..' );
        var accounts = await ethereum.request({method: "eth_requestAccounts"});
        var walletAddress = accounts[0];
        console.log( 'Connected!' );

        //If wallet connected
        processAuth( walletAddress );
    }
}

const isConnected = () => {
    var isConnected = false;

    if( window.ethereum.selectedAddress !== null ) {
        isConnected = true;
    }
    return isConnected;
}

const getWalledID = () => {
    var walletID = false;

    if( window.ethereum.selectedAddress !== null ) {
        walletID = window.ethereum.selectedAddress;
    }

    return walletID;
}

const processAuth = ( walletAddress ) => {
    $( '.connect-wallet' ).hide();
    $( '.wallet-connected' ).show();
    $( '.wallet-address' ).text( `Wallet Address ${walletAddress}` );
    connectContract( walletAddress );

}

const getABI = () => {
    return [
        {
            "inputs": [],
            "stateMutability": "nonpayable",
            "type": "constructor"
        },
        {
            "anonymous": false,
            "inputs": [
                {
                    "indexed": false,
                    "internalType": "uint256",
                    "name": "id",
                    "type": "uint256"
                },
                {
                    "indexed": false,
                    "internalType": "string",
                    "name": "name",
                    "type": "string"
                },
                {
                    "indexed": false,
                    "internalType": "string",
                    "name": "area",
                    "type": "string"
                },
                {
                    "indexed": false,
                    "internalType": "string",
                    "name": "email",
                    "type": "string"
                },
                {
                    "indexed": false,
                    "internalType": "uint256",
                    "name": "votesReceived",
                    "type": "uint256"
                }
            ],
            "name": "candidateEvent",
            "type": "event"
        },
        {
            "inputs": [],
            "name": "getCandidatesCount",
            "outputs": [
                {
                    "internalType": "uint256",
                    "name": "_totalCandidates",
                    "type": "uint256"
                }
            ],
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "string",
                    "name": "name",
                    "type": "string"
                },
                {
                    "internalType": "string",
                    "name": "area",
                    "type": "string"
                },
                {
                    "internalType": "string",
                    "name": "email",
                    "type": "string"
                }
            ],
            "name": "insert",
            "outputs": [
                {
                    "internalType": "uint256",
                    "name": "_totalCandidates",
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
                    "name": "id",
                    "type": "uint256"
                },
                {
                    "internalType": "string",
                    "name": "name",
                    "type": "string"
                },
                {
                    "internalType": "string",
                    "name": "area",
                    "type": "string"
                },
                {
                    "internalType": "string",
                    "name": "email",
                    "type": "string"
                },
                {
                    "internalType": "uint256",
                    "name": "votesReceived",
                    "type": "uint256"
                }
            ],
            "name": "updateCandidate",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "uint256",
                    "name": "candidateId",
                    "type": "uint256"
                },
                {
                    "internalType": "address",
                    "name": "_walletAddress",
                    "type": "address"
                }
            ],
            "name": "voteCandidate",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "uint256",
                    "name": "",
                    "type": "uint256"
                }
            ],
            "name": "candidates",
            "outputs": [
                {
                    "internalType": "uint256",
                    "name": "id",
                    "type": "uint256"
                },
                {
                    "internalType": "string",
                    "name": "name",
                    "type": "string"
                },
                {
                    "internalType": "string",
                    "name": "area",
                    "type": "string"
                },
                {
                    "internalType": "string",
                    "name": "email",
                    "type": "string"
                },
                {
                    "internalType": "uint256",
                    "name": "votesReceived",
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
                }
            ],
            "name": "getCandidates",
            "outputs": [
                {
                    "internalType": "uint256",
                    "name": "",
                    "type": "uint256"
                },
                {
                    "internalType": "string",
                    "name": "",
                    "type": "string"
                },
                {
                    "internalType": "string",
                    "name": "",
                    "type": "string"
                },
                {
                    "internalType": "string",
                    "name": "",
                    "type": "string"
                },
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
            "name": "totalCandidates",
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
            "name": "totalVotes",
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
                    "name": "",
                    "type": "uint256"
                }
            ],
            "name": "voters",
            "outputs": [
                {
                    "internalType": "uint256",
                    "name": "candidateId",
                    "type": "uint256"
                },
                {
                    "internalType": "address",
                    "name": "walletAddress",
                    "type": "address"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        }
    ];
}

const getAddress = () => {
    return '0x0f34776ae845b258d34f8dfd2e66469a6bf81c4d';
}

const connectContract = async ( walletAddress ) => {
    const ABI = getABI();
    const Address = getAddress();
    window.web3 = await new Web3( window.ethereum );
    votingContract = await new window.web3.eth.Contract( ABI, Address, { from: walletAddress } );
    console.log( 'Connected to Contract...' );
    console.log( 'Fetching Data.' );
    votingContract.methods.getCandidatesCount().call( ( error, response ) => {
        if( error ) {
            console.log( error );
        }
        else {
            candidatesCount = response;
            for ( var i = 0; i < parseInt( candidatesCount ); i++ ) {
                votingContract.methods.getCandidates( i ).call( ( error, response ) => {
                    if( error ) {
                        console.log( error );
                    }
                    else {
                        $( '#table-candidates' ).append(
                            `<tr>
                                <td>${response[0]}</td>
                                <td>${response[1]}</td>
                                <td>${response[2]}</td>
                                <td>${response[3]}</td>
                                <td class="votes-received" >${response[4]}</td>
                                <td><button class="btn btn-secondary give-vote" data-id="${response[0]}">Vote</button></td>
                                <td>
                                    <!-- Button trigger modal -->
                                    <button type="button" class="btn btn-danger" data-bs-toggle="modal" data-bs-target="#add-candidate-${response[0]}">
                                        Edit Candidate
                                    </button>
                            
                                    <!-- Modal -->
                                    <div class="modal fade" id="add-candidate-${response[0]}" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                                        <div class="modal-dialog">
                                            <div class="modal-content">
                                                <div class="modal-header">
                                                    <h5 class="modal-title" id="staticBackdropLabel">Add Candidate</h5>
                                                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                                </div>
                                                <div class="modal-body">
                                                    <form>
                                                        <div class="mb-3 row">
                                                            <label for="edit-name-${response[0]}" class="col-sm-4 col-form-label">Candidate Name</label>
                                                            <div class="col-sm-8">
                                                                <input type="text" class="form-control" value="${response[1]}" id="edit-name-${response[0]}">
                                                            </div>
                                                        </div>
                                                        <div class="mb-3 row">
                                                            <label for="edit-city-${response[0]}" class="col-sm-4 col-form-label">Candidate City</label>
                                                            <div class="col-sm-8">
                                                                <input type="text" class="form-control" value="${response[2]}" id="edit-city-${response[0]}">
                                                            </div>
                                                        </div>
                                                        <div class="mb-3 row">
                                                            <label for="edit-email-${response[0]}" class="col-sm-4 col-form-label">Candidate Email</label>
                                                            <div class="col-sm-8">
                                                                <input type="text" class="form-control" value="${response[3]}" id="edit-email-${response[0]}">
                                                            </div>
                                                        </div>
                                                        <div class="mb-3 row">
                                                            <label class="col-sm-4 col-form-label" for="edit-votes-received-${response[0]}">Votes Received</label>
                                                            <div class="col-sm-8">
                                                                <input type="text" class="form-control" value="${response[4]}" id="edit-votes-received-${response[0]}">
                                                            </div>
                                                        </div>
                                                    </form>
                                                </div>
                                                <div class="modal-footer">
                                                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                                    <button type="button" class="btn btn-primary edit-candidate-btn" data-id="${response[0]}">Edit</button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </td>
                            </tr>`
                        )
                        lastCandidateID = parseInt( response[0]                                                            );
                    }
                } )
            }
        }
    } );
    console.log( 'Data Fetched' );
}

//If connected proceed to Auth
if( isConnected() ) {
    processAuth( getWalledID() );
}

//Add Candidate
$( document ).ready( function () {
    //Add Candidate
    $( '#add-candidate-btn' ).click( function ( e ) {
        e.preventDefault();
        var cName = $( '#candidate-name' ).val();
        var cCity = $( '#candidate-city' ).val();
        var cAddress = $( '#candidate-address' ).val();
        console.log( 'Inserting Candidate' );
        votingContract.methods.insert( cName, cCity, cAddress )
            .send()
            .then( result => {
                debugger
                if( result.status == true ) {
                    alert( 'Candidate Inserted' );
                    lastCandidateID = lastCandidateID + 1;
                    $( '#table-candidates' ).prepend(
                        `<tr>
                                <td>${lastCandidateID}</td>
                                <td>${cName}</td>
                                <td>${cCity}</td>
                                <td>${cAddress}</td>
                                <td class="votes-received" >0</td>
                                <td><button class="btn btn-secondary give-vote" data-id="${lastCandidateID}">Vote</button></td>
                                <td><button class="btn btn-danger edit-candidate" data-id="${lastCandidateID}">Edit Candidate</button></td>
                            </tr>`
                    );
                    lastCandidateID = 0;
                    console.log( 'Candidate Inserted.' );
                }
            } )
    } );

    //Insert Vote
    $( document ).on( 'click', '.give-vote', function ( e ) {
        e.preventDefault();
        var dataID = $( this ).data( 'id' );
        console.log( 'Inserting Vote.' );
        votingContract.methods.voteCandidate( dataID, getWalledID() )
            .send()
            .then( result => {
                if( result.status == true ) {
                    var currentVotes = $( this ).closest( 'tr' ).find( '.votes-received' ).text();
                    currentVotes = parseInt( currentVotes );
                    currentVotes = currentVotes + 1;
                    $( this ).closest( 'tr' ).find( '.votes-received' ).text( currentVotes );
                    alert( 'Voted.' );
                }
            } )
    } );

    //Edit Candidate
    $( document ).on( 'click', '.edit-candidate-btn', function ( e ) {
        e.preventDefault();
        var dataID = $( this ).data( 'id' );
        var eName = $( `#edit-name-${dataID}` ).val();
        var eCity = $( `#edit-city-${dataID}` ).val();
        var eEmail = $( `#edit-email-${dataID}` ).val();
        var eVotesReceived = $( `#edit-votes-received-${dataID}` ).val();
        votingContract.methods.updateCandidate( dataID, eName, eCity, eEmail, eVotesReceived )
            .send()
            .then( result => {
                console.log( result. );
                if( result.status == true ) {
                    alert( 'Edited.' );
                }
            } )
    } );
} )
