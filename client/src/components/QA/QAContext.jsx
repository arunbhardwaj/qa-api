import React from 'react';

/**
 * State object
 * @type {{search: string, product_id: number, question_id: number, showQuestionModal: boolean, showAnswerModal: boolean}}
 */
const initialState = {
  search: '',
  product_id: -1,
  question_id: -1,
  showQuestionModal: false,
  showAnswerModal: false,
  reload: 0
};

/**
 * Actions object
 * @type {{SET_SEARCH: string, SET_PRODUCT_ID: string, SET_QUESTION_ID: string, TOGGLE_MODAL: string}}
 */
const actions = {
  SET_SEARCH: 'SET_SEARCH',
  SET_PRODUCT_ID: 'SET_PRODUCT_ID',
  SET_QUESTION_ID: 'SET_QUESTION_ID',
  TOGGLE_MODAL: 'TOGGLE_MODAL',
  RELOAD: 'RELOAD'
};

function reducer(state = initialState, action) {
  switch (action.type) {
    case actions.SET_SEARCH:
      return { ...state, search: action.payload };
    case actions.TOGGLE_MODAL:
      return {...state, [action.payload]: !state[action.payload] };
    case actions.SET_PRODUCT_ID:
      return {...state, product_id: action.payload };
    case actions.SET_QUESTION_ID:
      return {...state, question_id: action.payload };
    case actions.RELOAD:
      return {...state, reload: state.reload + 1}
    default:
      return state;
  }
}

// Create the context
export const QAContext = React.createContext();

// Create a context provider that gives children access to the context
export function Provider({ children }) {
  const [state, dispatch] = React.useReducer(reducer, initialState);

  const value = {
    search: state.search,
    product_id: state.product_id,
    question_id: state.question_id,
    reload: state.reload,
    showQuestionModal: state.showQuestionModal,
    showAnswerModal: state.showAnswerModal,
    triggerReload: () => dispatch({type: actions.RELOAD}),
    setProductId: (value) => dispatch({type: actions.SET_PRODUCT_ID, payload: value}),
    setQuestionId: (value) => dispatch({type: actions.SET_QUESTION_ID, payload: value}),
    setSearch: (e) => dispatch({type: actions.SET_SEARCH, payload: e.target.value}),
    toggleModal: (value) => dispatch({type: actions.TOGGLE_MODAL, payload: value})
  }

  return <QAContext.Provider value={value}>{children}</QAContext.Provider>;
}