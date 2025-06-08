import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

export type Gender = 'Мужской' | 'Женский' | '';

export interface PersonalData {
  childName: string;
  birthDate: string | null;      // ISO «YYYY-MM-DD»
  gender: Gender;
  parentName: string;
}

export interface SurveyState {
  step: 1 | 2 | 3;
  personal: PersonalData;
  answers: Record<string, string | number>;
  submitting: boolean;
  error: string | null;
  submitted: boolean;
}

const initialState: SurveyState = {
  step: 1,
  personal: {
    childName: '',
    birthDate: null,
    gender: '',
    parentName: '',
  },
  answers: {},
  submitting: false,
  error: null,
  submitted: false,
};

const surveySlice = createSlice({
  name: 'survey',
  initialState,
  reducers: {

    /* --- personal form --- */
    updatePersonal(
      state,
      { payload }: PayloadAction<{ field: keyof PersonalData; value: any }>
    ) {
      state.personal[payload.field] = payload.value;
    },

    /* --- survey answers --- */
    updateAnswer(
      state,
      { payload }: PayloadAction<{ id: string; value: string | number }>
    ) {
      state.answers[payload.id] = payload.value;
    },

    /* --- submit lifecycle --- */
    submitRequest(state) {
      state.submitting = true;
      state.error = null;
    },
    submitSuccess(state) {
      state.submitting = false;
      state.step = 3; // переходим к отчёту
    },
    submitFailure(state, { payload }: PayloadAction<string>) {
      state.submitting = false;
      state.error = payload;
    },
  },
});

export const {
  updatePersonal,
  updateAnswer,
  submitRequest,
  submitSuccess,
  submitFailure,
} = surveySlice.actions;

export default surveySlice.reducer;
