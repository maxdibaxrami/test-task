import { configureStore } from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';
import uploadReducer from './features/upload/uploadSlice';
import surveyReducer from './features/survey/surveySlice';

import rootSaga from './rootSaga';

const sagaMiddleware = createSagaMiddleware();

export const store = configureStore({
  reducer: {
    upload: uploadReducer,
    survey: surveyReducer
  },
  middleware: (getDefault) => getDefault().concat(sagaMiddleware),
  devTools:true
});

sagaMiddleware.run(rootSaga);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
