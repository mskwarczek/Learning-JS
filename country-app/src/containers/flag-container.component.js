import React, { Component } from 'react';
import { connect } from 'react-redux';
import CountryFlagList from '../presentational/flag-list.component';
import Pagination from '../presentational/pagination.component';
import { getCountries, searchCountries, deleteCountry, setPages, previousPage, nextPage } from '../actions/actions-countries';

class CountryFlagContainer extends Component {
 //   constructor(props) {
 //       super(props);
 //   }

    componentDidMount() {
        this.props.dispatch(getCountries());
        this.props.dispatch(searchCountries(''));
    }

    setPages(number, page) {
        this.props.dispatch(setPages(number, page));
    }

    previousPage() {
        this.props.dispatch(previousPage());
    }

    nextPage() {
        this.props.dispatch(nextPage());
    }

    search(event) {
        this.props.dispatch(searchCountries(event.target.value));
        this.props.dispatch(setPages(5, 1));
    }

    deleteCountry(id) {
        this.props.dispatch(deleteCountry(id));
    }

    render() {
        const start = (this.props.activePage - 1) * this.props.countriesPerPage;
        const end = this.props.activePage * this.props.countriesPerPage;
        const countriesVisibleOnPage = this.props.visibleCountries.slice(start, end);
        return (
            <div>
                <div className="search text-center">
                    <input type="text" onChange={this.search.bind(this)}/>
                </div>
                <Pagination previousPage={this.previousPage.bind(this)} nextPage={this.nextPage.bind(this)} setPages={this.setPages.bind(this)} activePage={this.props.activePage}/>
                <CountryFlagList countries={countriesVisibleOnPage} deleteCountry={this.deleteCountry.bind(this)} />
            </div>
        )
    }
}

const mapStateToProps = function (store) {
    return {
        countries: store.countriesReducer.countries,
        visibleCountries: store.countriesReducer.visibleCountries,
        activePage: store.countriesReducer.activePage,
        countriesPerPage: store.countriesReducer.countriesPerPage
    };
};

export default connect(mapStateToProps)(CountryFlagContainer);