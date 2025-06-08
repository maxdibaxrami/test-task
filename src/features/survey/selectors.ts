import { createSelector } from '@reduxjs/toolkit';
import type { RootState } from '../../store';
import { surveySchema } from '../../surveySchema';

/* базовый срез */
export const selectSurveyState = (s: RootState) => s.survey;

export const selectSurveyAnswers = (s: RootState) => s.survey.answers;

/* === 1. готов ли опрос, чтобы идти дальше? === */
export const selectCanProceedSurvey = createSelector(
  selectSurveyState,
  survey => {
    if (survey.submitting) return false;

    /* проверяем все обязательные вопросы */
    for (const section of surveySchema) {
      for (const q of section.questions) {
        if (
          q.required &&
          (survey.answers[q.id] === undefined || survey.answers[q.id] === '')
        ) {
          return false;
        }
      }
    }
    return true;
  }
);

/* === 2. идёт ли отправка === */
export const selectSurveySubmitting = (s: RootState) => s.survey.submitting;

/* === 3. успешно ли отправлено (шаг 3 достигнут) === */
export const selectSurveySuccess = (s: RootState) => s.survey.step === 3;

export const selectSurveyPersonal = (s: RootState) => s.survey.personal;

