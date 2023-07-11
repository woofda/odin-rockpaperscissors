// Rock Paper Scissors 


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

function game() {
    let gameOver = false;
    let playerWins = 0;
    let computerWins = 0;

    // Best of 5 match loop
    while (!gameOver) {
        let computerChoice = getComputerChoice();
        let validInput = false;
        let playerChoice;

        // Basic player input validation; only accepts
        // 'rock' 'paper' and 'scissors' (non caps sensitive)
        while(!validInput){
            playerChoice = prompt("Enter selection: ");
            if (playerChoice.toLowerCase() === 'rock' || playerChoice.toLowerCase() === 'paper' || playerChoice.toLowerCase() === 'scissors') {
                validInput = true
            }
        }

        // Plays single round and returns outcome
        let outcome = playRound(playerChoice, computerChoice);

        // Prints output and adds to win totals
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
    }
}

// Results elements
const outcomeText = document.querySelector('#outcome-text');
const playerScore = document.querySelector('.player');
const computerScore = document.querySelector('.computer');

// Results updater
function updateResults(result) {
    let playerWins = parseInt(playerScore.innerText);
    let computerWins = parseInt(computerScore.innerText);
    if(isNaN(playerWins)){
        playerWins = 0;
        playerScore.innerText = playerWins;
    }
    if(isNaN(computerWins)) {
        computerWins = 0;
        computerScore.innerText = computerWins;
    }

    switch (result) {
        case 1:
            playerWins++;
            playerScore.innerText = playerWins;
            if(playerWins >= 5) outcomeText.innerText = 'Player wins the game!';
            else outcomeText.innerText = 'Player wins the round';
            break;
        case 0:
            outcomeText.innerText = "It's a draw";
            break;
        case -1:
            computerWins++;
            computerScore.innerText = computerWins;
            if(computerWins >= 5) outcomeText.innerText = 'Computer wins the game!';
            else outcomeText.innerText = 'Computer wins the round';
            break;
        default:
            console.warn("Outcome error");
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