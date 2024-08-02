const textInputElement = document.getElementById("text-input");
const checkButtonElement = document.getElementById("check-btn");
const resultParagraph = document.getElementById("result");

const checkInputValue = word => {
    const pattern = /[\W_]/g // Its the same as this /[^A-Z0-9]/g
    return word.toUpperCase().replace(pattern, "");
};

const checkIfPalindrome = word => {
    const correctedValue = checkInputValue(word);
    const reverseWord = correctedValue.split("").reverse().join("");
    console.log(reverseWord)
    console.log(correctedValue)
    if (textInputElement.value === "") {
        alert("Please input a value");
    } else {
        //resultParagraph.innerHTML = correctedValue === reverseWord ? `<span>${word}</span> is a palindrome` : `<span>${word}</span> is not a palindrome`;
        resultParagraph.innerHTML = `<span>${word}</span> ${correctedValue === reverseWord ? "is" : "is not"} a palindrome`;
        textInputElement.value = "";
    }
};
checkButtonElement.addEventListener("click", () => { checkIfPalindrome(textInputElement.value) })
textInputElement.addEventListener("keydown", (e) => {
    if(e.key === "Enter") {
        checkIfPalindrome(textInputElement.value);
    }
})