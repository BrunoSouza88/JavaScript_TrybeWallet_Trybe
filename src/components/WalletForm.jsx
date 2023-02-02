import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchAPI } from '../redux/actions';

class WalletForm extends Component {
  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(fetchAPI());
  }

  render() {
    const { currencies } = this.props;
    return (
      <div>
        <h1>Componente WalletForm</h1>
        <label htmlFor="valueinput">
          Valor:
          <input type="number" name="" id="valueinput" data-testid="value-input" />
        </label>
        <select data-testid="currency-input">
          {
            currencies.map((element, index) => (
              <option value={ element } key={ index }>{element}</option>
            ))
          }
        </select>
        <div>
          <label htmlFor="paymentmeth">
            Metodo de pagamento:
            <select name="" id="paymentmeth" data-testid="method-input">
              <option value="Dinheiro">Dinheiro</option>
              <option value="Cartão de crédito">Cartão de crédito</option>
              <option value="Cartão de débito">Cartão de débito</option>
            </select>
          </label>
        </div>
        <div>
          <label htmlFor="description">
            Descrição
            <input type="text" name="" id="description" data-testid="description-input" />
          </label>
        </div>
        <div>
          <label htmlFor="categoryexpense">
            Categoria
            <select name="" id="categoryexpense" data-testid="tag-input">
              <option value="Alimentação">Alimentação</option>
              <option value="Lazer">Lazer</option>
              <option value="Trabalho">Trabalho</option>
              <option value="Transporte">Transporte</option>
              <option value="Saúde">Saúde</option>
            </select>
          </label>
        </div>
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
