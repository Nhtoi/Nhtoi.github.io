let playerChoice = null;
let outcome = null;
let computerChoice = null;

let score = {
    "Computer": 0,
    "Player": 0
};

let choices  = {
    1: "Rock",
    2: "Paper",
    3: "Scissors"
};

window.onload = function() {
    const savedScore = JSON.parse(localStorage.getItem('score'));
    if (savedScore) {
        score = savedScore;
        document.getElementById("player-score").innerText = score["Player"];
        document.getElementById("computer-score").innerText = score["Computer"];
    }
};

const headerDivs = document.querySelectorAll('header div');
headerDivs.forEach(div => {
    div.addEventListener('click', () => {

        headerDivs.forEach(d => d.firstElementChild.classList.remove('selected'));

        const selectedChoice = div.id;
        const playerImage = document.getElementById("player-choice-image");

      
        div.firstElementChild.classList.add('selected');
        
        if (selectedChoice === "rock") {
            playerChoice = 1;
        } else if (selectedChoice === "paper") {
            playerChoice = 2;
        } else {
            playerChoice = 3;
        }
        
        startComputerThrow(); 
    });
});


function startComputerThrow() {
    const computerImage = document.getElementById("computer-choice-image");
    let shuffleCount = 0;
    const shuffleInterval = setInterval(() => {
        const randomChoice = Math.ceil(Math.random() * 3);
        computerImage.src = `/csc372-hw/hw4/resources/${choices[randomChoice].toLowerCase()}.png`;

        shuffleCount++;
        if (shuffleCount >= 6) { 
            clearInterval(shuffleInterval);
            computerChoice = Math.ceil(Math.random() * 3); 
            computerImage.src = `/csc372-hw/hw4/resources/${choices[computerChoice].toLowerCase()}.png`;
            gameLoop();
        }
    }, 500);
}


function gameLoop() {
    if (playerChoice === computerChoice) {
        outcome = "Tie";
    } else if ((playerChoice + 1) % 3 == computerChoice % 3) {
        outcome = "Computer wins";
        score["Computer"]++;
    } else {
        outcome = "Player wins";
        score["Player"]++;
    }

    document.getElementById("outcome").innerText = `Outcome: ${outcome}`;
    document.getElementById("player-score").innerText = score["Player"];
    document.getElementById("computer-score").innerText = score["Computer"];

   
    localStorage.setItem('score', JSON.stringify(score));
}

document.getElementById("reset").addEventListener('click', () => {
    score["Computer"] = 0;
    score["Player"] = 0;
    document.getElementById("player-score").innerText = 0;
    document.getElementById("computer-score").innerText = 0;
    document.getElementById("outcome").innerText = `Outcome: `;
    document.getElementById("computer-choice-image").src = "/csc372-hw/hw4/resources/question-mark.png";

    
    localStorage.removeItem('score');

    headerDivs.forEach(d => d.firstElementChild.classList.remove('selected'));
});
