let us = 0;
let cs = 0;
let p = prompt("enter the best of");
const choices = document.querySelectorAll(".choice");
const msg2 = document.querySelector(".what");
const msg = document.querySelector("#msg");
let user_score = document.querySelector("#user-score");
let comp_score = document.querySelector("#comp-score");
console.log(user_score);
const gencompchoice = () => {
    const options = ["rock", "paper", "scissors"];
    const index = Math.floor(Math.random() * 3);
    return options[index];
}
const drawgame = () => {
    console.log("the game is draw!");
    msg2.classList.add("abc");
    msg.innerText = "It's a Tie";
    msg.style.backgroundColor = "#081b31";

}
const whowon = (userwin, userchoice, compchoice) => {
    if (userwin) {

        us++;
        user_score.innerText = us;
        msg2.innerText = `your ${userchoice} beat ${compchoice}`;
        msg.innerText = 'You Won :)';
        msg.style.backgroundColor = "green";
    }
    else {

        cs++;
        comp_score.innerText = cs;
        msg2.innerText = `${compchoice} beat your ${userchoice}`;
        msg.innerText = `You lost (:`;
        msg.style.backgroundColor = "red"

    }
    msg2.classList.remove("abc");
}
const playgame = (userchoice, p, e) => {
    if (p == e) {
        if (us > cs) {
            alert("you won !");
        }
        else if (us == cs) {
            alert("it's a draw");
        }
        else {
            alert("you lost! try again");
        }
    }
    else {

        const compchoice = gencompchoice();


        if (userchoice === compchoice) {
            drawgame();
        }
        else {
            let userwin = true;
            if (userchoice === "rock") {
                userwin = compchoice === "paper" ? false : true;
            }
            else if (userchoice === "paper") {
                userwin = compchoice === "scissors" ? false : true;
            }
            else {
                userwin = compchoice === "rock" ? false : true;
            }
            whowon(userwin, userchoice, compchoice);

        }
    }

}

let e = 0
choices.forEach((choe) => {
    choe.addEventListener("click", () => {
        const userchoice = choe.getAttribute("id");
        playgame(userchoice, p, e);
        e++;

    });
});
