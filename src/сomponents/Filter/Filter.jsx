import React from "react";
import PropTypes from "prop-types";
import styles from "./Filter.module.css";
import { connect } from "react-redux";
import actions from "../../Redux/actions";

function Filter({ value, onChange }) {
  return (
    <div className={styles.filter}>
      <label htmlFor="filter" className={styles.label}>
        Find contacts by name
      </label>
      <input
        className={styles.formInput}
        type="text"
        id="filter"
        name="filter"
        value={value}
        onChange={onChange}
      ></input>
    </div>
  );
}

Filter.propTypes = {
  value: PropTypes.string,
};

const getFiltredContacts = (contacts, filter) => {
  const normalizedFilter = filter.toLowerCase();

  return contacts.filter(({ name }) =>
    name.toLowerCase().includes(normalizedFilter)
  );
};

// const mapStateToProps = ({ contacts: { items, filter } }) => ({
//   items: getFiltredContacts(items, filter),
// });

const mapDispatchToProps = (dispatch) => ({
  onChange: (e) => dispatch(actions.filterContacts(e.target.value)),
});

const mapStateToProps = (state) => {
  const { items, filter } = state.contacts;
  const filteredContacts = getFiltredContacts(items, filter);
  console.log("items =>", items, "filter =>", filter);
  console.log("filtered =>", filteredContacts);
  return { items: filteredContacts };
};

export default connect(mapStateToProps, mapDispatchToProps)(Filter);
