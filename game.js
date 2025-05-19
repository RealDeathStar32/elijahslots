let balance = 100;

const balanceElement = document.getElementById("balance");
const betAmountInput = document.getElementById("bet-amount");
const spinButton = document.getElementById("spin-button");
const spinnerElement = document.getElementById("spinner");
const resultElement = document.getElementById("result");
const gameOverElement = document.getElementById("game-over");
const restartButton = document.getElementById("restart-button");
const imageContainers = document.getElementsByClassName("image-container");

const imagePaths = [
  "images/IMG_4624.jpeg",
  "images/IMG_4626.jpeg",
  "images/IMG_4627.jpeg"
];

function updateBalance() {
  balanceElement.textContent = `Elijahcoin: $${balance.toFixed(2)}`;
}

function getrandint(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

async function spin() {
  const bet = parseFloat(betAmountInput.value);
  if (isNaN(bet) || bet <= 0 || bet > balance) {
    alert("Invalid bet amount!");
    return;
  }

  balance -= bet;
  updateBalance();

  spinnerElement.innerHTML = "";
  resultElement.textContent = "";

  let count = getrandint(30, 50);
  let arr = [];
  for (let i = 0; i < count; i++) {
    arr.push(getrandint(1, 9));
  }

  for (let i = 0; i < arr.length; i += 3) {
    let group = arr.slice(i, i + 3);
    while (group.length < 3) group.push(getrandint(1, 9));
    spinnerElement.innerHTML = `<div>${group.join(" ")}</div>`;
    await new Promise(res => setTimeout(res, 100));
  }

  let r1 = getrandint(1, 9);
  let r2 = getrandint(1, 9);
  let r3 = getrandint(1, 9);
  spinnerElement.innerHTML = `<div> ${r1} ${r2} ${r3}</div>`;

  let nines = [r1, r2, r3].filter(n => n === 9).length;
  let winnings = 0;

  if (nines === 1) {
    winnings = bet*5;
    resultElement.textContent = "One nine: 5x";
  } else if (nines === 2) {
    winnings = bet * 50;
    resultElement.textContent = "Two nines: 50x";
  } else if (nines === 3) {
    winnings = bet * 1000;
    resultElement.textContent = "Three nines: 1000x";
  } else {
    resultElement.textContent = "Loser";
  }

  balance += winnings;
  updateBalance();

  if (balance <= 0) {
    gameOverElement.style.display = "block";
    spinButton.disabled = true;
  }
}

function revealImage(index) {
  const cost = 200;
  const container = imageContainers[index];

  if (balance < cost) {
    alert("Not enough balance!");
    return;
  }

  if (container.querySelector("img")) {
    alert("You already unlocked this!");
    return;
  }

  balance -= cost;
  updateBalance();

  const img = document.createElement("img");
  img.src = imagePaths[index];
  img.alt = "Unlocked Image";
  container.innerHTML = "";
  container.appendChild(img);
}

spinButton.addEventListener("click", spin);
restartButton.addEventListener("click", () => {
  balance = 100;
  updateBalance();
  gameOverElement.style.display = "none";
  spinButton.disabled = false;
  spinnerElement.innerHTML = "";
  resultElement.textContent = "";

  
});

updateBalance();
