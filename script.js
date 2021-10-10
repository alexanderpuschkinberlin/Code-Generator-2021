
// get DOM element to be used within js
const result = document.getElementById('password');

//define variables
const randomFunc = {
	lower: getRandomLower,
	upper: getRandomUpper,
	number: getRandomNumber,
	symbol: getRandomSymbol
}

// Promt section with validation included

generate.addEventListener('click', function () {
	
	let length = prompt("Enter the password length")
		if (Number.isNaN(length)) {
			length = prompt("Please enter a number (8-128 charakters long)");
		}
		if (length < 8) {
			length = prompt("Please enter a number above 8");
		}
		if (length > 128) {
			length = prompt("Please enter a number below 128");
		}
	
	hasLower = confirm("Include lower case letters?")
	
	hasUpper = confirm("Include upper case letters?")
	
	hasNumber = confirm("Include numbers?")
	
	hasSymbol = confirm("Include symbols?")

	if (hasLower === false && hasUpper === false && hasNumber === false && hasSymbol === false ) {

		alert ("you have not selected at least one of the options. Please restart.");
		
	}

	result.innerText = generatePassword(hasLower, hasUpper, hasNumber, hasSymbol, length);
	
});

// assemble the final password from the created random characters
function generatePassword(lower, upper, number, symbol, length) {
	let generatedPassword = '';
	const typesCount = lower + upper + number + symbol;
	const typesArr = [{lower}, {upper}, {number}, {symbol}].filter(item => Object.values(item)[0]);
	
	// Doesn't have a selected type
	if(typesCount === 0) {
		return '';
	}
	
	// create a loop
	for(let i=0; i<length; i+=typesCount) {
		typesArr.forEach(type => {
			const funcName = Object.keys(type)[0];
			generatedPassword += randomFunc[funcName]();
		});
	}
	
	const finalPassword = generatedPassword.slice(0, length);
	
	return finalPassword;
}

// Create a random character for each type
function getRandomLower() {
	return String.fromCharCode(Math.floor(Math.random() * 26) + 97);
}

function getRandomUpper() {
	return String.fromCharCode(Math.floor(Math.random() * 26) + 65);
}

function getRandomNumber() {
	return +String.fromCharCode(Math.floor(Math.random() * 10) + 48);
}

function getRandomSymbol() {
	const symbols = '!@#$%^&*(){}[]=<>/,.'
	return symbols[Math.floor(Math.random() * symbols.length)];
}