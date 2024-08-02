const checkButton = document.getElementById("check-btn");
const userInput = document.getElementById("user-input");
const clearButton = document.getElementById("clear-btn");
const result = document.getElementById("results-div");
const checkInput = () => {
    const value=userInput.value;
    if (!value) {
        alert("Please provide a phone number");
        return;
    }
    result.innerHTML += `${isValidPhoneNumber(value)? '<p class= "success">V' :'<p class="failure">Inv' }alid US number: ${value}</p>`
    userInput.value="";
}
const isValidPhoneNumber = (number) => {
   const newNumber = number.replace(/\s/g, "");
    const phoneNumberRegex = /^1?(?:\(\d{3}\)|\d{3})-?\d{3}-?\d{4}$/;
  return phoneNumberRegex.test(newNumber);
}

const clearResults = () => {
    result.innerHTML = "";
}
checkButton.addEventListener("click", checkInput);
clearButton.addEventListener("click", clearResults);
userInput.addEventListener("keydown", (e) => {
    if(e.key === "Enter") {
        checkInput();
    }
})