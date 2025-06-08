import { call, put, takeLatest, select } from 'redux-saga/effects';
import {
  submitRequest,
  submitSuccess,
  submitFailure,
} from './surveySlice';
import type { SurveyState } from './surveySlice';

import {
  selectSurveyAnswers,
  selectSurveyPersonal,
} from './selectors';
import { selectTaskId } from '../task/selectors';

const API_URL = 'https://sirius-draw-test-94500a1b4a2f.herokuapp.com/submit-survey';

function postSurvey(taskId: string, surveyPayload: Record<string, unknown>) {
  return fetch(API_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      task_id: taskId,
      survey: surveyPayload,
    }),
  }).then(async res => {
    if (!res.ok) {
      const text = await res.text();
      throw new Error(text || `Server error: ${res.status}`);
    }
    return res.json();
  });
}

/** Map enum labels (Русский) → API codes (english) */
const mapGender = (g: string) => (g === 'Мужской' ? 'male' : g === 'Женский' ? 'female' : g);

function* submitWorker() {
  try {
    const taskId: string | null = yield select(selectTaskId);
    if (!taskId) throw new Error('taskId missing');

    const personal: SurveyState['personal'] = yield select(selectSurveyPersonal);
    const answers: SurveyState['answers'] = yield select(selectSurveyAnswers);

    // Build payload that exactly matches server contract
    const surveyPayload = {
      childName: personal.childName,
      childDOB: personal.birthDate,
      childGender: mapGender(personal.gender),
      parentName: personal.parentName,
      ...answers,
    };

    yield call(postSurvey, taskId, surveyPayload);
    yield put(submitSuccess());
  } catch (err: any) {
    yield put(submitFailure(err.message || 'Unexpected error'));
  }
}

export function* surveySaga() {
  yield takeLatest(submitRequest.type, submitWorker);
}
