import uniqid from "uniqid";
import actionTypes from "./types";

const addContact = (name, number) => ({
  type: actionTypes.ADD,
  payload: {
    name: name,
    number: number,
    id: uniqid(),
  },
});

const removeContact = (id) => ({
  type: actionTypes.DELETE,
  payload: id,
});

const filterContacts = (value) => ({
  type: actionTypes.FILTER,
  payload: value,
});

export default {
  addContact,
  removeContact,
  filterContacts,
};
