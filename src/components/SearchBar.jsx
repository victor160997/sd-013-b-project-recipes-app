import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './SearchBar.css';

export default class SearchBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchInput: '',
      radioSearch: '',
      search: false,
    };
    this.handleChange = this.handleChange.bind(this);
    this.setSearch = this.setSearch.bind(this);
  }

  componentDidUpdate(props) {
    const { fetchApi } = props;
    const { searchInput, radioSearch, search } = this.state;
    if (radioSearch === 'search.php?f=' && searchInput.length > 1) {
      global.alert('Sua busca deve conter somente 1 (um) caracter');
      return undefined;
    }
    if (search === true) {
      fetchApi(radioSearch, searchInput);
      this.setSearch();
    }
  }

  handleChange(event) {
    const theKey = event.target.name;
    this.setState({ [theKey]: event.target.value });
  }

  setSearch() {
    this.setState((prevState) => ({
      search: !prevState.search,
    }));
  }

  render() {
    const { searchInput } = this.state;
    return (
      <form className="form-search">
        <label htmlFor="search-input" className="search-input">
          <input
            className="theInput"
            type="text"
            data-testid="search-input"
            id="search-input"
            name="searchInput"
            value={ searchInput }
            onChange={ this.handleChange }
          />
        </label>
        <label
          htmlFor="ingredient-search-radio"
          className="search-input"
        >
          <input
            className="radio-input"
            type="radio"
            data-testid="ingredient-search-radio"
            name="radioSearch"
            value="filter.php?i="
            onClick={ this.handleChange }
          />
          Ingrediente
        </label>
        <label
          htmlFor="name-search-radio"
          className="search-input"
        >
          <input
            className="radio-input"
            type="radio"
            data-testid="name-search-radio"
            name="radioSearch"
            value="search.php?s="
            onClick={ this.handleChange }
          />
          Nome
        </label>
        <label
          htmlFor="first-letter-search-radio"
          className="search-input"
        >
          <input
            id="oi"
            className="radio-input"
            type="radio"
            data-testid="first-letter-search-radio"
            name="radioSearch"
            value="search.php?f="
            onClick={ this.handleChange }
          />
          Primeira letra
        </label>
        <button
          type="button"
          data-testid="exec-search-btn"
          onClick={ this.setSearch }
          className="button-search"
        >
          Buscar
        </button>
      </form>
    );
  }
}

SearchBar.propTypes = {
  fetchApi: PropTypes.func.isRequired,
};
