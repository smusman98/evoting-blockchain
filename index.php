<?php
include 'header.php'
?>
<section class="connect-wallet">
    <div class="container">
        <img src="assets/images/logo.png" width="100px" />
        <h2>Connect to MetaMask</h2>
        <h6>We're happy to see you</h6>
        <a href="javascript:void(0)" class="btn btn-primary" onclick="connectToMetamask()">Connect to Wallet</a>
    </div>
</section>
<section class="wallet-connected">
    <div class="container">
        <div class="center">
            <span class="badge rounded-pill bg-primary wallet-address"></span>
        </div>

        <!-- Button trigger modal -->
        <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#add-candidate">
            Add Candidate
        </button>

        <!-- Modal -->
        <div class="modal fade" id="add-candidate" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="staticBackdropLabel">Add Candidate</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        <form>
                            <div class="mb-3 row">
                                <label for="candidate-name" class="col-sm-4 col-form-label">Candidate Name</label>
                                <div class="col-sm-8">
                                    <input type="text" class="form-control" id="candidate-name">
                                </div>
                            </div>
                            <div class="mb-3 row">
                                <label for="candidate-city" class="col-sm-4 col-form-label">Candidate City</label>
                                <div class="col-sm-8">
                                    <input type="text" class="form-control" id="candidate-city">
                                </div>
                            </div>
                            <div class="mb-3 row">
                                <label for="candidate-address" class="col-sm-4 col-form-label">Candidate Email</label>
                                <div class="col-sm-8">
                                    <input type="text" class="form-control" id="candidate-address">
                                </div>
                            </div>
                        </form>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                        <button type="button" class="btn btn-primary" id="add-candidate-btn">Add Candidate</button>
                    </div>
                </div>
            </div>
        </div>
        <table class="table" id="candidates-dt" width="100%">
            <thead>
            <tr>
                <th scope="col">ID</th>
                <th scope="col">Name</th>
                <th scope="col">Area</th>
                <th scope="col">Email Address</th>
                <th scope="col">Votes Received</th>
                <th scope="col">Vote</th>
                <th scope="col">Edit</th>
            </tr>
            </thead>
            <tbody id="table-candidates">

            </tbody>
        </table>
    </div>
</section>
<?php
include 'footer.php'
?>
