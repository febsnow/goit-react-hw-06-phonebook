import React, { Component } from "react";
import PropTypes from "prop-types";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import "./ContactList.css";
import { connect } from "react-redux";
import actions from "../../Redux/actions";

class ContactList extends Component {
  static propTypes = {
    // list: PropTypes.array.isRequired,
  };

  componentWillUnmount() {
    localStorage.removeItem("contacts");
  }

  render() {
    const { items, handleRemove } = this.props;
    console.log("list", this.props);
    return (
      <TransitionGroup component="ul" className="list">
        {items.map((contact) => {
          return (
            <CSSTransition
              appear={true}
              key={contact.id}
              timeout={650}
              classNames="item"
              unmountOnExit
            >
              <li className="listItem">
                <span className="info">{contact.name}:</span>
                <span className="info">{contact.number}</span>
                <button
                  className="button"
                  type="button"
                  onClick={() => {
                    handleRemove(contact.id);
                  }}
                >
                  Удалить
                </button>
              </li>
            </CSSTransition>
          );
        })}
      </TransitionGroup>
    );
  }
}

const mapStateToProps = (state) => ({
  items: state.contacts.items,
});

const mapDispatchToProps = (dispatch) => {
  return {
    handleRemove: (id) => dispatch(actions.removeContact(id)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ContactList);
