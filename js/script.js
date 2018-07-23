'use strict';

// Global variables.

var params = {
	output: document.getElementById('output'),
	result: document.getElementById('result'),
	roundNumber: 0,
	playerPoints: 0,
	computerPoints: 0,
	limitOfRounds: 0,
	newGameActive: false,
	playerName: 'Player',
	buttonSet: document.querySelectorAll('.player-move')
}

// Add event listeners to buttons.
for (var i = 0; i < params.buttonSet.length; i++) {
	params.buttonSet[i].addEventListener('click', playerMove);
	params.buttonSet[i].value = params.buttonSet[i].getAttribute('data-move');
}

// Write additional text at the end of div with id="output".
function writeText (text) {
	params.output.insertAdjacentHTML('beforeend', text);
}

// Randomly choose computer's move and return it to playerMove function.
function computerMove () {
	var compMove;
	switch (Math.floor(Math.random() * 3)) {
		case 0: compMove = 'rock'; break;
		case 1: compMove = 'paper'; break;
		case 2: compMove = 'scissors'; break;
	}
	return compMove;
}

// Determine index values for valuesMatrix inside function giveRoundResult.
function setIndex (index) {
	switch (index) {
		case 'rock': index = 0; break;
		case 'paper': index = 1; break;
		case 'scissors': index = 2; break;
	}
	return index;
}

/*
		Points for PLAYER depending on playMove and compMove values:

								playMove
						rock 0	paper 1	scissors 2
			 0	rock	 0		 1		 -1
	compMove 1	paper 	 -1		 0		 +1
			 2	scissors +1		 -1		 0
*/

// Determine round result and show short information. Return roundResult to function playerMove.
function giveRoundResult (playMove, compMove) {
	var valuesMatrix = [[0, 1, -1],
						[-1, 0, 1],
						[1, -1, 0]];
	var roundResult = valuesMatrix[setIndex(compMove)][setIndex(playMove)];
	writeText(params.playerName + ' played ' + playMove + ', computer played ' + compMove + '... ');
	switch (roundResult) {
		case -1: writeText('You lost!<br>'); break;
		case 0: writeText('A draw!<br>'); break;
		case 1: writeText('You won! Congratulations!<br>'); break;
	}
	return roundResult;
}

// Check for winner of the entire game.
function gameEnd () {
	if (params.playerPoints === params.limitOfRounds) {
		writeText(params.playerName + ' won the the entire game!<br>');
		params.newGameActive = false;
	}
	if (params.computerPoints === params.limitOfRounds) {
		writeText('Computer won the entire game!<br>');
		params.newGameActive = false;
	}
}

// Count current round number and points of each player.
function countPoints (roundResult) {
	switch (roundResult) {
		case -1: ++params.computerPoints; break;
		case 0: break;
		case 1: ++params.playerPoints; break;
	}
	++params.roundNumber;
	result.innerHTML = '<br>Round: ' + params.roundNumber + ' Rounds to win: ' + params.limitOfRounds + '<br>' + params.playerName + ' ' + params.playerPoints + ' - ' + params.computerPoints + ' Computer';
}

// Begin new round of game.
function playerMove (dataMove) {
	if (params.newGameActive) {
		var playMove = dataMove.target.value;
		var compMove = computerMove();
		var roundResult = giveRoundResult(playMove, compMove);
		countPoints(roundResult);
		gameEnd();
	}
	else {
		writeText('Click New Game first<br>');
	}
}

// Clear output and result sections.
function clearText () {
	params.output.innerHTML = "";
	params.result.innerHTML = "";
}

// Start a new game.
function newGame () {
	clearText();
	params.roundNumber = 0;
	params.playerPoints = 0;
	params.computerPoints = 0;
	params.limitOfRounds = 0;
	params.playerName = window.prompt('Player name: ');
	params.limitOfRounds = window.prompt('Total number of wins needed to win the entire game: ');
	params.limitOfRounds = parseInt(params.limitOfRounds);
	params.newGameActive = true;
}