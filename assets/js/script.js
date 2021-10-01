// Assignment Code
var generateBtn = document.querySelector("#generate");

// Write password to the #password input
function writePassword() {
  var password = generatePassword();
  var passwordText = document.querySelector("#password");

  passwordText.value = password;

}

// Add event listener to generate button
generateBtn.addEventListener("click", writePassword);

function generatePassword() {
  // 1. ask how long
  // 2. ask if they want all character types
  // 2.a. if yes, then do so
  // 2.b. if no, then ask about each type
  // 3. validate length and at least one character type
  // 4. generate password
  // 5. write to textarea #password
}