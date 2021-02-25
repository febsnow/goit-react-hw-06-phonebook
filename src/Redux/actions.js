import { createAction } from "@reduxjs/toolkit";
import uniqid from "uniqid";

const addContact = createAction("contacts/add", (name, number) => ({
  payload: {
    name: name,
    number: number,
    id: uniqid(),
  },
}));

const removeContact = createAction("contacts/delete");
const filterContacts = createAction("contacts/filter");

export default {
  addContact,
  removeContact,
  filterContacts,
};
