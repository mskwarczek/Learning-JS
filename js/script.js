'use strict';

(function(){
	var templateCarouselCell = document.getElementById('template').innerHTML;
	Mustache.parse(templateCarouselCell);
	var results = document.querySelectorAll('.carousel-cell');
	for(var i = 0; i < carouselCellsData.length; i++) {
		var items = Mustache.render(templateCarouselCell, carouselCellsData[i]);
		results[i].insertAdjacentHTML('beforeend', items);
	}
})();

var elem = document.querySelector('.main-carousel');
var flkty = new Flickity( elem, {
	hash: true,
	pageDots: false,
	cellAlign: 'left',
	contain: true
});

var restartButton = document.querySelector('.button-restart');
restartButton.addEventListener('click', function() {
	flkty.select(0);
});

var progressBar = document.querySelector('.progress-bar')
flkty.on('scroll', function(progress) {
  progress = Math.max(0, Math.min(1, progress));
  progressBar.style.width = progress * 100 + '%';
});

window.initMap = function() {

	var position = {lat: carouselCellsData[0].coords.lat, lng: carouselCellsData[0].coords.lng};
	var map = new google.maps.Map(document.getElementById('map'), {zoom: 8, center: position});
	for (let i = 0; i < carouselCellsData.length; i++) {
		position = {lat: carouselCellsData[i].coords.lat, lng: carouselCellsData[i].coords.lng};
		var marker = new google.maps.Marker({position: position, map: map});
		marker.addListener('click', function() {
			flkty.select(i);
		});
	}
	flkty.on('change', function(index) {
		map.panTo({lat: carouselCellsData[index].coords.lat, lng: carouselCellsData[index].coords.lng});
		map.setZoom(8);
	});
}