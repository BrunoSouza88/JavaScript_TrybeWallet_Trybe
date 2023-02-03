// Esse reducer será responsável por tratar o todas as informações relacionadas as despesas
import { GET_CURRENCY, SUM_EXPENSE, REMOVE_EXPENSE } from '../actions';//

const INITIAL_STATE = {
  // user: {
  //   email: '', // string que armazena o email da pessoa usuária
  // },

  currencies: [], // array de string
  expenses: [], // array de objetos, com cada objeto tendo as chaves id, value, currency, method, tag, description e exchangeRates
  editor: false, // valor booleano que indica de uma despesa está sendo editada
  idToEdit: 0, // valor numérico que armazena o id da despesa que esta sendo editada
};

const wallet = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case GET_CURRENCY:
    return {
      ...state,
      currencies: action.payload.currencies,
    };
  case SUM_EXPENSE:
    return {
      ...state,
      expenses: [...state.expenses,
        { ...action.payload }],
    };
  case REMOVE_EXPENSE: ///
    return {
      ...state,
      expenses: state.expenses.filter((element) => element.id !== action.payload),
    };
  default:
    return state;
  }
};

export default wallet;
