import React, { Component } from "react";
import PropTypes from "prop-types";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import "./ContactList.css";
import { connect } from "react-redux";
import actions from "../../Redux/actions";
import uniqid from "uniqid";

class ContactList extends Component {
  static propTypes = {
    list: PropTypes.array.isRequired,
  };

  componentWillUnmount() {
    localStorage.removeItem("contacts");
  }

  render() {
    const { list, handleRemove } = this.props;
    console.log(this.props);
    return (
      <TransitionGroup component="ul" className="list">
        {this.props.items.map((contact) => {
          console.log(contact.id);
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

const mapStateToProps = (state) => {
  console.dir("CL", state);
  return {
    items: state.contacts.items,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    handleRemove: (id) => dispatch(actions.removeContact(id)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ContactList);
