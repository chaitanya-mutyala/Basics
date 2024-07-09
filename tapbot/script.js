let finalcoins = document.querySelectorAll(".coins")[0].children[1];
let currcoins = document.querySelectorAll(".coins")[1].children[1];
let energy = document.querySelectorAll(".energy")[0].children[1];
let button = document.querySelector("#claimbtn");
let topup = document.querySelector(".popup");
let claimbtn = topup.children[topup.children.length - 1];
let points = document.querySelector("#Points");
let tap = document.querySelector("#img");
let timerDisplay = document.getElementById("time-left"); // Timer display
let count = 0;
let plusOneText = tap.querySelector("p");

let countdownStarted = false;
let countdownTime = 3600; // 1 hour in seconds
let countdownInterval;

button.addEventListener('click', () => {
    topup.classList.add("pop");
    points.innerText = Number(currcoins.innerText);
    currcoins.innerText = 0;
    button.classList.remove("moving");
});

claimbtn.addEventListener("click", () => {
    topup.classList.remove("pop");
    finalcoins.innerText = Number(finalcoins.innerText) + Number(points.innerText);
    currcoins.innerText = Number(currcoins.innerText) - 1;
    energy.innerText = Number(energy.innerText) + 1;
});

tap.addEventListener("click", () => {
    if (!countdownStarted) {
        startCountdown();
        countdownStarted = true;
    }
    if (count < 1900) {
        energy.innerText = Number(energy.innerText) - 1;
        currcoins.innerText = Number(currcoins.innerText) + 1;
        if (Number(currcoins.innerText) > 0) {
            button.classList.add("moving");
            count += 1;
        }
        plusOneText.classList.add("show");
        setTimeout(() => {
            plusOneText.classList.remove("show");
        }, 500);
    }
});

function startCountdown() {
    countdownInterval = setInterval(() => {
        if (countdownTime > 0) {
            countdownTime--;
            updateTimerDisplay();
        } else {
            clearInterval(countdownInterval);
            refillEnergy();
        }
    }, 1000);
}

function updateTimerDisplay() {
    let hours = Math.floor(countdownTime / 3600);
    let minutes = Math.floor((countdownTime % 3600) / 60);
    let seconds = countdownTime % 60;
    timerDisplay.innerText = `${hours}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
}

function refillEnergy() {
    energy.innerText = 1900; // Refill energy to max
    countdownStarted = false;
    countdownTime = 3600; // Reset timer to 1 hour
    updateTimerDisplay();
}

// Initial display update
updateTimerDisplay();
