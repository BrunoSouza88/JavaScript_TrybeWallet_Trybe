import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getUser } from '../redux/actions';

class Login extends React.Component {
  state = {
    userEmail: '',
    userPassword: '',
    isDisabled: true,
  };

  handleValidation = () => {
    const { userEmail, userPassword } = this.state;
    const minChar = 6;
    const emailRegex = /^[\w.+]+@\w+.\w{2,}(?:.\w{2})?$/;

    const validEmail = emailRegex.test(userEmail);
    const validPassword = userPassword !== null
      && userPassword !== undefined
      && userPassword.length >= minChar;

    if (validEmail && validPassword) {
      this.setState({
        isDisabled: false,
      });
    } else {
      this.setState({
        isDisabled: true,
      });
    }
  };

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({
      [name]: value,
    }, this.handleValidation);
  };

  handleClick = () => {
    const { userEmail } = this.state;
    const { dispatch, history } = this.props;
    dispatch(getUser(userEmail));
    history.push('/carteira');
  };

  render() {
    const { userEmail, userPassword, isDisabled } = this.state;
    return (
      <div>
        <form>
          <div>
            <label htmlFor="email">
              E-mail:
              <input
                type="text"
                name="userEmail"
                value={ userEmail }
                id="email"
                data-testid="email-input"
                onChange={ this.handleChange }
              />
            </label>
          </div>
          <div>
            <label htmlFor="password">
              Senha:
              <input
                type="password"
                name="userPassword"
                id="password"
                value={ userPassword }
                data-testid="password-input"
                onChange={ this.handleChange }
              />
            </label>
          </div>
          <div>
            <button
              type="button"
              onClick={ this.handleClick }
              disabled={ isDisabled }
            >
              Entrar
            </button>
          </div>
        </form>
      </div>
    );
  }
}

Login.propTypes = {
  dispatch: PropTypes.func.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};

export default connect()(Login);
