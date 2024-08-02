let price = 3.26;
let cid = [
  ["PENNY", 1.01],
  ["NICKEL", 2.05],
  ["DIME", 3.1],
  ["QUARTER", 4.25],
  ["ONE", 90],
  ["FIVE", 55],
  ["TEN", 20],
  ["TWENTY", 60],
  ["ONE HUNDRED", 100]
];

const dollarToChangeConversionArr = [
  ['ONE HUNDRED', 100],
  ['TWENTY', 20],
  ['TEN', 10],
  ['FIVE', 5],
  ['ONE', 1],
  ['QUARTER', 0.25],
  ['DIME', 0.1],
  ['NICKEL', 0.05],
  ['PENNY', 0.01]
]
const cash = document.getElementById("cash");
const changeDue = document.getElementById("change-due");
const purchaseButton = document.getElementById("purchase-btn")
const form = document.getElementById("form");
const priceElement = document.getElementById("price");
const changeSpans = document.querySelectorAll("#change-drawer p>span");



const dollarToChanges = (inputVal, cidArr) => {
  const backupCid = cidArr.map(denomination => denomination.slice());
  let customerChangeGiven = [];
  let formattedInputVal = parseFloat(inputVal.toFixed(2));


  for (const conversion of dollarToChangeConversionArr) {
    const currentCidDenomination = cidArr.find((change => change[0] === conversion[0]));
    while (formattedInputVal >= conversion[1] && currentCidDenomination[1] > 0) {
      const existingEntry = customerChangeGiven.find((arr) => arr[0] === conversion[0]);
      if (existingEntry) {
        existingEntry[1] += conversion[1]
        existingEntry[1] = parseFloat(existingEntry[1].toFixed(2))
      } else {
        customerChangeGiven.push([conversion[0], conversion[1]]);
      }

      formattedInputVal -= conversion[1];
      currentCidDenomination[1] -= conversion[1];
      currentCidDenomination[1] = parseFloat(currentCidDenomination[1].toFixed(2));
      formattedInputVal = parseFloat(formattedInputVal.toFixed(2));
    };
  }

  return [customerChangeGiven, cidArr, backupCid];
}

const calculateChange = (cash, itemPrice) => {
  const changeToBeGiven = parseFloat((cash - itemPrice).toFixed(2));
  const cidTotal = parseFloat(cid.reduce((acc, arr) => acc + arr[1], 0).toFixed(2));
  const changeCidAndBackup = dollarToChanges(changeToBeGiven, cid);
  const changeThatCanBeProvided = parseFloat(changeCidAndBackup[0].reduce((acc, arr) => acc + arr[1], 0).toFixed(2));
  const isInsufficient = changeToBeGiven > cidTotal || !changeCidAndBackup[0].length || changeThatCanBeProvided !== changeToBeGiven;//dont think the ,length part is necessary test
  const isStatusClosed = changeToBeGiven === cidTotal;
  const isStatusOpened = changeToBeGiven < cidTotal;

  if (isInsufficient) {
    changeDue.innerHTML = `<p>Status: INSUFFICIENT_FUNDS</p>`
    cid = changeCidAndBackup[2]
  } else if (isStatusClosed) {
    changeDue.innerHTML = `<p>Status: CLOSED</p>`

  } else if (isStatusOpened) {
    changeDue.innerHTML = `<p>Status: OPEN</p>`;
  }
  console.log(changeThatCanBeProvided);
  console.log(cidTotal);//dont think the and insufficient is necessary test
  if (isStatusClosed || isStatusOpened && !isInsufficient) {
    changeCidAndBackup[0].map((changeArr) => {
      changeDue.innerHTML += `<p>${changeArr.join(": $")}</p>`;
    });
  }
};

const update = (cidArr) => {
  priceElement.textContent = price;
  changeSpans.forEach((span, index) => {
    span.textContent = `$${cidArr[index][1]}`
  })
  cash.value = "";
}

const purchase = () => {

  const cashAmount = parseFloat(cash.value);
  if (cash.value) {
    if (cashAmount < price) {
      changeDue.innerHTML = `<p>Status: INSUFFICIENT_FUNDS</p>`;
      alert("Customer does not have enough money to purchase the item");
    } else if (cashAmount === price) {
      changeDue.innerHTML = `<p>No change due - customer paid with exact cash</p>`;
    } else {
      calculateChange(cashAmount, price);
      update(cid);
    }
  }
}

window.onload = () => {
  update(cid);
}

form.addEventListener("submit", (e) => {
  e.preventDefault();
  purchase();
})
