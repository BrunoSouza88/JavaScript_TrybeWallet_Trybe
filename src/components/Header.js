import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class Header extends Component {
  sumExpenses = () => {
    const { expenses } = this.props;
    const totalSum = expenses.reduce((acc, curr) => {
      const { value, exchangeRates, currency } = curr;
      const { ask } = exchangeRates[currency];
      return acc + (value * ask);
    }, 0);
    return totalSum.toFixed(2);
  };

  render() {
    const { userEmail } = this.props;

    return (
      <div>
        <p data-testid="email-field">
          Email da pessoa:
          { userEmail }
        </p>
        <div data-testid="total-field">
          {this.sumExpenses()}
        </div>
        <p data-testid="header-currency-field">BRL</p>
      </div>
    );
  }
}

Header.propTypes = {
  userEmail: PropTypes.string,
}.isRequired;

const mapStateToProps = (state) => ({
  userEmail: state.user.email,
  expenses: state.wallet.expenses,
});

export default connect(mapStateToProps)(Header);
