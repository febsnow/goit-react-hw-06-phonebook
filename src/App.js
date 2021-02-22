import React, { Component } from "react";
import { CSSTransition } from "react-transition-group";
import PropTypes from "prop-types";
import uniqid from "uniqid";
import Section from "./сomponents/Section/Section";
import AddContactForm from "./сomponents/AddContactForm/AddContactForm";
import ContactList from "./сomponents/ContactsList/ContactList";
import Filter from "./сomponents/Filter/Filter";
import Logo from "./сomponents/Logo/Logo";

import * as logo from "../src/сomponents/Logo/Logo.module.css";
import * as errorMsg from "../src/сomponents/ErrorPrompt/ErrorPrompt.module.css";
import styles from "../src/сomponents/Section/Section.module.css";

import "./App.css";
import ErrorPrompt from "./сomponents/ErrorPrompt/ErrorPrompt";
import { connect } from "react-redux";

class App extends Component {
  static propTypes = {
    contacts: PropTypes.array.isRequired,
    filter: PropTypes.string,
    error: PropTypes.string,
  };

  static defaultProps = {
    // filter: "",
    contacts: [],
    error: null,
  };

  state = {
    contacts: [
      // { id: "id-1", name: "Rosie Simpson", number: "459-12-56" },
      // { id: "id-2", name: "Hermione Kline", number: "443-89-12" },
      // { id: "id-3", name: "Eden Clements", number: "645-17-79" },
      // { id: "id-4", name: "Annie Copeland", number: "227-91-26" },
    ],
    filter: "",
    error: null,
  };

  addNewContact = (name, number) => {
    this.setState({ error: null });
    const newContact = {
      id: uniqid(),
      name,
      number,
    };

    const existedContact = this.state.contacts.find(
      (contact) => contact.name === newContact.name
    );

    if (existedContact) {
      this.setState({ error: `${newContact.name} already exist` });
      return setTimeout(() => {
        this.setState({ error: null });
      }, 3000);
    }

    this.setState((prevState) => {
      return {
        contacts: [...prevState.contacts, newContact],
        error: null,
      };
    });
  };

  filterContacts = (e) => {
    this.setState({ filter: e.target.value });
  };

  filtredContacts = () => {
    const { contacts, filter } = this.state;
    return contacts.filter((contact) =>
      contact.name.toLowerCase().includes(filter.toLowerCase())
    );
  };

  removeContact = (contactId) => {
    this.setState((prevState) => {
      return {
        contacts: prevState.contacts.filter(
          (contact) => contact.id !== contactId
        ),
      };
    });
  };

  componentDidMount() {
    const savedContacts = JSON.parse(localStorage.getItem("contacts"));

    savedContacts && this.setState({ contacts: savedContacts });
    // savedContacts
    //   ? this.setState({ contacts: savedContacts })
    //   : localStorage.setItem("contacts", JSON.stringify(this.state.contacts));
  }

  componentDidUpdate(prevState) {
    if (
      this.state.contacts !== prevState.contacts &&
      this.state.contacts.length > 0
    ) {
      localStorage.setItem("contacts", JSON.stringify(this.state.contacts));
    }
  }

  render() {
    const contactsList = this.filtredContacts();
    const { contacts, filter, error } = this.state;
    console.log("render appp", this.props.items.length);

    return (
      <>
        <CSSTransition
          in={true}
          appear={true}
          timeout={250}
          classNames={styles}
          unmountOnExit
        >
          {(stage) => {
            return (
              <div className="phoneBook">
                <CSSTransition
                  in={stage === "entered"}
                  timeout={500}
                  classNames={logo}
                  unmountOnExit
                >
                  <Logo title="Phonebook" />
                </CSSTransition>

                <Section>
                  <AddContactForm
                  // submitHandler={this.addNewContact}
                  />
                </Section>

                <CSSTransition
                  appear={true}
                  in={this.props.items && this.props.items.length > 1}
                  timeout={300}
                  classNames={styles}
                  unmountOnExit
                >
                  <Section>
                    <Filter
                      value={filter}
                      changeHandler={this.filterContacts}
                    />
                  </Section>
                </CSSTransition>

                <CSSTransition
                  appear={true}
                  in={this.props.items.length > 0}
                  timeout={300}
                  classNames={styles}
                  unmountOnExit
                >
                  <Section title="Contacts">
                    <CSSTransition
                      // appear={true}
                      in={true}
                      timeout={250}
                      classNames="contactsList"
                      unmountOnExit
                    >
                      <ContactList
                      // list={contactsList}
                      // handleRemove={this.removeContact}
                      />
                    </CSSTransition>
                  </Section>
                </CSSTransition>
              </div>
            );
          }}
        </CSSTransition>

        <CSSTransition
          appear={true}
          in={error !== null}
          timeout={300}
          classNames={errorMsg}
          unmountOnExit
        >
          <ErrorPrompt message={error} />
        </CSSTransition>

        {/* {error && <ErrorPrompt message={error} />} */}
      </>
    );
  }
}
const mapStateToProps = (state) => {
  console.log(state.contacts);
  return {
    items: state.contacts.items,
    filter: state.filter,
  };
};

export default connect(mapStateToProps)(App);
