'use strict';

(function(){

	var accordionVanillaJS = function(){
		var headers = document.querySelectorAll('#accordion-vanillajs h3');
		var headerClickCallback = function(){
			this.classList.add('active');
			for(var i = 0; i < headers.length; i++){
				if(headers[i].classList.contains('active') && headers[i] != this){
					headers[i].classList.remove('active');
				}
			}
		};		
		for(var i = 0; i < headers.length; i++){
			headers[i].addEventListener('click', headerClickCallback);
		}
	};
	
	accordionVanillaJS();
	
	var accordionJQuery = function() {
		$('#accordion-jquery h3').on('click', function() {
			$(this).addClass('active');
			$(this).siblings().removeClass('active');
		});
	};
	
	accordionJQuery();

})(); 