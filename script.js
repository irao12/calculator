function add(num1, num2) {
    return num1 + num2;
}

function subtract(num1, num2) {
    return num1 - num2;
}

function multiply(num1, num2){
    return num1 * num2;
}

function divide(num1, num2) {
    return num1 / num2;
}

function operate(operator, num1, num2) {
    console.log(num1);
    switch (operator){
        case '+' :
            return add(num1, num2);
        case '-' :
            return subtract(num1, num2);
        case '*' :
            return multiply(num1, num2);
        case '/' :
            return divide(num1, num2);
    }
}

function setup(){

    let firstNum = NaN;
    let secondNum = NaN;
    let currOperation = "";

    // stores the current number as a string
    let currNum = "";

    // stores whether we are updating the second number
    let isSecondNum = false;
    // stores whether a decimal point has been added
    let hasDecimal = false;

    const numberButtons = document.querySelectorAll(".number");

    const num = document.querySelector('#num');
    const equation = document.querySelector('#equation');

    numberButtons.forEach( (btn) => {
        btn.addEventListener('click', (butt) => {
            if (equation.textContent == 'none' || currOperation != ''){
                let currDigit = butt.target.textContent;
                currNum += currDigit;
                num.textContent += currDigit;

                // parse currNum into a float and set the appropriate number to it
                if (!isSecondNum) {
                    firstNum = Number.parseFloat(currNum);
                }
                else {
                    secondNum = Number.parseFloat(currNum);
                }
            }
        })
    });

    document.querySelector("#decimal").addEventListener('click', ()=>{
        // if the current number does not have a decimal yet, add one
        if (!hasDecimal) {
            currNum += "."
            num.textContent += ".";
            hasDecimal = true;
        }
    });

    const operators = document.querySelectorAll('.operator');

    operators.forEach( (operator) => {
        operator.addEventListener('click', (e) => {
            // if only the first number has been entered, move onto the second
            if (!isSecondNum) {
                currNum = "";
                num.textContent +=  e.target.textContent ;
                isSecondNum = true;
                currOperation = e.target.textContent;
            }

            else {
                if (currOperation == "/" && secondNum == 0){
                    window.alert("Cannot divide by zero!");
                }
                // if the secondNum has not been entered (last thing entered was an operator)
                // change the operator and update screen
                else if (!secondNum && currOperation != ''){
                    currOperation = e.target.textContent;
                    num.textContent = num.textContent.substring(0, num.textContent.length-1) 
                                      + e.target.textContent;
                }

                else{
                    equation.textContent = num.textContent + " =";
                    let result = operate(currOperation, firstNum, secondNum);
                    firstNum = result;
                    if (!Number.isInteger(result)){
                        result = +result.toFixed(8);
                    }
                    num.textContent = result;

                    secondNum = NaN;
                    currOperation = e.target.textContent;
                    num.textContent +=  currOperation ;
                    isSecondNum = true;
                    currNum = "";
                }
            }
        });
    });

    document.querySelector('#equal').addEventListener('click', () => {
        if (currOperation == "/" && secondNum == 0) {
            window.alert("Cannot divide by zero!");
        }
        else if (secondNum && currOperation != ''){
            equation.textContent = num.textContent + " =";
            let result = operate(currOperation, firstNum, secondNum);
            firstNum = result;
            if (!Number.isInteger(result)) {
                result = +result.toFixed(10);
            }

            num.textContent = result;
            currOperation = '';
            
            secondNum = NaN;
            isSecondNum = false;
            currNum = result;
        }
    });


    document.querySelector("#clear").addEventListener('click', () => {
        num.textContent = '';
        equation.textContent = 'none'
        currNum = "";
        firstNum = NaN;
        secondNum = NaN;
        isSecondNum = false;
        hasDecimal = false;
    });

    document.querySelector("#delete").addEventListener('click', () => {
        let text = num.textContent;
        
        if (equation.textContent == 'none' || isSecondNum){
            const deleted = text[text.length - 1];
            num.textContent = text.substring(0, num.textContent.length - 1);

            if (deleted == '-' || deleted == '+' || deleted == '/' || deleted == '*') {
                currOperation = '';
                isSecondNum = false;
                currNum = firstNum;
            }

            else if (Number.isFinite(Number.parseFloat(deleted))) {
                currNum = currNum.substring(0, currNum.length - 1);
                if (!isSecondNum) {
                    firstNum = Math.floor(firstNum / 10);
                }
                else {
                    secondNum = Math.floor(secondNum / 10);
                }
            }
        }
    });
}

setup();

