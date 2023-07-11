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
