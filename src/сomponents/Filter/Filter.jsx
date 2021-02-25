import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import actions from "../../Redux/actions";
import styles from "./Filter.module.css";

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
        autoComplete="off"
      ></input>
    </div>
  );
}

Filter.propTypes = {
  value: PropTypes.string,
};


const mapDispatchToProps = (dispatch) => ({
  onChange: (e) => dispatch(actions.filterContacts(e.target.value)),
});

const mapStateToProps = (state) => ({
 items: state.contacts.items,
  filter: state.contacts.filter
 
});

export default connect(mapStateToProps, mapDispatchToProps)(Filter);