const setTheme = theme => document.documentElement.className = theme;

const upper_display = document.querySelector('.upper-display');
const lower_display = document.querySelector('.lower-display');

const numbers = document.querySelectorAll('.number').forEach(numberBtn => {
    numberBtn.addEventListener('click', function (event) {
        let number = event.target.innerText.trim();

        // clear for non numerical values, except - / +
        if (isNaN(upper_display.innerText)) {
            if (upper_display.innerText == '+' || upper_display.innerText == '-') {
            } else {
                upper_display.innerText = '';
            }
        }

        //if the user start with '.' -> type '0.'
        if (number === '.' && upper_display.innerText.length == 0) {
            return upper_display.innerText += "0.";
        }

        //prevent the user from adding two dots
        if (number === '.' && upper_display.innerText.includes('.')) {
            return
        }

        if (number === '0' && upper_display.innerText[0] === '0' && upper_display.innerText.length == 1) {
            return upper_display.innerText = '0';
        }

        //if the user started with zero and enter another number from 0 or . -> start with that number
        if ((number !== '0' && number !== '.') && upper_display.innerText[0] === '0' && upper_display.innerText.length == 1) {
            return upper_display.innerText = number;
        }

        // limit the user to enter only 10 characters 
        if (upper_display.innerText.length >= 10) {
            return;
        }

        upper_display.innerText += number;

    });
});

let list_operations = [];

let operators = document.querySelectorAll('.operator').forEach(operatorBtn => {
    operatorBtn.addEventListener('click', function (event) {

        let operator = event.target.innerText.trim();
        list_operations.push(operator);

        // start numbers with + or -
        if (!upper_display.innerText || upper_display.innerText[0] === '+' || upper_display.innerText[0] === '-') {
            if (!lower_display.innerText) {
                if (operator == '-') {
                    return upper_display.innerText = '-';
                } else if (operator == '+') {
                    return upper_display.innerText = '+'
                }
            }
        }

        if (operator.toLowerCase() === 'reset') {
            lower_display.innerText = '';
            upper_display.innerText = '';
            return;
        }

        if (lower_display.innerText.length >= 25) {
            alert('History length exceeded! Please reset the calculator!');
            return;
        }

        if (operator.toLowerCase() === 'del') {
            upper_display.innerText = upper_display.innerText.slice(0, -1);
            return;
        }

        if (operator === '=') {

            if (list_operations[list_operations.length - 2] == '=') {
                return;
            }

            lower_display.innerText += upper_display.innerText;
            try {
                let result = eval(lower_display.innerText);
                if (result % 1 == 0) {
                    upper_display.innerText = result;
                } else {
                    upper_display.innerText = result.toFixed(4);
                }
            } catch (err) {
                upper_display.innerText = '';
                lower_display.innerText = '';
                alert('error in passing arguments');
            }

            return;
        }

        if (!lower_display.innerText) {
            lower_display.innerText += upper_display.innerText;
            upper_display.innerText = '';
        }

        if (!upper_display.innerText && lower_display.innerText.length <= 1) {
            if (operator == '*' || operator == '/') return;
        }

        //check if the last char is already an operator (=-*/) and replace it 
        let lastChar = lower_display.innerText[lower_display.innerText.length - 1];

        if (isNaN(lastChar) && !upper_display.innerText) {
            lower_display.innerText = lower_display.innerText.slice(0, -1);
            lower_display.innerText += operator;
            return;
        }

        // move number from upper display to history
        upper_display.innerText = '';
        lower_display.innerText = `(${lower_display.innerText})${operator}`;

    });
});

