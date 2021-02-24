import { combineReducers, createStore } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import actionTypes from "./types";

const filterReducer = (state = "", { type, payload }) => {
  switch (type) {
    case actionTypes.FILTER:
      return payload;

    default:
      return state;
  }
};

const itemsReducer = (state = [], { type, payload }) => {
  switch (type) {
    case actionTypes.ADD:
      return [...state, payload];

    case actionTypes.DELETE:
      return state.filter(({ id }) => id !== payload);

    default:
      return state;
  }
};

const contactsReducer = combineReducers({
  items: itemsReducer,

  filter: filterReducer,
});

const rootReducer = combineReducers({
  contacts: contactsReducer,
});

const store = createStore(rootReducer, composeWithDevTools());

console.log("store", store.getState());

export default store;
