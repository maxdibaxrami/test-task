import { call, put, takeLatest, select } from 'redux-saga/effects';
import {
  submitRequest,
  submitSuccess,
  submitFailure,
} from './surveySlice';
import type { SurveyState } from './surveySlice';

function postSurvey(taskId: string, answers: SurveyState['answers']) {
  return fetch(
    'https://sirius-draw-test-94500a1b4a2f.herokuapp.com/submit-survey',
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ task_id: taskId, answers }),
    }
  ).then(res => {
    if (!res.ok) throw new Error('Server error');
    return res.json();
  });
}

function* submitWorker() {
  try {
    const { taskId, answers }: SurveyState = yield select(
      (s: any) => s.survey
    );
    if (!taskId) throw new Error('taskId missing');
    yield call(postSurvey, taskId, answers);
    yield put(submitSuccess());
  } catch (e: any) {
    yield put(submitFailure(e.message));
  }
}

export function* surveySaga() {
  yield takeLatest(submitRequest.type, submitWorker);
}
