import { getByText, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderWithRouterAndRedux } from './helpers/renderWith';
import App from '../App';

const EMAIL_TEST_ID = 'email-input';
const PASSWORD_TEST_ID = 'password-input';
const emailToTest = 'teste@teste.com';

describe('Avaliando o caminho carteira', () => {
  it('', () => {
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

    const emailSet = screen.getByText(/email da pessoa:teste@teste\.com/i);
    expect(emailSet).toBeInTheDocument();

    const sumTotal = screen.getByTestId('total-field');
    expect(sumTotal).toBeInTheDocument();

    const BRL = screen.getByText(/brl/i);
    expect(BRL).toBeInTheDocument();

    const inputValue = screen.getByRole('spinbutton', {
      name: /valor:/i,
    });
    expect(inputValue).toBeInTheDocument();

    const inputCurrency = screen.getByRole('combobox', {
      name: /moeda:/i,
    });
    expect(inputCurrency).toBeInTheDocument();

    const inputMethod = screen.getByRole('combobox', {
      name: /metodo de pagamento:/i,
    });
    expect(inputMethod).toBeInTheDocument();

    const inputDescription = screen.getByRole('textbox', {
      name: /descrição/i,
    });
    expect(inputDescription).toBeInTheDocument();

    const inputTag = screen.getByRole('combobox', {
      name: /categoria/i,
    });
    expect(inputTag).toBeInTheDocument();

    const addExpenseBtn = screen.getByRole('button', {
      name: /adicionar despesa/i,
    });
    expect(addExpenseBtn).toBeInTheDocument();

    userEvent.type(inputValue, '10');
    userEvent.type(inputDescription, 'Suco');
    userEvent.click(addExpenseBtn);

    expect(sumTotal.innerHTML).toBe('0.00');

    const walletDescription = screen.getByRole('cell', {
      name: /suco/i,
    });
    expect(walletDescription).toBeInTheDocument();
    expect(walletDescription.innerHTML).toBe('Suco');

    const walletTag = screen.getByRole('cell', {
      name: /alimentação/i,
    });
    expect(walletTag).toBeInTheDocument();
    expect(walletTag.innerHTML).toBe('Alimentação');

    const walletMethod = screen.getByRole('cell', {
      name: /dinheiro/i,
    });

    expect(walletMethod).toBeInTheDocument();
    expect(walletMethod.innerHTML).toBe('Dinheiro');

    const walletValue = screen.getByRole('cell', {
      name: /10\.00/i,
    });
    expect(walletValue).toBeInTheDocument();
    expect(walletValue.innerHTML).toBe(10.00);

    const walletExchage = screen.getByRole('cell', {
      name: /dólar americano\/real brasileiro/i,
    });
    expect(walletExchage).toBeInTheDocument();
    expect(walletExchage.innerHTML).toBe('Dólar Americano/Real Brasileiro');

    const walletChange = screen.getByRole('cell', {
      name: /5\.15/i,
    });
    expect(walletChange).toBeInTheDocument();
    expect(walletChange.innerHTML).toBe(5.15);

    const walletValueConvo = screen.getByRole('cell', {
      name: /51\.53/i,
    });
    expect(walletValueConvo).toBeInTheDocument();
    expect(walletValueConvo.innerHTML).toBe(51.53);

    const walletBRL = getByText('BRL');
    expect(walletBRL).toBeInTheDocument();
    expect(walletBRL.innerHTML).toBe('BRL');

    const deleteBtn = screen.getByRole('button', {
      name: /excluir/i,
    });
    expect(deleteBtn).toBeInTheDocument();
    expect(deleteBtn.innerHTML).toBe('Excluir');

    userEvent.click(deleteBtn);

    expect(sumTotal.innerHTML).toBe(0);
    expect(walletDescription).not.toBeInTheDocument();
    expect(walletTag).not.toBeInTheDocument();
    expect(walletMethod).not.toBeInTheDocument();
    expect(walletValue).not.toBeInTheDocument();
    expect(walletExchage).not.toBeInTheDocument();
    expect(walletChange).not.toBeInTheDocument();
    expect(walletValueConvo).not.toBeInTheDocument();
    expect(deleteBtn).not.toBeInTheDocument();
  });
});
