// Rock Paper Scissors 


// Global variables
let gameOver = false;
let playerWins = 0;
let computerWins = 0;

// Randomly selects rock, paper, or scissors for computer
function getComputerChoice() {
    let choice = Math.floor(Math.random() * 3);

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
    document.querySelector('.player').innerText = playerWins;
    document.querySelector('.computer').innerText = computerWins;
    document.querySelector('#outcome-text').innerText = "";
}

// Shows reset button on game completion
function showReset() {
    const resetButton = document.createElement('button');
    resetButton.addEventListener('click', () => resetGame());
    resetButton.textContent = "New game";
    resetButton.classList.add('reset');
    document.querySelector('body').appendChild(resetButton);
}

// Results elements
const outcomeText = document.querySelector('#outcome-text');
const playerScore = document.querySelector('.player');
const computerScore = document.querySelector('.computer');

// Results updater
function updateResults(result) {
    if(!gameOver) {
        switch (result) {
            case 1:
                playerWins++;
                
                if(playerWins >= 5) {
                    gameOver = true;
                    document.querySelector('#outcome-text').innerText = 'Player wins the game!';
                    showReset();
                }
                else document.querySelector('#outcome-text').innerText = 'Player wins the round';
                break;
            case 0:
                document.querySelector('#outcome-text').innerText = "It's a draw";
                break;
            case -1:
                computerWins++;
                if(computerWins >= 5) {
                    gameOver = true;
                    document.querySelector('#outcome-text').innerText = 'Computer wins the game!';
                    showReset();
                }
                else document.querySelector('#outcome-text').innerText = 'Computer wins the round';
                break;
            default:
                console.warn("Outcome error");
        }

        document.querySelector('.player').innerText = playerWins;
        document.querySelector('.computer').innerText = computerWins;
    }

}

// Button listeners
const buttons = document.querySelectorAll("button");

// Buttons trigger playRound with the appropriate choice
buttons.forEach((button) => {
    button.addEventListener('click', () => {
        updateResults(playRound(button.id, getComputerChoice()));
    });
})