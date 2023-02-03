import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class Table extends Component {
  render() {
    const { expenses } = this.props;
    console.log(expenses);
    return (
      <div>
        <h1>Component Table</h1>
        <table>
          <tr>
            <th>Descrição</th>
            <th>Tag</th>
            <th>Método de pagamento</th>
            <th>Valor</th>
            <th>Moeda</th>
            <th>Câmbio utilizado</th>
            <th>Valor convertido</th>
            <th>Moeda de conversão REAL</th>
            <th>Editar/Excluir</th>
          </tr>
          {
            expenses.map((element) => (
              <tbody key={ element.id }>
                <tr>
                  <td>{ element.description }</td>
                  <td>{ element.tag }</td>
                  <td>{ element.method }</td>
                  <td>{ (element.value * 1).toFixed(2) }</td>
                  <td>{ element.exchangeRates[element.currency].name }</td>
                  <td>
                    {((element.exchangeRates[element.currency].ask) * 1)
                      .toFixed(2) }
                  </td>
                  <td>
                    { (element.value * element.exchangeRates[element.currency].ask)
                      .toFixed(2) }
                  </td>
                  <td>Real</td>
                </tr>
              </tbody>
            ))
          }
        </table>
      </div>
    );
  }
}

Table.propTypes = {
  expenses: PropTypes.arrayOf,
}.isRequired;

const mapStateToProps = (state) => ({
  expenses: state.wallet.expenses,
});

export default connect(mapStateToProps)(Table);
