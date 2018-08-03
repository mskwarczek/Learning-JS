// Global variables
var url = 'https://restcountries.eu/rest/v2/name/';
var countriesList = document.getElementById('countries-list')
var countryInfo = document.getElementById('country-info')

addListeners();

// Add listeners to clickable elements.
function addListeners() {
	document.getElementById('search').addEventListener('click', searchForCountries);
	document.getElementById('switch').addEventListener('click', toggleList);
	var countriesInsideList = document.querySelectorAll('.country');
	for (let i = 0; i < countriesInsideList.length; i++) {
		countriesInsideList[i].addEventListener('click', findMoreInfo);
	}
}

// Toggle the countries list on/off.
function toggleList() {
	countriesList.classList.toggle('hide');
}

// Send a GET request for all countries that match specified name or part of name. The output is filtered to the names of countries only. 
function searchForCountries() {
    var countryName = document.getElementById('country-name').value;
    if(!countryName.length) countryName = 'Poland';
    fetch(url + countryName + '?fields=name')
        .then(function(resp) {
            return resp.json();
        })
        .then(showCountriesList)
        .catch(function(error) {
			alert("No matching countries were found.");
	});
}

// Clear the countries list and the country information box and show countries list.
function reset() {
	countriesList.innerHTML = '';
	countryInfo.innerHTML = '';
	countriesList.classList.remove('hide');
}

// Discard items with the "name" propety different form requested (as the API endpoint compares requests not only with "name" but also with "altSpellings")
// Create list items inside the countries list. Show them and add listeners to them.
function showCountriesList(resp) {
	reset();
	resp.forEach(function(item){
		if (item.name.toLowerCase().includes(document.getElementById('country-name').value.toLowerCase())) {
    		var liEl = document.createElement('li');
    		liEl.classList.add('country');
    		liEl.innerText = item.name;
    		countriesList.appendChild(liEl);
    	}
	});
	addListeners();
}

// Send a GET request for complete information about chosen country.
function findMoreInfo() {
	countriesList.classList.add('hide');
    var countryName = this.innerText;
    fetch(url + countryName)
        .then(function(resp) {
            return resp.json();
        })
        .then(showCountryInfo);
}

// Show information about given country.
function showCountryInfo(resp) {
	countryInfo.innerHTML = '';
	var templateCountry = document.getElementById('template').innerHTML;
	Mustache.parse(templateCountry);
	var item = Mustache.render(templateCountry, resp[0]);
	countryInfo.insertAdjacentHTML('beforeend', item);
}