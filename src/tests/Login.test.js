import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderWithRouterAndRedux } from './helpers/renderWith';
import App from '../App';
import Login from '../pages/Login';

const EMAIL_TEST_ID = 'email-input';
const PASSWORD_TEST_ID = 'password-input';
const emailToTest = 'teste@teste.com';

describe('Testando tela de login', () => {
  it('Verificando se os campos aparecem na tela', () => {
    renderWithRouterAndRedux(<Login />);

    // Se texto e-mail está na tela
    const emailInput = screen.getByText(/e-mail:/i);
    expect(emailInput).toBeInTheDocument();

    // Se texto senha está na tela
    const passwordInput = screen.getByText(/senha:/i);
    expect(passwordInput).toBeInTheDocument();

    // Se input e-mail está na tela
    const emailTextInput = screen.getByTestId(EMAIL_TEST_ID);
    expect(emailTextInput).toBeInTheDocument();

    // Se input senha está na tela
    const passwordTextInput = screen.getByTestId(PASSWORD_TEST_ID);
    expect(passwordTextInput).toBeInTheDocument();

    // Se login está na tela
    const loginBtn = screen.getAllByRole('button', {
      name: /entrar/i,
    });
    expect(loginBtn).toBeDefined();
  });

  it('Verifica se o botão continua desabilitado com os dados incorretos', () => {
    renderWithRouterAndRedux(<Login />);

    const emailTextInput = screen.getByTestId(EMAIL_TEST_ID);
    const passwordTextInput = screen.getByTestId(PASSWORD_TEST_ID);
    const loginBtn = screen.getByRole('button', {
      name: /entrar/i,
    });

    userEvent.type(emailTextInput, emailToTest);
    userEvent.type(passwordTextInput, '11111');
    expect(loginBtn).toBeDisabled();

    userEvent.type(emailTextInput, emailToTest);
    userEvent.type(passwordTextInput, '1111111');
    expect(loginBtn).toBeDisabled();
  });

  it('Testando se com dados corretos faz o login e redireciona para próxima página', () => {
    const { history } = renderWithRouterAndRedux(<App />);

    const emailTextInput = screen.getByTestId(EMAIL_TEST_ID);
    const passwordTextInput = screen.getByTestId(PASSWORD_TEST_ID);
    const loginBtn = screen.getByRole('button', {
      name: /entrar/i,
    });

    expect(loginBtn).toBeDisabled();

    userEvent.type(emailTextInput, emailToTest);
    userEvent.type(passwordTextInput, '111111');

    expect(loginBtn).toBeEnabled();

    userEvent.click(loginBtn);

    history.push('/carteira');
  });
});
