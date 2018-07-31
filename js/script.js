'use strict';

var url = 'http://api.icndb.com/jokes/random';

var button = document.getElementById('get-joke');
button.addEventListener('click', function(){
  getJoke();
});

var paragraph = document.getElementById('joke');

function getJoke() {
	axios.get(url)
	.then(function (response) {
    	paragraph.innerHTML = response.data.value.joke;
})}

getJoke();