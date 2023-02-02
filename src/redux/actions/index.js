// Coloque aqui suas actions
export const GET_USER = 'GET USER';

export const GET_WALLET = 'GET_WALLET';

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

export { getUser, getWallet };
