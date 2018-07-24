'use strict';

// Global variables.
var params = {
	output: document.getElementById('output'),
	result: document.getElementById('result'),
	endgameModalContent: document.querySelector('.content-final'),
	finalArray: document.querySelector('.final-array'),
	roundNumber: 0,
	playerPoints: 0,
	computerPoints: 0,
	limitOfRounds: 0,
	newGameActive: false,
	playerName: 'Player',
	progress: [],
	buttonSet: document.querySelectorAll('.player-move')
};

// Add event listeners to buttons.
(function initializeListeners() {
	for (var i = 0; i < params.buttonSet.length; i++) {
		params.buttonSet[i].addEventListener('click', playerMove);
		params.buttonSet[i].value = params.buttonSet[i].getAttribute('data-move');
	}
})();

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

// Modal - end of game.
function modalGameEnd (text) {
	document.querySelector('#modal-overlay').classList.add('show');
	document.querySelector('#modal-gameend').classList.add('show');
	var endText = document.createElement('p');
	endText.innerHTML = text;
	params.endgameModalContent.appendChild(endText);
	params.newGameActive = false;
}

// Check for winner of the entire game.
function gameEnd () {
	if (params.playerPoints === params.limitOfRounds) {
		var text = params.playerName + ' won the the entire game!<br>';
		modalGameEnd(text);
	}
	if (params.computerPoints === params.limitOfRounds) {
		var text = 'Computer won the entire game!<br>';
		modalGameEnd(text);
	}
}

// Count current round number and points of each player.
function countPoints (roundResult) {
	switch (roundResult) {
		case -1: ++params.computerPoints; roundResult = "lost"; break;
		case 0: roundResult = "draw"; break;
		case 1: ++params.playerPoints; roundResult = "win"; break;
	}
	++params.roundNumber;
	result.innerHTML = '<br>Round: ' + params.roundNumber + ' Rounds to win: ' + params.limitOfRounds + '<br>' + params.playerName + ' ' + params.playerPoints + ' - ' + params.computerPoints + ' Computer';
	return roundResult;
}

// Fill final game result table.
function fillGameLogArray () {
	var newLine = document.createElement('tr');
	var activeObject = params.progress[params.progress.length-1];
	for (var key in activeObject) {
		var newElement = document.createElement('td');
		newElement.innerHTML = activeObject[key];
		newLine.appendChild(newElement);
	}
	params.finalArray.appendChild(newLine);
}

// Begin new round of game.
function playerMove (dataMove) {
	if (params.newGameActive) {
		var playMove = dataMove.target.value;
		var compMove = computerMove();
		var roundResult = giveRoundResult(playMove, compMove);
		roundResult = countPoints(roundResult);
		params.progress.push({
			arrRoundNumber: params.roundNumber,
			arrPlayerMove: playMove,
			arrComputerMove: compMove,
			arrRoundResult: roundResult,
			arrGameResult: params.playerPoints + ' - ' + params.computerPoints
		});
		fillGameLogArray();
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
	params.endgameModalContent.innerHTML = "";
	while (params.finalArray.children.length > 1) {
    	params.finalArray.removeChild(params.finalArray.lastChild);
	}
}


// Open modal with new game form.
function newGame () {
	clearText();
	document.querySelector('#modal-overlay').classList.add('show');
	document.querySelector('#modal-gamestart').classList.add('show');
	document.querySelector('#modal-gamestart').addEventListener('click', function(event){ event.stopPropagation() });
}

// Start a new game
function startGame () {
	document.querySelector('#modal-overlay').classList.remove('show');
	document.querySelector('#modal-gamestart').classList.remove('show');
	params.newGameActive = true;
	params.roundNumber = 0;
	params.playerPoints = 0;
	params.computerPoints = 0;
	params.limitOfRounds = 0;
	params.playerName = document.querySelector("#player-name").value;
	params.limitOfRounds = document.querySelector("#rounds-number").value;
	params.limitOfRounds = parseInt(params.limitOfRounds);
}

// Modals - hide.
function hideModal(event) {
	event.preventDefault();
	document.querySelector('#modal-overlay').classList.remove('show');
	var hideContent = document.querySelectorAll('.modal');
	for(var i = 0; i < hideContent.length; i++) {
		hideContent[i].classList.remove('show');
	}
}

(function registerListeners () {
	var closeButtons = document.querySelectorAll('.modal .close');
	for (var i = 0; i < closeButtons.length; i++){
		closeButtons[i].addEventListener('click', hideModal);
	}
	document.querySelector('#modal-overlay').addEventListener('click', hideModal);
})();