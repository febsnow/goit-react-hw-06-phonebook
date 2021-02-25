import { combineReducers } from "redux";
import actionTypes from "./types";

const filterReducer = (state = "", { type, payload }) => {
  switch (type) {
    case actionTypes.FILTER:
      return payload;

    default:
      return state;
  }
};

const savedContacts = JSON.parse(localStorage.getItem("contacts"));

const itemsReducer = (state = savedContacts || [], { type, payload }) => {
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

export default rootReducer;
