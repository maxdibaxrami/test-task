import { call, put, select, takeLatest } from 'redux-saga/effects';
import {
  uploadRequested,
  uploadSucceeded,
  uploadFailed,
} from './uploadSlice';
import { selectFiles } from './selectors';
import { setTaskId } from '../task/taskSlice';

function* uploadWorker() {
  try {
    const files: (File | null)[] = yield select(selectFiles);
    const form = new FormData();
    files.forEach((f) => {
      if (f) form.append('files', f);
    });

    const res: Response = yield call(fetch, 'https://sirius-draw-test-94500a1b4a2f.herokuapp.com/upload', {
      method: 'POST',
      body: form,
    });

    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const data: { task_id: string } = yield call([res, res.json]);
    yield put(setTaskId(data.task_id));
    yield put(uploadSucceeded());
  } catch (e: any) {
    yield put(uploadFailed(e.message || 'Unknown error'));
  }
}

export function* uploadSaga() {
  yield takeLatest(uploadRequested.type, uploadWorker);
}
