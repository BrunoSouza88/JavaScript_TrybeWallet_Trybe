// Esse reducer será responsável por tratar as informações da pessoa usuária
import { GET_USER } from '../actions';

const INITIAL_STATE = {
  user: {
    email: '', // string que armazena o email da pessoa usuária
  },
  wallet: {
    currencies: [], // array de string
    expenses: [], // array de objetos, com cada objeto tendo as chaves id, value, currency, method, tag, description e exchangeRates
    editor: false, // valor booleano que indica de uma despesa está sendo editada
    idToEdit: 0, // valor numérico que armazena o id da despesa que esta sendo editada
  },
};

const user = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case GET_USER:
    return {
      ...state, // boa pratica diz ter o spread state. Porém, como minha chave tme um item só, não é preciso.
      // user: {
      //   email: action.payload.userData, // Salva dentro da chave, mas não passa no teste
      // },
      email: action.payload.userData, // Salva chave fora do user, mas passa no teste
    };

  default:
    return state;
  }
};

export default user;
