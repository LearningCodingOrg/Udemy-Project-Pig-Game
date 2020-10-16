/*
YOUR 3 CHALLENGES
Change the game to follow these rules:
V1. A player looses his ENTIRE score when he rolls two 6 in a row. After that, it's the next player's turn. (Hint: Always save the previous dice roll in a separate variable)
2. Add an input field to the HTML where players can set the winning score, so that they can change the predefined score of 100. (Hint: you can read that value with the .value property in JavaScript. This is a good oportunity to use google to figure this out :)
3. Add another dice to the game, so that there are two dices now. The player looses his current score when one of them is a 1. (Hint: you will need CSS to position the second dice, so take a look at the CSS code for the first one.)
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

let scores, roundScore, activePlayer, dices, play, lastScores, winningPoints;


// functions

function rollDice() {
    if (play) {
        dices[0] = Math.floor(Math.random() * 6 + 1);
        dices[1] = Math.floor(Math.random() * 6 + 1);
        diceIcones[0].src = './pictures/dice-' + dices[0] + '.png';
        diceIcones[1].src = './pictures/dice-' + dices[1] + '.png';
        diceIcones.forEach(diceIcone => diceIcone.style.display = 'block');
        if (dices[0] !== 1 && dices[1] !== 1) {
            if ((dices[0] === 6 || dices[1] === 6) && (lastScores[0] === 6 || lastScores[1] === 6)) {
                scores[activePlayer] = 0;
                playerScores[activePlayer].textContent = scores[activePlayer]
                change()
            } else {
                roundScore += dices.reduce((previous, currnet) => previous + currnet)
                currentScores[activePlayer].textContent = roundScore;
            }
            lastScores[0] = dices[0];
            lastScores[1] = dices[1];

        } else {
            change()
        }
    }
}

function change() {
    diceIcones.forEach(diceIcone => diceIcone.style.display = 'none');
    roundScore = 0;
    currentScores[activePlayer].textContent = roundScore;
    activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
    playerPanels.forEach(panel => panel.classList.toggle('active'));
    lastScores = [0, 0];
}

function addPoints() {
    if (play) {
        scores[activePlayer] += roundScore;
        playerScores[activePlayer].textContent = scores[activePlayer];
        if (scores[activePlayer] > winningPoints) {
            playerPanels[activePlayer].classList.add('winner');
            playerNames[activePlayer].textContent = 'WINNER!!'
            play = false;
        } else {
            change()
        }
    }
}

function init(wp) {
    dices = [0, 0];
    scores = [0, 0];
    roundScore = 0;
    activePlayer = 0;
    play = true;
    lastScores = [0, 0];
    typeof (wp) === "string" ? winningPoints = wp: winningPoints = 100;
    diceIcones.forEach(diceIcone => diceIcone.style.display = 'none');
    currentScores.forEach(score => score.textContent = '0');
    playerScores.forEach(score => score.textContent = '0');
    playerPanels.forEach(panel => panel.classList.remove('active'));
    playerPanels.forEach(name => name.classList.remove('winner'))
    playerPanels[0].classList.add('active');
    playerNames[0].textContent = 'Player 1'
    playerNames[1].textContent = 'Player 2'
}

function changeWinningPoints(e) {
    e.preventDefault()
    winningPoints = this.parentElement.querySelector('[type="number"]').value;
    this.parentElement.reset();
    console.log(winningPoints)
    init(winningPoints);
}


// btn attachment anf function call
init();
rollBtn.addEventListener('click', rollDice);
holdBtn.addEventListener('click', addPoints);
newGameBtn.addEventListener('click', init);
submitPointBtn.addEventListener('click', changeWinningPoints)