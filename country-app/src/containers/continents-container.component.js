import React, { Component } from 'react';
import { connect } from 'react-redux';
import { setContinent, deleteCountry, setPages, previousPage, nextPage } from '../actions/actions-countries';
import Pagination from '../presentational/pagination.component';
import CountryFlagList from '../presentational/flag-list.component';

class ContinentsContainer extends Component {
  //  constructor(props) {
  //      super(props);
  //  }

    componentDidMount() {
        this.props.dispatch(setContinent('Europa'));
        this.props.dispatch(setPages(5, 1));
    }

    chooseContinent(event) {
        this.props.dispatch(setContinent(event.target.value))
    }

    deleteCountry(id) {
        this.props.dispatch(deleteCountry(id));
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

    render() {
        const start = (this.props.activePage - 1) * this.props.countriesPerPage;
        const end = this.props.activePage * this.props.countriesPerPage;
        const countriesVisibleOnPage = this.props.visibleCountries.slice(start, end);
        return (
            <div>
                <select onChange={e => this.chooseContinent(e)}>
                    <option value="Europa">Europa</option>
                    <option value="Afryka">Afryka</option>
                </select>
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

export default connect(mapStateToProps)(ContinentsContainer);