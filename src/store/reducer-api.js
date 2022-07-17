import { createSlice } from '@reduxjs/toolkit';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import sections from '../../data/sections.json';
import companyDealingsQA from '../../data/company-dealings/qa.json';
import directorsQA from '../../data/directors-officers-management/qa.json';
import { groupBy } from 'lodash';

const sectionsState = [];
const sectionsSlice = createSlice({
  name: 'sections',
  initialState: sectionsState,
  reducers: {
    setSections(_, { payload: sections }) {
      return sections;
    },
  },
});

const { setSections } = sectionsSlice.actions;
export const { reducer: sectionsReducer } = sectionsSlice;

const questionsState =  {};
const questionsSlice = createSlice({
  name: 'questions',
  initialState: questionsState,
  reducers: {
    setQuestions(state, { payload: questions }) {
      return {
        ...state,
        ...groupBy(questions, 'sectionId')
      };
    },
  },
});

const { setQuestions } = questionsSlice.actions;
export const { reducer: questionsReducer } = questionsSlice;

const mainApi = createApi({
  reducerPath: 'mainApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:9000/api' }),
  endpoints: (build) => ({
    getSections: build.query({
      // query: () => '/sections.json',
      queryFn: () => Promise.resolve({ data: sections }),
      onQueryStarted: async (_, { dispatch, queryFulfilled }) => {
        try {
          const { data } = await queryFulfilled;
          dispatch(setSections(data));
        } catch (error) {
          console.error(error);
        }
      },
    }),
    getCompanyDealingQuestions: build.query({
      // query: () => '/company-dealings/qa.json',
      queryFn: () => Promise.resolve({ data: companyDealingsQA }),
      onQueryStarted: async (_, { dispatch, queryFulfilled }) => {
        try {
          const { data } = await queryFulfilled;
          dispatch(setQuestions(data));
        } catch (error) {
          console.error(error);
        }
      },
    }),
    getDirectorsOfficeMgmtQuestions: build.query({
      // query: () => '/directors-officers-management/qa.json',
      queryFn: () => Promise.resolve({ data: directorsQA }),
      onQueryStarted: async (_, { dispatch, queryFulfilled }) => {
        try {
          const { data } = await queryFulfilled;
          dispatch(setQuestions( data));
        } catch (error) {
          console.error(error);
        }
      }
    }),
  }),
});

export const {
  useGetSectionsQuery,
  useGetCompanyDealingQuestionsQuery,
  useGetDirectorsOfficeMgmtQuestionsQuery,
} = mainApi;
export default mainApi;
