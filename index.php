<!doctype html>
<html lang="en">

<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
    <title>Mortgage Calculator</title>

    <!-- Bootstrap CSS -->
    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/css/bootstrap.min.css"
        integrity="sha384-Vkoo8x4CGsO3+Hhxv8T/Q5PaXtkKtu6ug5TOeNV6gBiFeWPGFN9MuhOf23Q9Ifjh" crossorigin="anonymous">

    <title>Hello, world!</title>
</head>

<body>
    <!-- Main form -->
    <section>
        <div class="jumbotron jumbotron-fluid">
            <div class="container">
                <h1 class="display-4">Mortgage Calculator</h1>
                <p class="lead">This allows you to determine your estimated payments for loan amounts, interest rates
                    and terms.</p>
                <div class="alert alert-warning alert-dismissible fade show " id="resHolder" role="alert">
                    <span id="response">You should check in on some of those fields below.....</span>

                    <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <br>

                <form id="loanCalc">
                    <div class="form-row">
                        <div class="form-group col-md-8">
                            <div class="form-row">
                                <div class="col-md-4 mb-3">
                                    <label for="validationDefaultUsername">Mortgage Name</label>
                                    <div class="input-group">
                                        <div class="input-group-prepend">
                                            <span class="input-group-text" id="inputGroupPrepend2">Name </span>
                                        </div>
                                        <input type="text" class="form-control" id="mortgageName" value="Mortgage 1"
                                            placeholder="..." aria-describedby="inputGroupPrepend2" required>
                                    </div>
                                </div>
                            </div>
                            <div class="form-row">
                                <div class="col-md-4 mb-3">
                                    <label for="validationDefaultUsername">Purchase Price</label>
                                    <div class="input-group">
                                        <div class="input-group-prepend">
                                            <span class="input-group-text" id="inputGroupPrepend2">R</span>
                                        </div>
                                        <input type="text" class="form-control" id="purchasePrice" value="100000"
                                            aria-describedby="inputGroupPrepend2" required>
                                    </div>
                                </div>
                                <div class="col-md-4 mb-3">
                                    <label for="validationDefaultUsername">Deposit Amount</label>
                                    <div class="input-group">
                                        <div class="input-group-prepend">
                                            <span class="input-group-text" id="inputGroupPrepend2">R</span>
                                        </div>
                                        <input type="text" class="form-control" id="depositAmount" value="20000"
                                            aria-describedby="inputGroupPrepend2" required>
                                    </div>
                                </div>
                            </div>
                            <div class="form-row">
                                <div class="col-md-4 mb-3">
                                    <label for="validationDefaultUsername">Fixed Interest Rate</label>
                                    <div class="input-group">
                                        <div class="input-group-prepend">
                                            <span class="input-group-text" id="inputGroupPrepend2">%</span>
                                        </div>
                                        <input type="text" class="form-control" id="interestRate" value="5"
                                            aria-describedby="inputGroupPrepend2" required>
                                    </div>
                                </div>
                                <div class="col-md-4 mb-3">
                                    <label for="validationDefaultUsername">Number of Years (Bond Term)</label>
                                    <div class="input-group">
                                        <div class="input-group-prepend">
                                            <span class="input-group-text" id="inputGroupPrepend2">🗓</span>
                                        </div>
                                        <input type="text" class="form-control" id="numbYear" value="30"
                                            aria-describedby="inputGroupPrepend2" required>
                                    </div>
                                </div>
                            </div>
                            <div class="form-row">
                                <button class="btn btn-outline-success btn-lg" type="submit">Calculate</button>
                                <!-- <button class="btn btn-outline-success btn-lg" type="submit">Save Cal</button> -->
                            </div>
                        </div>

                        <div class="form-group col-md-4" >
                            <h4>Saved Mortgage Calculations</h4>
                            <div class="list-group list-group-flush" style="height:200px; overflow-y: auto;  ">
                                <div class="list-group-item list-group-item-action" id="listCalc" style="padding: 4px;">

                                </div>
                            </div>
                        </div>
                    </div>

                    <br><br>

                    <div class="form-group">
                        <h3 class="display-5">Results</h3>
                        <div class="row ">
                            <div class="form-check">
                                <div class="card" style="width: 16rem;background-color:white;">
                                    <div class="card-body">
                                        <h5 class="card-title">Input Values</h5>
                                        <h6 class="card-subtitle mb-2 text-muted" id="info-purchase">Purchase Price:
                                        </h6>
                                        <h6 class="card-subtitle mb-2 text-muted" id="info-deposit">Deposit Amount:
                                        </h6>
                                        <h6 class="card-subtitle mb-2 text-muted" id="info-loan">Loan Amount: </h6>
                                        <h6 class="card-subtitle mb-2 text-muted" id="info-interest">Interest Rate:
                                        </h6>
                                        <h6 class="card-subtitle mb-2 text-muted" id="info-bondTerm">Bond Term: </h6>
                                    </div>
                                </div>
                            </div>
                            <div class="form-check">
                                <div class="card" style="width: 16rem;background-color: aquamarine;">
                                    <div class="card-body">
                                        <h5 class="card-title">Monthly Payment</h5>
                                        <h6 class="card-subtitle mb-2 text-muted" id="info-monthly">0</h6>
                                    </div>
                                </div>
                            </div>
                            <div class="form-check">
                                <div class="card" style="width: 12rem; background-color: coral;">
                                    <div class="card-body">
                                        <h5 class="card-title">Total Interest</h5>
                                        <h6 class="card-subtitle mb-2 text-muted" id="info-totalRate">0</h6>
                                    </div>
                                </div>
                            </div>
                            <div class="form-check">
                                <div class="card" style="width: 16rem;background-color: cyan;">
                                    <div class="card-body">
                                        <h5 class="card-title">Total of 360 Payments</h5>
                                        <h6 class="card-subtitle mb-2 text-muted" id="info-totalPay">0</h6>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </form>

            </div>

            <div class="container" id="graph">
                <hr>
                <div id="columnchart_material" style="width: 100%; height: 500px;"></div>
                <hr>
            </div>

            <div class="container">
                <h3 class="display-5" id="headline">Mortgage Amortization Schedule</h3>

                <div id="holdtable">

                </div>
            </div>
        </div>
    </section>

    <footer>
        <div class="d-flex justify-content-center">
            BBSoft
        </div>
        <div class="d-flex justify-content-center">
            <strong>Copyright &copy; 2020,<a href="#">&nbsp;Moises Borracha</a>.</strong> &nbsp;All rights reserved.
        </div>
    </footer>

    <!-- JavaScript -->
    <script src="https://code.jquery.com/jquery-3.4.1.slim.min.js"
        integrity="sha384-J6qa4849blE2+poT4WnyKhv5vZF5SrPo0iEjwBvKU7imGFAV0wwj1yYfoRSJoZ+n"
        crossorigin="anonymous"></script>
    <script src="https://cdn.jsdelivr.net/npm/popper.js@1.16.0/dist/umd/popper.min.js"
        integrity="sha384-Q6E9RHvbIyZFJoft+2mJbHaEWldlvI9IOYy5n3zV9zzTtmI3UksdQRVvoxMfooAo"
        crossorigin="anonymous"></script>
    <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/js/bootstrap.min.js"
        integrity="sha384-wfSDF2E50Y2D1uUdj0O3uMBJnjuUD4Ih7YwaYd1iqfktj0Uod8GCExl3Og8ifwB6"
        crossorigin="anonymous"></script>
    <!-- <script src="https://canvasjs.com/assets/script/canvasjs.min.js"></script> -->
    <script type="text/javascript" src="https://www.gstatic.com/charts/loader.js"></script>
    <script src="main.js"></script>

    <?php //require_once 'chart.php'; ?>

</body>

</html>