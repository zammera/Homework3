/* 
File: script.js 
 GUI Assignment:  Creating a Dynamic Multipication table using JS 
 Allen Zammer, UMass Lowell Computer Science, allen_zammer@student.uml.edu 
 Copyright (c) 2024 by Allen.  All rights reserved.  May be freely copied or 
 excerpted for educational purposes with credit to the author. 
 updated by AZ on October 30, 2024 at  11:59 PM */
function validTableCreation() {
    let xMin = document.getElementById('xMin').value;
    let xMax = document.getElementById('xMax').value;
    let yMin = document.getElementById('yMin').value;
    let yMax = document.getElementById('yMax').value;
    let xSwitch = false, ySwitch = false, xOutBounce = false, yOutBounce = false, xNotNum = false, yNotNum = false, nonSwitchError = false;
    var temp;

    tableContainer = document.getElementById('errorX');  
    tableContainer.innerHTML = ""; 
    tableContainer = document.getElementById('errorY');  
    tableContainer.innerHTML = ""; 
    
    if (!isNaN(xMin) && !isNaN(xMax) && xMin > xMax) {
        temp = xMin;
        xMin = xMax;
        xMax = temp;
        xSwitch = true;
    }
    if (!isNaN(yMin) && !isNaN(yMax) && yMin > yMax) {
        temp = yMin;
        yMin = yMax;
        yMax = temp;
        ySwitch = true;
    }
    if (xMin < -100 || xMax > 100) {
        xOutBounce = true;
    }
    if (yMin < -100 || yMax > 100 ) {
        yOutBounce = true;
    }
    if (Number.isInteger(xMin) || Number.isInteger(xMax) || Number.isNaN(parseInt(xMin)) || Number.isNaN(parseInt(xMax))) {
        xNotNum = true;
    } 
    if (Number.isInteger(yMin) || Number.isInteger(yMax) || Number.isNaN(parseInt(yMin)) || Number.isNaN(parseInt(yMax))) {
        yNotNum = true;
    } 

    var x = xMax - xMin;
    var y= yMax - yMin;
    var xVal = [xMin, xMax];
    var yVal = [yMin, yMax];

    if (xSwitch && !(xOutBounce) && !(xNotNum)) { 
        error(0);
    }
    if (xOutBounce) {
        error(1);
        nonSwitchError = true;
    }
    if (xNotNum) {
        error(2);
        nonSwitchError = true;
    }
    if (ySwitch) { 
        error(3);
    }
    if (yOutBounce) {
        error(4);
        nonSwitchError = true;
    }
    if (yNotNum) {
        error(5);
        nonSwitchError = true;
    }


    if ( nonSwitchError ) {
        console.log("Something occured that made the table unrenderable.");
    } else {
        tableCreate(y, x, xVal, yVal);
    }



    
}

function tableCreate(rows, cols, xVal, yVal) {
    //data[xMin, xMax, yMin, yMax]
    let table = '<table id="table">';
    table += '<tr><th id="special"></th>'
    for (let t = xVal[0]; t <= xVal[1]; t++) {
        table+= `<th id="first-row"> ${ t } </th>`;
    }
     table += '</tr>'
    for (let i = 0; i<= rows; i++) {  
        table += '<tr>';  
        for (let j = 0; j <= cols + 1; j++) { 
            if( j == 0){
                table += `<th id="first-col"> ${ i + parseInt(yVal[0]) }</th>`
            } else {
                table += `<td>${(i + parseInt(yVal[0])) * (parseInt(xVal[0]) + j - 1)}</td>`;  
            }
        }  
        table += '</tr>';  
    } 
    table += '</table>';  
    tableContainer = document.getElementById('tableCont');  
    tableContainer.innerHTML = table;  
}

//error 
//xSwitch = 0
//xOutBounce = 1
//xNotNum = 2
//ySwitch = 3
//yOutBounce = 4
//yNotNum = 5
function error( errorCase) {
    switch (errorCase) {
        case 0:
            console.log("Warning Swtich X Values");
            tableContainer = document.getElementById('errorX');  
            tableContainer.innerHTML = '<span id="warning">WARNING: Minimum value was larger than Maxium value.</span>'; 
            break;
        case 1:
            console.log("Error X Values Out of Bounce");
            tableContainer = document.getElementById('errorX');  
            tableContainer.innerHTML = '<span id="error">ERROR: Minimum or Maxium value is Out of Bounce. Please make sure these values are a number between -100 and 100.</span>'; 
            break;
        case 2:
            console.log("Error X Values Not a Number");
            tableContainer = document.getElementById('errorX');  
            tableContainer.innerHTML = '<span id="error">ERROR: Minimum or Maxium value is not a number. Please enter numbers between -100 and 100.</span>'; 
            break;
        case 3:
            console.log("Warning Switch Y Values");
            tableContainer = document.getElementById('errorY');  
            tableContainer.innerHTML = '<span id="warning">WARNING: Minimum value was larger than Maxium value.</span>'; 
            break;
        case 4:
            console.log("Error Y Values Out of Bounce");
            tableContainer = document.getElementById('errorY');  
            tableContainer.innerHTML = '<span id="error">ERROR: Minimum or Maxium is Out of Bounce. PLease make sure these values are a number between -100 and 100.</span>'; 
            break;
        case 5:
            console.log("Error Y Values Not a Number");
            tableContainer = document.getElementById('errorY');  
            tableContainer.innerHTML = '<span id="error">ERROR: Minimum or Maxium value is not a number. Please enter numbers between -100 and 100.</span>'; 
            break;
    }
}