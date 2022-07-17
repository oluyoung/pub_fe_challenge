import { groupBy } from 'lodash';
import { useSelector } from 'react-redux';

function useQandA() {
  const sections = useSelector(state => state.sections);
  const questions = useSelector(state => state.questions);
  const sectionsByParentIds = groupBy(sections, 'parentId');

  const getChildrenForId = (id) => {
    if (!id) return [root];
    return sectionsByParentIds[id] || [];
  };

  const getQuestionsForId = (id) => {
    if (!id) return [];
    const questionsForId = questions[id];
    return questionsForId ? questionsForId : [];
  };

  const getToQuestion = (tocId, sectionId) => {
    if (!tocId) return;
    const questionsForId = getQuestionsForId(sectionId);
    return questionsForId.find((q) => q.tocId === tocId);
  };

  return {
    sections,
    sectionsByParentIds,
    getChildrenForId,
    getQuestionsForId,
    getToQuestion,
  };
}

export default useQandA;
