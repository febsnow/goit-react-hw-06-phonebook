import { combineReducers, createStore } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import actionTypes from "./types";

const filterReducer = (state = "", action) => {
  return state;
};

const contactsReducer = (state = { items: [] }, { type, payload }) => {
  switch (type) {
    case actionTypes.ADD:
      return {
        items: [...state.items, payload],
      };

    case actionTypes.DELETE:
      console.log("delete", payload);
      return {
        items: state.items.filter(({ id }) => id !== payload),
      };

    default:
      return state;
  }
};

const rootReducer = combineReducers({
  contacts: contactsReducer,

  filter: filterReducer,
});

const store = createStore(rootReducer, composeWithDevTools());

export default store;
