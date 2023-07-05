// Rock Paper Scissors 


// Randomly selects rock, paper, or scissors for computer
function getComputerChoice() {
    let choice = Math.floor(Math.random() * 3);
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

function playRound(playerSelection, computerSelection) {
    let playerLower = playerSelection.toLowerCase();
    if (playerLower === computerSelection) {
        return 0;
    }

    let playerWon = false;
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

function game() {
    let gameOver = false;
    let playerWins = 0;
    let computerWins = 0;

    while (!gameOver) {
        let computerChoice = getComputerChoice();
        let validInput = false;
        let playerChoice;

        while(!validInput){
            playerChoice = prompt("Enter selection: ");
            if (playerChoice.toLowerCase() === 'rock' || playerChoice.toLowerCase() === 'paper' || playerChoice.toLowerCase() === 'scissors') {
                validInput = true
            }
        }

        let outcome = playRound(playerChoice, computerChoice);

        switch (outcome) {
            case 1:
                console.log(`You win! ${playerChoice.slice(0,1).toUpperCase() + playerChoice.slice(1).toLowerCase()} beats ${computerChoice}!`)
                playerWins++;
                break;
            case 0:
                console.log("It's a draw!");
                break;
            case -1:
                console.log(`You lose! ${computerChoice.slice(0,1).toUpperCase() + computerChoice.slice(1)} beats ${playerChoice.toLowerCase()}!`)
                computerWins++;
                break;
            default:
                console.warn("Outcome error");
        }

        if (playerWins >= 3) {
            console.log("Player wins the best of 5!");
            gameOver = true;
        }
        else if (computerWins >= 3) {
            console.log("Sorry! Computer wins the best of 5!");
            gameOver = true;
        }
    }
}
