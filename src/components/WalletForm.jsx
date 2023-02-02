import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchAPI, addExpenseList } from '../redux/actions';

class WalletForm extends Component {
  state = {
    id: 0,
    value: '',
    description: '',
    currency: 'USD',
    method: 'Dinheiro',
    tag: 'Alimentação',
  };

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(fetchAPI());
  }

  cleanInputsWallet = () => {
    this.setState({
      value: '',
      description: '',
    });
  };

  handleClick = () => {
    const { id } = this.state;
    const { dispatch } = this.props;

    dispatch(addExpenseList({ ...this.state }));
    this.setState({
      id: id + 1,
    });
    this.cleanInputsWallet();
  };

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({
      [name]: value,
    });
  };

  render() {
    const {
      value,
      description,
      currency,
      method,
      tag,
    } = this.state;

    const { currencies } = this.props;
    return (
      <div>
        <h1>Componente WalletForm</h1>
        <label htmlFor="valueinput">
          Valor:
          <input
            type="number"
            name="value"
            value={ value }
            id="valueinput"
            data-testid="value-input"
            onChange={ this.handleChange }
          />
        </label>
        <label htmlFor="currency">
          Moeda:
          <select
            id="currency"
            name="currency"
            value={ currency }
            data-testid="currency-input"
            onChange={ this.handleChange }
          >
            {
              currencies.map((element, index) => (
                <option value={ element } key={ index }>{element}</option>
              ))
            }
          </select>
        </label>
        <div>
          <label htmlFor="paymentmeth">
            Metodo de pagamento:
            <select
              name="method"
              value={ method }
              id="paymentmeth"
              data-testid="method-input"
              onChange={ this.handleChange }
            >
              <option value="Dinheiro">Dinheiro</option>
              <option value="Cartão de crédito">Cartão de crédito</option>
              <option value="Cartão de débito">Cartão de débito</option>
            </select>
          </label>
        </div>
        <div>
          <label htmlFor="description">
            Descrição
            <input
              type="text"
              name="description"
              value={ description }
              id="description"
              data-testid="description-input"
              onChange={ this.handleChange }
            />
          </label>
        </div>
        <div>
          <label htmlFor="categoryexpense">
            Categoria
            <select
              name="tag"
              value={ tag }
              id="categoryexpense"
              data-testid="tag-input"
              onChange={ this.handleChange }
            >
              <option value="Alimentação">Alimentação</option>
              <option value="Lazer">Lazer</option>
              <option value="Trabalho">Trabalho</option>
              <option value="Transporte">Transporte</option>
              <option value="Saúde">Saúde</option>
            </select>
          </label>
        </div>
        <button
          type="button"
          onClick={ this.handleClick }
        >
          Adicionar despesa
        </button>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  currencies: state.wallet.currencies,
});

WalletForm.propTypes = {
  dispatch: PropTypes.func,
}.isRequired;

export default connect(mapStateToProps)(WalletForm);
