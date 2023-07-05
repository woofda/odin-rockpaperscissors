// Rock Paper Scissors 


// Randomly selects rock, paper, or scissors for computer
function getComputerChoice() {
    let choice = Math.floor(Math.random() * 3);
    switch (choice) {
        case 0:
            return "Rock";
        case 1:
            return "Paper";
        case 2:
            return "Scissors";
        default:
            console.warn("Computer choice error");
    }
}

function playRound(playerSelection, computerSelection) {
    let playerLower = playerSelection.toLowerCase();
    if (playerLower === computerSelection) {
        return "It's a draw!";
    }

    let playerWon = false;
    if (playerLower === 'rock' && computerSelection === 'scissors') {
        playerWon = true;
    }
    else if (playerLower === 'paper' && computerSelection === 'rock') {
        playerWon = true;
    }
    else if (playerLower === 'scissors' && computerSelection === 'paper') {
        playerWon = true;
    }

    if (playerWon) {
        playerLower = playerLower.slice(0, 1).toUpperCase() + playerLower.slice(1);
        return `You win! ${playerLower} beats ${computerSelection}!`
    }
    else {
        let computerFormatted = computerSelection.slice(0, 1).toUpperCase() + computerSelection.slice(1);
        return `You lose! ${computerFormatted} beats ${playerLower}!`
    }
}

const playerSelection = "rock";
const computerSelection = getComputerChoice();
console.log(playRound(playerSelection, computerSelection));