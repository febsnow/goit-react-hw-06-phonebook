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

export default {
  addContact,
  removeContact,
};
