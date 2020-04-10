const TURN_PERCENT = 100;
// Hold the number of calculators objects created
let calculatorNum = 0;
let totalNum = 0;
let calculatorRowNum = [];

// A calculator Table, Need a Div Tag with the class "calculator"
function CalculatorTable() {
    // represent the number of calculators created
    this.count = 1;
    this.tbl = document.createElement("table");
    this.body = document.createElement("tbody");
    this.tbl.className = "table table-bordered";
    this.body.className = "container";
    this.inputData = [];
    this.inputData.id = "calculatorArray";

    this.tbl.appendChild(this.body);

    // -------------Generate the heading----------------
    this.genHead = function () {
        let tableHead = document.createElement("thead");
        let heading = document.createElement("tr");

        let num = document.createElement("th");
        let mark = document.createElement("th");
        let outOf = document.createElement("th");
        let percent = document.createElement("th");
        // The heading of the calculator table
        num.innerHTML = "#";
        mark.innerHTML = "Mark";
        outOf.innerHTML = "Out Of";
        percent.innerHTML = "%";

        heading.appendChild(num);
        heading.appendChild(mark);
        heading.appendChild(outOf);
        heading.appendChild(percent);
        tableHead.appendChild(heading);
        this.tbl.appendChild(tableHead);

    }
    // -------------A button to add Rows----------------
    this.addButton = function () {
        let add = document.createElement("tfoot");
        let addRow = document.createElement("tr");
        // Creating the button itself
        let addCell = document.createElement("th");
        addCell.colSpan = "4";
        let plusButton = document.createElement("button");
        plusButton.innerHTML = "+";
        plusButton.className = "addButton";

        plusButton.setAttribute("onclick", "createRow()");

        addCell.appendChild(plusButton);
        addRow.appendChild(addCell);
        add.appendChild(addRow);
        this.tbl.appendChild(add);
    }
    // -----------------Method for adding a row-----------------------
    this.newRow = function () {
        let row = document.createElement("tr");
        // The row id / number
        let rowNum = document.createElement("td");
        let label = document.createElement("label");
        label.innerHTML = this.count;

        // Will represent the assignment percentage; the output
        let percentValue = document.createElement("label");
        percentValue.id = "percent" + this.count;


        rowNum.appendChild(label);
        row.appendChild(rowNum);

        // Put in the objects array, stores values and entire row
        let arrayRow = [];

        // Create the other three cells
        for (let i = 0; i < 3; i++) {
            let cell = document.createElement("td");

            // ----Making the percentage/output cell----
            if (i == 2) {
                cell.appendChild(percentValue);
                row.appendChild(cell);
                // All the values in the array representing a row, pushed to the obj's array
                this.inputData.push(arrayRow);
                continue;
            }

            // Input data
            let input = document.createElement("input");
            input.className = "form-control";
            input.type = "number";

            //When user inputs a number, put the value in an array representing the row.
            input.oninput = function () {
                arrayRow[i] = input.value;
                arrayRow[2] = (arrayRow[0] / arrayRow[1]);


                // Keep percentage column value from NaN
                if (Number.isNaN(arrayRow[2]) || !Number.isFinite(arrayRow[2])) {
                    percentValue.innerHTML = "";
                } else {
                    percentValue.innerHTML = ((parseFloat(arrayRow[2])) * TURN_PERCENT).toFixed(2) + "%";
                }
            }
            cell.appendChild(input);
            row.appendChild(cell);

        }
        calculatorRowNum.push(row);
        this.body.appendChild(row);
        // The number of calculators that have been created
        this.count++;
    }
    //---------------------------------------------------------------

    document.getElementsByClassName("calculator")[calculatorNum].appendChild(this.tbl);
    calculatorNum++;
}


// Creates a new row for the calculator table
function createRow() {
    calNoLogin.newRow();
}


// Calculate the total percentage for the calculator
function findTotal() {
    let totalCalucation = 0;
    let rowCount = calNoLogin.inputData.length;
    for (let i = 0; i < rowCount; i++) {
        totalCalucation += calNoLogin.inputData[i][2];

    }
    // Make the output look nice
    totalCalucation = (totalCalucation * 100).toFixed(2);
    totalCalucation /= rowCount;

    document.getElementById("totalNoLogin").innerHTML = "Total: " + totalCalucation + "%";
}



// An object for the total percentage
function Total() {
    this.total = document.createElement("label");
    this.total.innerHTML = "Total:";

    document.getElementsByClassName("total")[totalNum].appendChild(this.total);
}

//-------------------------------------------------------------------
// Keeps track of how many folder there are, also used for id
let tabCount = 0;

// This function creates the folder/Tabs for the given subject
function createFolder() {
    let tab = document.getElementById("courseTab");
    let newFolder = document.createElement("a");
    // Setting attributes
    newFolder.setAttribute("class", "nav-item nav-link");
    newFolder.setAttribute("data-toggle", "tab");
    newFolder.setAttribute("role", "tab");
    newFolder.setAttribute("aria-selected", "false")

    // important iDs
    let ariaConId = "nav-" + tabCount
    newFolder.setAttribute("aria-controls", ariaConId);

    let toSendHRef = "#nav-" + tabCount;
    newFolder.setAttribute("href", toSendHRef);

    let courseTabID = "nav-" + tabCount + "-tab"
    newFolder.setAttribute("id", courseTabID);


    newFolder.innerHTML = document.getElementById("TypeOfCourse").value;

    //Set up the actual folder and Append the #courseFolder
    let sendAriaLabelled = "nav-" + tabCount + "-tab";

    // Generate the insides of the folder
    insideTab = generatetabPanel(sendAriaLabelled, ariaConId);




    tab.insertBefore(newFolder, tab.childNodes[0]);
    tabCount++;
}










