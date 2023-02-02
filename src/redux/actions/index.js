// Coloque aqui suas actions
export const GET_USER = 'GET USER';

export const GET_WALLET = 'GET_WALLET';

export const GET_CURRENCY = 'GET_CURRENCY';

export const SUM_EXPENSE = 'SUM_EXPENSE';

const getUser = (userData) => ({
  type: GET_USER,
  payload: {
    userData,
  },
});

const addExpenseList = (expense) => async (dispatch) => { ///
  const response = await fetch('https://economia.awesomeapi.com.br/json/all');
  const data = await response.json();
  const {
    id,
    value,
    description,
    currency,
    method,
    tag,
  } = expense;

  return dispatch({
    type: SUM_EXPENSE,
    payload: {
      id,
      value,
      description,
      currency,
      method,
      tag,
      exchangeRates: data,
    },
  });
};

const getWallet = (walletData) => ({
  type: GET_WALLET,
  payload: walletData,
});

const fetchAPI = () => async (dispatch) => {
  const API = await fetch('https://economia.awesomeapi.com.br/json/all');
  const response = await API.json();
  const currencies = Object.keys(response)
    .filter((element) => element !== 'USDT');
  dispatch({
    type: GET_CURRENCY,
    payload: {
      currencies,
    },
  });
};

export {
  getUser,
  getWallet,
  fetchAPI,
  addExpenseList,
};
