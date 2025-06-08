import { all } from 'redux-saga/effects';
import { uploadSaga } from './features/upload/uploadSaga';

export default function* rootSaga() {
  yield all([uploadSaga()]);
}