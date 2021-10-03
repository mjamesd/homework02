// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
// Author: Mark Drummond
// Date: 02-Oct-2021
// Assignment: Password generator
// See README.md for more information
// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~


// Define my selectors
var generateBtn = document.querySelector("#generate", function(event) {
  event.preventDefault();
});
var copyPasswordBtn = document.querySelector("#copyPassword", function(event) {
  event.preventDefault();
});

// Define the messages so we don't have to hunt for it later to change it
var pwLengthMsg = "How long would you like your password? It must be at least 8 characters. It can't be longer than 128 characters.";
var pwLengthErrMsg = "Sorry, that's not a valid entry. Please try again. |>>> ";
var charTypeAllMsg = "Would you like to use all characters? (lowercase, uppercase, numbers, and symbols)";
var charTypeMsg = [
  "Would you like to use lowercase alphabet letters?",  // 0
  "Would you like to use uppercase alphabet letters?",  // 1
  "Would you like to use numbers?",                     // 2
  "Would you like to use symbols?"                      // 3
];

// var lowercaseSet  = 'abcdefghijklmnopqrstuvwxyz';         // 0
// var uppercaseSet  = 'ABCDEFGHIJKLMONPQRSTUVWXYZ';         // 1
// var numberSet     = '0123456789';                         // 2
// var symbolSet     = ',./<>?;\':"[]\\{}|`~!@#$%^&*()-_=+'; // 3
// var characterSets = [lowercaseSet, uppercaseSet, numberSet, symbolSet];
var characterSets = ['abcdefghijklmnopqrstuvwxyz', 'ABCDEFGHIJKLMONPQRSTUVWXYZ', '0123456789', ',./<>?;\':"[]\\{}|`~!@#$%^&*()-_=+'];

// Write password to the #password input
function renderPassword() {
  var password = generatePassword();
  var passwordText = document.querySelector("#password");
  passwordText.value = password;
}

function generatePassword() {
   // First, disable the Copy Password button
  copyPasswordBtn.disabled = true;
  // 1. Ask how long & validate
  var pwLength = getPwLength();

  // 2. Ask if they want all character types or just certain ones & validate
  var thisSetCharacterTypes = setCharacterTypes();

  // 3. Generate password
  var myPassword = '';
  var index;
  var charIndex = 0;
  var nextCharacter = '0';
  var lastCharacter = '0';
  // 3.a Iterate for each character in the new password; i.e., do this x number of times where x = pwLength.
  for (var i = 0; i < pwLength; i++) {
    // 3.b Get random number of the amount of character sets we are using
    index = randomNum(thisSetCharacterTypes.length);
    // 3.c Use randomNum as index of thisSetCharacterTypes array
    // 3.d Pick a random character from that array, can't be the same one as last time (hence initializing them to the same value above)
    while (nextCharacter === lastCharacter) {
      // 3.e Use randomNum as index of the array of characters in the current thisSetCharacterTypes string
      charIndex = randomNum(thisSetCharacterTypes[index].length)
      nextCharacter = thisSetCharacterTypes[index][charIndex];
    }
    // 3.f Append the character to the password
    myPassword += nextCharacter;
    lastCharacter = nextCharacter;
  }
  // 4.a Make the 'Copy Password' button clickable
  copyPasswordBtn.disabled = false;
  // 4.b Write to textarea #password
  return myPassword;
}

// This function prompts the user for the password length and returns the validated user input
function getPwLength(thisMsg = '') {
  var thisPwLength = parseInt(prompt(thisMsg + pwLengthMsg)); // Prompt returns a string, so we parseInt it into a number. Then check again below using Number.isInteger.
  while (!Number.isInteger(thisPwLength) || thisPwLength < 8 || thisPwLength > 128) {
    thisPwLength = getPwLength(pwLengthErrMsg); // Recursively calls itself to get a new user entry. User gets a prompt that their entry was out of bounds.
  }
  return thisPwLength;
}

// This function prompts the user for which character type(s) they would like to use then returns an array of those character sets.
function setCharacterTypes() {
  var characterSetsToUse = [];
  var conf = confirm(charTypeAllMsg); // ask if they want to use all first
  // 2.a. If yes, then do so
  if (conf === true) {
    characterSetsToUse.push(characterSets[0],characterSets[1],characterSets[2],characterSets[3]);
  } else {
    // 2.b. If no, then ask about each type. The keys are set 
    for (var i = 0; i < characterSets.length; i++)
      if (confirm(charTypeMsg[i]))
        characterSetsToUse.push(characterSets[i]);
  }
  return characterSetsToUse;
}

function randomNum(max) {
  return Math.floor(Math.random()*max);
}


function init() {
  copyPasswordBtn.disabled = true;
};

// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

// init
init();

// Add event listener to generate button
generateBtn.addEventListener("click", renderPassword);
// function(event) { event.PreventDefault(); });

// Add event listener to 'copy password' button
copyPasswordBtn.onclick = function(){
  document.querySelector("textarea").select();
  document.execCommand('copy');
};