
import { all } from 'redux-saga/effects';
import { uploadSaga } from './features/upload/uploadSaga';
import { surveySaga } from './features/survey/surveySaga';

export default function* rootSaga() {
  yield all([uploadSaga(), surveySaga()]);
}