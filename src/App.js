import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import useQandA from './useQandA';
import {
  useGetSectionsQuery,
  useGetCompanyDealingQuestionsQuery,
  useGetDirectorsOfficeMgmtQuestionsQuery,
} from './store/reducer-api';
import Category from './components/Category';
import classes from './styles.module.css';

const rootId = -1;

const App = () => {
  useGetSectionsQuery();
  useGetCompanyDealingQuestionsQuery();
  useGetDirectorsOfficeMgmtQuestionsQuery();
  const navigate = useNavigate();
  const location = useLocation();

  const { sections } = useQandA();
  const root = sections.find((s) => s.id === rootId);

  React.useEffect(() => {
    if (location.hash) navigate('/');
  }, []);

  let content = <h1 className={classes.noContent}>No Q&A categories available</h1>;

  if (root) content = <Category key={root.id} id={root.id} title={root.title} />;

  return (
    <main className={classes.container}>
      {content}
    </main>
  );
};

export default App;