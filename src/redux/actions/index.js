// Coloque aqui suas actions
export const GET_USER = 'GET USER';

export const GET_WALLET = 'GET_WALLET';

export const GET_CURRENCY = 'GET_CURRENCY';

const getUser = (userData) => ({
  type: GET_USER,
  payload: {
    userData,
  },
});

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
};
