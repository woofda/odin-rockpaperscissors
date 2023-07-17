// Rock Paper Scissors 


// Global variables
let gameOver = false;
let roundPlaying = false;
let playerWins = 0;
let computerWins = 0;

// Randomly selects rock, paper, or scissors for computer
function getComputerChoice() {
    let choice = Math.floor(Math.random() * 3);

    for(button of compButtons){
        button.style.color = 'whitesmoke';
    }

    setTimeout(() => {
        switch (choice) {
            case 0:
                compButtons[0].style.color = '#F4D160';
                break;
            case 1:
                compButtons[1].style.color = '#F4D160';
                break;
            case 2:
                compButtons[2].style.color = '#F4D160';
                break;
        }
    }, 750);

    // Selections are returned as strings
    switch (choice) {
        case 0:
            return "rock";
        case 1:
            return "paper";
        case 2:
            return "scissors";
        default:
            console.warn("Computer choice error");
    }
}

// Takes player and computer selections as strings and
// returns the winner as 1 - player, 0 - draw, -1 - computer
function playRound(playerSelection, computerSelection) {

    // Format player input to lowercase
    let playerLower = playerSelection.toLowerCase();

    // Draw check
    if (playerLower === computerSelection) {
        return 0;
    }

    // Player win checks
    if (playerLower === 'rock' && computerSelection === 'scissors') {
        return 1;
    }
    else if (playerLower === 'paper' && computerSelection === 'rock') {
       return 1;
    }
    else if (playerLower === 'scissors' && computerSelection === 'paper') {
        return 1;
    }

    return -1;
}

// Resets global variables on new game
function resetGame() {
    gameOver = false;
    playerWins = 0;
    computerWins = 0;

    document.querySelector('.reset').remove();
    document.querySelector('.player-score').innerText = playerWins;
    document.querySelector('.computer-score').innerText = computerWins;
    document.querySelector('#outcome-text').innerText = "";

    for(item of document.querySelectorAll('.colorable')) {
        item.style.color = 'whitesmoke';
    }

    for(button of buttons) {
        button.classList.add('active');
    }

    document.querySelector('.player-side').style.borderColor = 'whitesmoke';
    document.querySelector('.computer-side').style.borderColor = 'whitesmoke';
}

// Shows reset button on game completion
function showReset() {
    for(button of buttons) {
        button.classList.remove("active");
    }
    const resetButton = document.createElement('button');
    resetButton.addEventListener('click', () => resetGame());
    resetButton.textContent = "New game";
    resetButton.classList.add('reset');
    document.querySelector('main').appendChild(resetButton);
}

// Results elements
const outcomeText = document.querySelector('#outcome-text');
const playerScore = document.querySelector('.player');
const computerScore = document.querySelector('.computer');

// Results updater
function updateResults(result) {
    let outcome = document.querySelector('#outcome-text');
    let playerSide = document.querySelector('.player-side');
    let computerSide = document.querySelector('.computer-side');

    outcome.style.opacity = "0";
    outcome.innerText = '';
    playerSide.style.borderColor = 'whitesmoke';
    computerSide.style.borderColor = 'whitesmoke';

    setTimeout(() => {
        switch (result) {
            case 1:
                playerWins++;
                playerSide.style.borderColor = '#F4D160';
                if(playerWins >= 5) {
                    gameOver = true;
                    outcome.innerText = 'Player wins the game!';
                    outcome.style.color = '#F4D160';
                    document.querySelector('.player').style.color = '#F4D160';
                    showReset();
                }
                else outcome.innerText = 'Player wins the round';
                break;
            case 0:
                outcome.innerText = "It's a draw";
                break;
            case -1:
                computerWins++;
                computerSide.style.borderColor = '#F4D160';
                if(computerWins >= 5) {
                    gameOver = true;
                    outcome.innerText = 'Computer wins the game!';
                    outcome.style.color = '#F4D160';
                    document.querySelector('.computer').style.color = '#F4D160';
                    showReset();
                }
                else outcome.innerText = 'Computer wins the round';
                break;
            default:
                console.warn("Outcome error");
        }

        document.querySelector('.player-score').innerText = playerWins;
        document.querySelector('.computer-score').innerText = computerWins;
        document.querySelector('#outcome-text').style.opacity = "100";
        roundPlaying = false;
    }, 1500);
}

// Button listeners
const buttons = document.querySelectorAll("button");
const compButtons = document.querySelectorAll("div.choice-button");

// Buttons trigger playRound with the appropriate choice
buttons.forEach((button) => {
    button.addEventListener('click', () => {
        if(!gameOver){
            if(!roundPlaying){
                roundPlaying = true;
                switch(button.id) {
                    case "rock":
                        buttons[0].style.color = '#F4D160';
                        buttons[1].style.color = 'whitesmoke';
                        buttons[2].style.color = 'whitesmoke';
                        break;
                    case "paper":
                        buttons[0].style.color = 'whitesmoke';
                        buttons[1].style.color = '#F4D160';
                        buttons[2].style.color = 'whitesmoke';
                        break;
                    case "scissors":
                        buttons[0].style.color = 'whitesmoke';
                        buttons[1].style.color = "whitesmoke";
                        buttons[2].style.color = '#F4D160';
                }
                updateResults(playRound(button.id, getComputerChoice()));
            }
        }
    });
})