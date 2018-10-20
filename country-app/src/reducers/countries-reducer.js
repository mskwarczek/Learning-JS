import { GET_COUNTRIES, GET_COUNTRY, SEARCH_COUNTRIES, DELETE_COUNTRY, SET_CONTINENT, SET_PAGES, PREVIOUS_PAGE, NEXT_PAGE } from '../actions/actions-countries';
import countriesData from '../data/countries.json';

const initialState = {
    countries: countriesData,
    selectedCountry: {},
    visibleCountries: [],
    countriesPerPage: 5,
    activePage: 1
};

const countriesReducer = function (state = initialState, action) {
    switch (action.type) {
        case GET_COUNTRIES:
            return Object.assign({}, state, {countries: state.countries})
        case GET_COUNTRY:
            const selectedCountry = state.countries.find(country => country.id===parseInt(action.id));
            return Object.assign({}, state, {selectedCountry});
        case SEARCH_COUNTRIES:
            const foundCountries = state.countries.filter(country => country.name.toLowerCase().includes(action.searchText.toLowerCase()));
            return Object.assign({}, state, {visibleCountries: foundCountries});
        case DELETE_COUNTRY:
            const notDeletedCountries = state.countries.filter(country => country.id !== action.id);
            const notDeletedVisibleCountries = state.visibleCountries.filter(country => country.id !== action.id);
            return Object.assign({}, state, {countries: notDeletedCountries, visibleCountries: notDeletedVisibleCountries});
        case SET_CONTINENT:
            const continentCountries = state.countries.filter(country => country.continent === action.name);
            return Object.assign({}, state, {visibleCountries: continentCountries});
        case SET_PAGES:
            return Object.assign({}, state, {countriesPerPage: action.countriesPerPage, activePage: action.activePage});
        case PREVIOUS_PAGE:
            const prevPage = state.activePage > 1 ?
                state.activePage - 1 :
                state.activePage;
            return Object.assign({}, state, {activePage: prevPage});
        case NEXT_PAGE:
            const numberOfPages = Math.ceil(state.visibleCountries.length / state.countriesPerPage);
            const nextPage = state.activePage < numberOfPages ?
                state.activePage + 1 :
                state.activePage;
            return Object.assign({}, state, {activePage: nextPage});
        default:
            return state;
    }
};

export default countriesReducer;