import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { getDrinksApi, getFoodApi } from '../services';
// import { fetchDrinkApi, fetchFoodApi } from '../redux/actions';

export default class CategoriesButton extends Component {
  constructor() {
    super();
    this.state = {
      response: '',
    };
    this.renderButton = this.renderButton.bind(this);
  }

  async componentDidMount() {
    const { category } = this.props;
    this.setResponse(category);
  }

  async setResponse(category) {
    const requisition = category === 'meals'
      ? await getFoodApi('list.php?c=list', '')
      : await getDrinksApi('list.php?c=list', '');

    return this.setState({
      response: requisition[category],
    });
  }

  renderButton(response) {
    const four = 4;
    return response.map((categ, index) => {
      if (index <= four) {
        return (
          <button
            type="button"
            data-testid={ `${Object.values(categ)[0]}-category-filter` }
            key={ Object.values(categ)[0] }
          >
            {Object.values(categ)[0]}
          </button>
        );
      }
      return undefined;
    });
  }

  render() {
    const { response } = this.state;
    return (
      <div>
        { response !== '' ? this.renderButton(response) : <span> Carregando </span> }
        Categories
      </div>
    );
  }
}

CategoriesButton.propTypes = {
  category: PropTypes.string.isRequired,
};