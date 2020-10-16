/*
GAME RULES:
- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game
*/



// variables
const rollBtn = document.querySelector('.btn-roll');
const holdBtn = document.querySelector('.btn-hold');
const newGameBtn = document.querySelector('.btn-new');
const submitPointBtn = document.querySelector('[type="submit"]');
const currentScores = document.querySelectorAll('.player-current-score');
const playerScores = document.querySelectorAll('.player-score');
const playerPanels = document.querySelectorAll('.player-panel');
const playerNames = document.querySelectorAll('.player-name');
const diceIcones = document.querySelectorAll('.dice');

let scores, roundScore, activePlayer, dice, play;


// functions

function rollDice() {
    if (play) {
        dice = Math.floor(Math.random() * 6 + 1);
        diceIcones[0].src = './pictures/dice-' + dice + '.png';
        diceIcones[0].style.display = 'block';
        if (dice !== 1) {
            roundScore += dice
            currentScores[activePlayer].textContent = roundScore;
        } else {
            change()
        }
    }
}

function change() {
    diceIcones[0].style.display = 'none';
    roundScore = 0;
    currentScores[activePlayer].textContent = roundScore;
    activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
    playerPanels.forEach(panel => panel.classList.toggle('active'));
}

function addPoints() {
    if (play) {
        scores[activePlayer] += roundScore;
        playerScores[activePlayer].textContent = scores[activePlayer];
        if (scores[activePlayer] > 100) {
            playerPanels[activePlayer].classList.add('winner');
            playerNames[activePlayer].textContent = 'WINNER!!'
            play = false;
        } else {
            change()
        }
    }
}

function init(wp) {
    scores = [0, 0];
    roundScore = 0;
    activePlayer = 0;
    play = true;
    diceIcones.forEach(dice => dice.style.display = 'none');
    currentScores.forEach(score => score.textContent = '0');
    playerScores.forEach(score => score.textContent = '0');
    playerPanels.forEach(panel => panel.classList.remove('active'));
    playerPanels.forEach(name => name.classList.remove('winner'));
    submitPointBtn.parentElement.style.display = 'none';
    playerPanels[0].classList.add('active');
    playerNames[0].textContent = 'Player 1';
    playerNames[1].textContent = 'Player 2';
}



// btn attachment anf function call
init();
rollBtn.addEventListener('click', rollDice);
holdBtn.addEventListener('click', addPoints);
newGameBtn.addEventListener('click', init);