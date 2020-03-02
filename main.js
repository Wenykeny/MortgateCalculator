// let tb = document.getElementById('tabbody');
// tb.style.display = 'table-row-group';
//let tableview = document.getElementById('tableview');

//Hide hearline
document.getElementById('headline').style.display = 'none';
document.getElementById("resHolder").style.display = 'none';
document.getElementById("columnchart_material").style.display = 'none';

document.getElementById('loanCalc').addEventListener("submit", calcMortgage);
function calcMortgage(e) {
    e.preventDefault();
    runAll('insert');
}

function retrieveList() {
    // ************ Sendind data to server.php ************
    var theObject = new XMLHttpRequest();
    theObject.open("POST", "./server.php", true);
    theObject.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    theObject.onreadystatechange = function () {
        if (theObject.readyState === 4 && theObject.status === 200) {
            //store the object value into this property
            let jsonres = JSON.parse(theObject.responseText);

            document.getElementById('listCalc').innerHTML = "";

            for (let k = 0; k < jsonres.length; k++) {
                //console.log(jsonres[k]);
                document.getElementById('listCalc').innerHTML += '<div class="list-group-item list-group-item-action" id="' + jsonres[k] + '" onclick="retrieveData(this.id)" style="background-color: aqua;"> <label style="height:10px; "> ' + jsonres[k] + ' </label> </div>';
            }
        }
    }
    theObject.send("requestList=");
    // ******************* End ******************
}
retrieveList();

function retrieveData(id) {
    // ************ Sendind data to server.php ************
    var theObject = new XMLHttpRequest();
    theObject.open("POST", "./server.php", true);
    theObject.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    theObject.onreadystatechange = function () {
        if (theObject.readyState === 4 && theObject.status === 200) {
            //store the object value into this VARIABLE
            let jsonres = JSON.parse(theObject.responseText);

            document.getElementById('mortgageName')["value"] = id;
            document.getElementById('purchasePrice')["value"] = jsonres["purchase"];
            document.getElementById('depositAmount')["value"] = jsonres["deposit"];
            document.getElementById('interestRate')["value"] = jsonres["interest"];
            document.getElementById('numbYear')["value"] = jsonres["bondyear"];
            runAll('calculate');
        }
    }
    theObject.send("requestData=&name=" + id);
    // ******************* End ******************
}

let arrayResponse = new Array();
function runAll(ex) {
    let mortgageName = document.getElementById('mortgageName')["value"];
    let purchasePrice = document.getElementById('purchasePrice')["value"];
    let depositAmount = document.getElementById('depositAmount')["value"];
    let interestRate = document.getElementById('interestRate')["value"];
    let numbYear = document.getElementById('numbYear')["value"];

    if (!isNaN(purchasePrice) && !isNaN(depositAmount) && !isNaN(interestRate) && !isNaN(numbYear)) {
        // Calculate
        let principal = parseFloat((purchasePrice - depositAmount).toString());
        let calcInterest = parseFloat((interestRate / 100 / 12).toString());
        let noMonths = parseFloat((numbYear * 12).toString());

        // Fill the card boxes
        document.getElementById('info-purchase').innerHTML = ('Purchase Price:  R' + purchasePrice);
        document.getElementById('info-deposit').innerHTML = ('Deposit Amount: R' + depositAmount);
        document.getElementById('info-loan').innerHTML = ('Loan Amount: R' + principal);
        document.getElementById('info-interest').innerHTML = ('Interest Rate: ' + interestRate + '%');
        document.getElementById('info-bondTerm').innerHTML = ('Bond Term: ' + numbYear + ' Years');


        let r = Math.pow(1 + calcInterest, noMonths);
        let monthly = parseFloat(((principal * calcInterest * r) / (r - 1)).toFixed(2));
        let balance = principal, principalYear = 0, interestYear = 0, totalPrincipal = 0, tP = 0,
            totalInterst = 0, tI = 0, count = 0;
        let arrayRes = new Array();

        // Start **** Calculatation 
        for (let index = 1; index <= noMonths; index++) {
            interestYear = parseFloat(((balance * (interestRate / 100)) / 12).toFixed(2));
            principalYear = parseFloat((monthly - interestYear).toFixed(2));
            balance = parseFloat((balance - principalYear).toFixed(2));

            totalPrincipal += parseFloat((principalYear).toFixed(2));
            totalInterst += parseFloat((interestYear).toFixed(2));
            tI += parseFloat((interestYear).toFixed(2));

            // It adds the values into the array, for every 12 cicles
            if (index % 12 == 0) {
                arrayRes.push([count + 1, totalInterst.toFixed(2), totalPrincipal.toFixed(2)]);
                interestYear = 0, principalYear = 0, totalPrincipal = 0, totalInterst = 0;
                count++;
            }
        }// end

        arrayResponse = arrayRes;
        // Clear Table and card boxes
        document.getElementById('holdtable').innerHTML = "";
        document.getElementById('info-monthly').innerHTML = "0";
        document.getElementById('info-totalRate').innerHTML = "0";
        document.getElementById('info-totalPay').innerHTML = "0";

        //Show hearline
        document.getElementById('headline').style.display = 'inline';

        // Start **** Create table and thead 
        var tableview = document.createElement('table');
        tableview.setAttribute('class', 'table table-sm table-bordered');
        document.getElementById('holdtable').appendChild(tableview);

        var header = document.createElement('thead');
        header.setAttribute('class', 'thead-dark');
        tableview.appendChild(header);

        var tr = document.createElement('tr');
        header.appendChild(tr);

        var th1 = document.createElement('th');
        tr.appendChild(th1);
        var cell1 = document.createTextNode('Year');
        th1.appendChild(cell1);

        var th2 = document.createElement('th');
        tr.appendChild(th2);
        var cell2 = document.createTextNode('Interest %');
        th2.appendChild(cell2);

        var th3 = document.createElement('th');
        tr.appendChild(th3);
        var cell3 = document.createTextNode('Capital %');
        th3.appendChild(cell3);

        var body = document.createElement('tbody');
        tableview.appendChild(body);


        if (ex === 'insert') {
            // ************ Sendind data to server.php and show results ************
            var theObject = new XMLHttpRequest();
            theObject.open("POST", "./server.php", true);
            theObject.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
            theObject.onreadystatechange = function () {
                if (theObject.readyState === 4 && theObject.status === 200) {
                    //store the object value into this variable
                    let res = theObject.responseText;

                    if (res == 'inserted') {
                        //Response from the server
                        document.getElementById("response").innerHTML = "<strong>'" + mortgageName + "'</strong> was successfully stored.";

                        // Fill the card boxes results
                        document.getElementById('info-monthly').innerHTML = (' R' + monthly);
                        document.getElementById('info-totalRate').innerHTML = (' R' + tI.toFixed(2));
                        document.getElementById('info-totalPay').innerHTML = (' R' + (tI + principal).toFixed(2));

                        for (let i = 0; i < arrayRes.length; i++) {
                            // Create rows and cell, and populate the table
                            var tr1 = document.createElement('tr');
                            body.appendChild(tr1);
                            var td1 = document.createElement('td');
                            tr1.appendChild(td1);
                            var td2 = document.createElement('td');
                            tr1.appendChild(td2);
                            var td3 = document.createElement('td');
                            tr1.appendChild(td3);

                            for (let j = 0; j < arrayRes[i].length; j++) {
                                //var cel1 = document.createTextNode('2');
                                if (j === 0) td1.appendChild(document.createTextNode(arrayRes[i][j]));
                                if (j === 1) td2.appendChild(document.createTextNode(((arrayRes[i][j] / (monthly * 12)) * 100).toFixed(2) + '%'));
                                if (j === 2) td3.appendChild(document.createTextNode(((arrayRes[i][j] / (monthly * 12)) * 100).toFixed(2) + '%'));
                            }
                        }//end
                        document.getElementById("resHolder").style.display = 'block';
                        document.getElementById("columnchart_material").style.display = "block";
                        retrieveList();
                        drawChart();
                    } else if (res == 'not inserted') {
                        document.getElementById("resHolder").style.display = 'block';
                        document.getElementById("response").innerHTML = 'Record was not inserted. Please, try it again.';
                        document.getElementById("columnchart_material").style.display = "none";
                    } else {
                        document.getElementById("resHolder").style.display = 'block';
                        document.getElementById("response").innerHTML = 'Please, select other name and press "Calculate" again.';
                        document.getElementById("columnchart_material").style.display = "none";
                    }
                }
            }
            theObject.send("sendData=save&name=" + mortgageName + "&price=" + purchasePrice + "&deposit=" + depositAmount + "&interest=" + interestRate + "&year=" + numbYear);
            //******************* End ******************
        }
        if (ex === 'calculate') {
            // Fill the card boxes results
            document.getElementById('info-monthly').innerHTML = (' R' + monthly);
            document.getElementById('info-totalRate').innerHTML = (' R' + tI.toFixed(2));
            document.getElementById('info-totalPay').innerHTML = (' R' + (tI + principal).toFixed(2));

            for (let i = 0; i < arrayRes.length; i++) {
                // Create rows and cell, and populate the table
                var tr1 = document.createElement('tr');
                body.appendChild(tr1);
                var td1 = document.createElement('td');
                tr1.appendChild(td1);
                var td2 = document.createElement('td');
                tr1.appendChild(td2);
                var td3 = document.createElement('td');
                tr1.appendChild(td3);

                for (let j = 0; j < arrayRes[i].length; j++) {
                    //var cel1 = document.createTextNode('2');
                    if (j === 0) td1.appendChild(document.createTextNode(arrayRes[i][j]));
                    if (j === 1) td2.appendChild(document.createTextNode(((arrayRes[i][j] / (monthly * 12)) * 100).toFixed(2) + '%'));
                    if (j === 2) td3.appendChild(document.createTextNode(((arrayRes[i][j] / (monthly * 12)) * 100).toFixed(2) + '%'));
                }
            }//end
            document.getElementById("resHolder").style.display = 'none';
            document.getElementById("columnchart_material").style.display = "block";
            drawChart();
        }

    } else {
        document.getElementById("resHolder").style.display = 'block';
        document.getElementById("response").innerHTML = 'Input fields must contain only digits!';
    }
}

google.charts.load('current', { 'packages': ['bar'] });
//google.charts.setOnLoadCallback(drawChart);

function drawChart() {
    var data = google.visualization.arrayToDataTable([]);
    data.addColumn('string', 'year');
    data.addColumn('number', 'Interest');
    data.addColumn('number', 'Capital');
    var d = new Date().getFullYear();

    for (let i = 0; i < arrayResponse.length; i++) {
        data.addRows([
            [d.toString(), parseInt(arrayResponse[i][1]), parseInt(arrayResponse[i][2])]
        ]);
        d += 1;
    }//end

    var options = {
        title: 'Stacked bar graph',
        legend: { position: 'top', maxLines: 3 },
        bar: { groupWidth: '75%' },
        isStacked: true,
    };

    var chart = new google.charts.Bar(document.getElementById('columnchart_material'));
    chart.draw(data, google.charts.Bar.convertOptions(options));

}