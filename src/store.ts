import { configureStore } from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';
import uploadReducer from './features/upload/uploadSlice';
import surveyReducer from './features/survey/surveySlice';
import taskReducer from './features/task/taskSlice';
import stepperReducer from './features/stepper/stepperSlice';

import rootSaga from './rootSaga';

const sagaMiddleware = createSagaMiddleware();

export const store = configureStore({
  reducer: {
    upload: uploadReducer,
    survey: surveyReducer,
    task: taskReducer,
    stepper: stepperReducer,
  },
  middleware: (getDefault) => getDefault().concat(sagaMiddleware),
  devTools:true
});

sagaMiddleware.run(rootSaga);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
