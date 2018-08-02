var url = 'https://restcountries.eu/rest/v2/name/';
var countriesList = document.getElementById('countries');

document.getElementById('search').addEventListener('click', searchCountries);

function searchCountries() {
    var countryName = document.getElementById('country-name').value;
    if(!countryName.length) countryName = 'Poland';
    fetch(url + countryName)
        .then(function(resp) {
            return resp.json();
        })
        .then(createTemplate);
}

function createTemplate(resp) {
	countriesList.innerHTML = '';
	var templateCountry = document.getElementById('template').innerHTML;
	Mustache.parse(templateCountry);
	resp.forEach(function(item){
		var items = Mustache.render(templateCountry, item);
		countriesList.insertAdjacentHTML('beforeend', items);
	});
}
