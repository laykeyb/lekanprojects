const convertBtn = document.getElementById("convert-btn");
const numberInput = document.getElementById("number");
const result = document.getElementById("output");
const romanNumeralConversionsArr = [
  {
    arabic: 1000,
    roman: "M"
  },
  {
    arabic: 900,
    roman: "CM"
  },
  {
    arabic: 500,
    roman: "D"
  },
  {
    arabic: 400,
    roman: "CD"
  },
  {
    arabic: 100,
    roman: "C"
  },
  {
    arabic: 90,
    roman: "XC"
  },
  {
    arabic: 50,
    roman: "L"
  },
  {
    arabic: 40,
    roman: "XL"
  },
  {
    arabic: 10,
    roman: "X"
  },
  {
    arabic: 9,
    roman: "IX"
  },
  {
    arabic: 5,
    roman: "V"
  },
  {
    arabic: 4,
    roman: "IV"
  },
  {
    arabic: 1,
    roman: "I"
  },
];
Object.freeze(romanNumeralConversionsArr)
const arabicToRomanNumeral = inputVal => {
  if (inputVal === 0) {
    return "";
  } else {
    const currentConversionObj = romanNumeralConversionsArr.find((conversionObj) => conversionObj.arabic <= inputVal);
    return arabicToRomanNumeral(inputVal -= currentConversionObj.arabic) + (currentConversionObj.roman.split("").reverse().join(""));
  }
};

const clearOutput = () => {
  result.classList.remove("hidden");
  result.classList.remove("error");
}

const isValid = (str, num) => {
  let errorText;
  //This code is very useful
  if (!str || isNaN(num) || str.match(/[e.]/g)) {
    errorText = "Please enter a valid number";
  } else if (num < 1) {
    errorText = "Please enter a number greater than or equal to 1";
  }
  else if (num >= 4000) {
    errorText = "Please enter a number less than or equal to 3999";
  } else {
    return true;
  }
  result.classList.add("error");
  result.innerText = errorText;
  return false;
}

const checkUserInput = () => {
  const inputInt = parseInt(numberInput.value);
  clearOutput();
  if (isValid(numberInput.value, inputInt)) {
    result.innerText = arabicToRomanNumeral(inputInt).split("").reverse().join("");
  }
  numberInput.value = "";
}

convertBtn.addEventListener("click", checkUserInput);
numberInput.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    checkUserInput();
  }
});