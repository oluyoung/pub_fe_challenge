import React, { useEffect } from 'react';
import ToggleIcon from './ToggleIcon';
import classes from '../styles.module.css';

const Question = ({ question, onHashChange }) => {
  const [open, setOpen] = React.useState(false);

  useEffect(() => {
    onHashChange(question.sectionId);
  }, [location.hash]);

  return (
    <div className={classes.question} id={`question-${question.tocId}`}>
      <div className={classes.questionTitle} onClick={() => setOpen(!open)}>
        <div dangerouslySetInnerHTML={{ __html: question.question }} /> <ToggleIcon open={open} />
      </div>
      {open ? (
        <div className={[classes.answer, 'animate__animated', 'animate__slideInDown'].join(' ')}><div dangerouslySetInnerHTML={{ __html: question.answer }} /></div>
      ) : null}
    </div>
  );
};

export default Question;
