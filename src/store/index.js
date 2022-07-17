import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import mainApi, { questionsReducer, sectionsReducer } from './reducer-api';

const store = configureStore({
  reducer: {
    questions: questionsReducer,
    sections: sectionsReducer,
    [mainApi.reducerPath]: mainApi.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat([mainApi.middleware]),
});

setupListeners(store.dispatch);

export default store;
