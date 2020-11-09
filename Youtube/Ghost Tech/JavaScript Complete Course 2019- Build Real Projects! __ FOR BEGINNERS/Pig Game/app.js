let scores, roundScore, activePlayer, gamePlaying, lastDice1, lastDice2;
let diceUp;
let diceDawn;
init();


//btn-help
document.querySelector('.btn-help').addEventListener('click', () => {
    alert("GAME RULES:\n- The game has 2 players, playing in rounds.\n- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score.\n- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn.\n- The first player to reach 100(By Default) points on GLOBAL score wins the game.\n- The default score to win can be changed from the\"Final Score\" box.\n");
})
//
document.querySelector('.btn-roll').addEventListener('click', () => {
    if (gamePlaying) {
        //Random number
        let dice1 = Math.floor(Math.random() * 6) + 1;
        let dice2 = Math.floor(Math.random() * 6) + 1;
        //Display the result

        //if 'block' to 'none' it will mess with the position of the buttons arround it
        //document.getElementById('dice1').style.display = 'block';
        //document.getElementById('dice2').style.display = 'block';
        //So use opacity from '1' to '0' will not mess with the position of the buttons arround it
        document.getElementById('dice1').style.opacity = '1';
        document.getElementById('dice2').style.opacity = '1';

        document.getElementById('dice1').src = `dice-${dice1}.png`
        document.getElementById('dice2').src = `dice-${dice2}.png`
        //debugger;
        if (dice1 !== 1 && dice2 !== 1) {
            // Update the round score IF the rolled number was NOT a 1
            roundScore += dice1 + dice2;
            document.querySelector(`#current-${activePlayer}`).textContent = roundScore;
        } else {
            nextPlayer();
        }
    }
})

document.querySelector('.btn-hold').addEventListener('click', () => {
    if (gamePlaying) {
        // Add current score to the global score
        scores[activePlayer] += roundScore;
        // Update the UI
        document.querySelector(`#score-${activePlayer}`).textContent = scores[activePlayer];

        let inputScore = document.querySelector('.final-score').value;
        let winningScore;

        // typeof inputScore === "number" // false
        // typeof inputScore === "string" // true

        // (isNaN(inputScore) === "number") // false
        // (!isNaN(inputScore) === "number") // true

        if (inputScore && !isNaN(inputScore)) {
            winningScore = inputScore;
        } else {
            winningScore = 100;
        }
        // Check if the current player won the game
        if (scores[activePlayer] >= winningScore) {
            document.querySelector(`#name-${activePlayer}`).textContent = 'winner!';

            hideDice();

            document.querySelector(`.player-${activePlayer}-panel`).classList.add('winner');
            document.querySelector(`.player-${activePlayer}-panel`).classList.remove('active');
            gamePlaying = false;
        } else {
            // Next Player
            nextPlayer();
        }
    }
})

function nextPlayer() {
    activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
    roundScore = 0;

    document.getElementById('current-0').textContent = '0';
    document.getElementById('current-1').textContent = '0';

    document.querySelector('.player-0-panel').classList.toggle('active');
    document.querySelector('.player-1-panel').classList.toggle('active');



    hideDice();

}

document.querySelector('.btn-new').addEventListener('click', init)

function init() {
    scores = [0, 0];
    roundScore = 0;
    activePlayer = 0;
    gamePlaying = true;

    hideDice();

    document.getElementById('score-0').textContent = '0';
    document.getElementById('score-1').textContent = '0';
    document.getElementById('current-0').textContent = '0';
    document.getElementById('current-1').textContent = '0';
    document.getElementById('name-0').textContent = 'Player 1';
    document.getElementById('name-1').textContent = 'Player 1';

    document.querySelector(`.player-0-panel`).classList.remove('winner');
    document.querySelector(`.player-1-panel`).classList.remove('winner');
    document.querySelector(`.player-0-panel`).classList.remove('active');
    document.querySelector(`.player-1-panel`).classList.remove('active');

    document.querySelector(`.player-0-panel`).classList.add('active');
}
//
function hideDice() {
    /*
    document.getElementById('dice1').style.display = 'none';
    document.getElementById('dice2').style.display = 'none';
    */

    document.getElementById('dice1').style.opacity = '0';
    document.getElementById('dice2').style.opacity = '0';
}