import { createReducer } from "@reduxjs/toolkit";
import { combineReducers } from "redux";
import actions from "./actions";

const filterReducer = createReducer("", {
  [actions.filterContacts]: (_, { payload }) => payload,
});

const savedContacts = JSON.parse(localStorage.getItem("contacts"));

const itemsReducer = createReducer(savedContacts || [], {
  [actions.addContact]: (state, { payload }) => [...state, payload],
  [actions.removeContact]: (state, { payload }) =>
    state.filter(({ id }) => id !== payload),
});

const contactsReducer = combineReducers({
  items: itemsReducer,
  filter: filterReducer,
});

const rootReducer = combineReducers({
  contacts: contactsReducer,
});

export default rootReducer;
