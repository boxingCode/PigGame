/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/

var score, currentPlayer, currentTotal, stateCheck;

init();

function init() {
    score = [0, 0];
    currentPlayer = 0;
    currentTotal = 0;
    stateCheck = true;
    document.querySelector('#score-0').textContent = 0;
    document.querySelector('#score-1').textContent = 0;
    document.querySelector('#current-0').textContent = 0;
    document.querySelector('#current-1').textContent = 0;
    document.querySelector('.dice').style.display = 'none';
}

function winnerCheck() {
    if (score[currentPlayer] >= 20) {
        document.querySelector('#score-' + currentPlayer).textContent = 'WINNER';
        document.querySelector('.player-' + currentPlayer + '-panel').classList.add('winner');
        stateCheck = false;
        return true;
    }
    return false;
}

document.querySelector('.btn-new').addEventListener('click', function () {
    document.querySelector('.player-' + currentPlayer + '-panel').classList.remove('winner');
    if (currentPlayer == 1) {
        classToggle();
    }
    init();
});

document.querySelector('.btn-roll').addEventListener('click', function () {
    if (stateCheck) {
        var randomNumber = Math.floor(Math.random() * 6) + 1;
        var diceQuery = document.querySelector('.dice');
        diceQuery.style.display = 'block';
        diceQuery.src = "dice-" + randomNumber + ".png";
        if (randomNumber > 1) {
            currentTotal = currentTotal + randomNumber;
            document.querySelector('#current-' + currentPlayer).textContent = currentTotal;
        } else {
            document.querySelector('#current-' + currentPlayer).textContent = 0;
            currentTotal = 0;
            currentPlayer === 0 ? currentPlayer = 1 : currentPlayer = 0;
            classToggle();
        }
    }

});

var winnerStatus;
document.querySelector('.btn-hold').addEventListener('click', function () {
    if (stateCheck) {
        score[currentPlayer] = currentTotal + score[currentPlayer];
        document.querySelector('#score-' + currentPlayer).textContent = score[currentPlayer];
        winnerStatus = winnerCheck();
        if (!winnerStatus) {
            currentTotal = 0;
            currentPlayer === 0 ? currentPlayer = 1 : currentPlayer = 0;
            classToggle();
        }
    }
});

function classToggle() {
    document.querySelector('.player-0-panel').classList.toggle('active');
    document.querySelector('.player-1-panel').classList.toggle('active');
}