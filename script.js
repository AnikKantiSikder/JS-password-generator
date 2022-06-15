
const resultEl = document.getElementById('result');
const lengthEl = document.getElementById('length');
const uppercaseEl = document.getElementById('uppercase');
const lowercaseEl = document.getElementById('lowercase');
const numbersEl = document.getElementById('numbers');
const symbolsEl = document.getElementById('symbols');
// Buttons
const clipboardBtn = document.getElementById('clipboard');
const generateBtn = document.getElementById('generate');


const randomFunc = {
    lower: getRandomLower,
    upper: getRandomUpper,
    number: getRandomNumber,
    symbol: getRandomSymbol
}

// Clipboard button
clipboardBtn.addEventListener('click', () => {
    // Creating a textarea
    const textarea = document.createElement('textarea');
    const password = resultEl.innerText;

    if(!password) {
        return
    }

    textarea.value = password;
    document.body.appendChild(textarea);
    textarea.select();
    document.execCommand('copy');
    textarea.remove();
    alert('Password is copied to clipboard');
})

// Click on Generate button
generateBtn.addEventListener('click', () => {
    const length = +lengthEl.value; //(+) converts [TEXT] into [NUMBERS]
    // Checking if the checkboxes are checked
    const hasUpper = uppercaseEl.checked;
    const hasLower = lowercaseEl.checked;
    const hasNumber = numbersEl.checked;
    const hasSymbol = symbolsEl.checked;

    resultEl.innerText = generatePassword(length, hasUpper, hasLower, hasNumber, hasSymbol);
})

// Implementing generatePassword() function
function generatePassword(length, lower, upper, number, symbol) {
    let generatedPassword = '';
    const typesCount = lower + upper + number + symbol;
    //console.log(typesCount);
    // Making an array
    const typesArr = [{lower}, {upper}, {number}, {symbol}]
    .filter(item => Object.values(item)[0]);
    // If nothing is checked
    if(typesCount === 0) {
        return ''
    }
    
    for(let i = 0; i <length; i+=typesCount) {
        typesArr.forEach(type => {
            const funcName = Object.keys(type)[0];
            generatedPassword += randomFunc[funcName]();
        })
    }

    // Return the password
    const finalPassword = generatedPassword.slice(0, length);
    return finalPassword;
}

function getRandomLower(){
    return String.fromCharCode(
        Math.floor(Math.random() * 26) + 97
    );
    // HTML Asci value->(a) starts from 97
}

function getRandomUpper(){
    return String.fromCharCode(
        Math.floor(Math.random() * 26) + 65
    );
    // HTML Asci value->(A) starts from 65
}

function getRandomNumber(){
    return String.fromCharCode(
        Math.floor(Math.random() * 10) + 48
    );
    // HTML Asci value->(0) starts from 48
}

function getRandomSymbol(){
    const symbols = '!@#$%^&*(){}[]=<>/,.';

    return symbols[Math.floor(Math.random() * symbols.length)];
}



