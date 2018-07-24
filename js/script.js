'use strict';

var elem = document.querySelector('.main-carousel');
var flkty = new Flickity( elem, {
	hash: true,
	pageDots: false,
	cellAlign: 'left',
	contain: true
});

var restartButton = document.querySelector('.button-restart');
restartButton.addEventListener('click', function() {
	flkty.select(0)
});

var progressBar = document.querySelector('.progress-bar')
flkty.on('scroll', function(progress) {
  progress = Math.max(0, Math.min(1, progress));
  progressBar.style.width = progress * 100 + '%';
});