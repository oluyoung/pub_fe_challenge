import React from 'react';
import { useLocation } from 'react-router-dom';
import { sortBy } from 'lodash';
import useQandA from '../useQandA';
import ToggleIcon from './ToggleIcon';
import Question from './Question';
import classes from '../styles.module.css';

const rootId = -1;

const Category = ({ id, title }) => {
  const [open, setOpen] = React.useState(false);
  const { getChildrenForId, getQuestionsForId, getToQuestion } = useQandA();
  const location = useLocation();

  const onHashChange = React.useCallback((sectionId) => {
    const tocId = location.hash.substring(1);
    const toquestion = getToQuestion(tocId, sectionId);
    if (toquestion) {
      const el = document.getElementById(`question-${toquestion.tocId}`);
      el.scrollIntoView();
      el.classList.add('animate__animated', 'animate__shakeX');
      el.addEventListener('animationend', function() {
        el.classList.remove('animate__animated', 'animate__shakeX');
      });
    }
  }, [location.hash]);

  const children = getChildrenForId(id);
  const questions = getQuestionsForId(id);

  const canToggle = children.length || questions.length;

  // store the question's ref's here
  // use them to open up the question

  const onToggle = () => {
    // when the toggle happens then look for the parents' siblings and add the children's height to it and translateY(nPx)
    setOpen(!open);
  };

  return (
    <div className={[classes.category, (id === rootId ? classes.noPadding : '')].join(' ')} id={`category-${id}`}>
      <p className={classes.categoryTitle} onClick={onToggle}>{title} {canToggle ? <ToggleIcon open={open} /> : null}</p>
      {open ? (
        <div className={[classes.subCategory, 'animate__animated', 'animate__slideInDown'].join(' ')}>
         {questions.length ? sortBy(questions, 'questionNumber').map((q) => <Question key={q.tocId} question={q} onHashChange={onHashChange} />) : children.map((c) => <Category key={c.id} id={c.id} title={c.title} />)}
        </div>
      ) : null}
    </div>
  );
};

export default Category;
