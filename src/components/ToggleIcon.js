import React from 'react';
import classes from '../styles.module.css';

const ToggleIcon = ({ open }) => (
  <button className={classes.toggleBtn}>
    <span className={classes.mainDash} />
    {!open ? <span className={classes.secondaryDash}/> : null }
  </button>
);

export default ToggleIcon;
