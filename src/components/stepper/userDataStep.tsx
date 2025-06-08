import React, { type ChangeEvent } from 'react';
import { useAppDispatch, useAppSelector } from '../../hook/hooks';
import { updatePersonal, type PersonalData } from '../../features/survey/surveySlice';
import { DatePicker } from '../DatePicker';
import { Radio } from '../Radio';
import { TextField } from '../TextField';
import { Typography } from '../Typography';
import { RedWrapper } from '../RedWrapper';
import { FlaqIcon, LikeIcon } from '../../icon/icon';
import { SurveyForm } from '../SurveyForm';
import { surveySchema } from '../../surveySchema';

const UserDataStep: React.FC = () => {
  const dispatch = useAppDispatch();
  const personal = useAppSelector(state => state.survey.personal);

  // Утилита для обновления поля personal
  const setPersonal = <K extends keyof PersonalData>(field: K, value: PersonalData[K]) =>
    dispatch(updatePersonal({ field, value }));

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '64px' }}>
      {/* Общая информация */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
        <Typography variant="title3">Общая информация о ребёнке</Typography>

        <TextField
          label="Имя ребёнка"
          value={personal.childName}
          onChange={(e: ChangeEvent<HTMLInputElement>) => setPersonal('childName', e.target.value)}
        />

        <DatePicker
          lable="Дата рождения ребёнка"
          placeholder="28.07.2018"
          value={personal.birthDate ? new Date(personal.birthDate) : null}
          onChange={(date: Date | null) =>
            setPersonal('birthDate', date ? date.toISOString().slice(0, 10) : null)
          }
        />

        <div>
          <Typography variant="description16">Пол ребёнка</Typography>
          <div style={{ display: 'flex', gap: '24px' }}>
            <Radio
              id="gender-male"
              name="gender"
              value="Мужской"
              checked={personal.gender === 'Мужской'}
              onChange={(e: ChangeEvent<HTMLInputElement>) => setPersonal('gender', e.target.value)}
              label="Мужской"
            />
            <Radio
              id="gender-female"
              name="gender"
              value="Женский"
              checked={personal.gender === 'Женский'}
              onChange={(e: ChangeEvent<HTMLInputElement>) => setPersonal('gender', e.target.value)}
              label="Женский"
            />
          </div>
        </div>

        <TextField
          label="Имя родителя, заполняющего анкету"
          value={personal.parentName}
          onChange={(e: ChangeEvent<HTMLInputElement>) => setPersonal('parentName', e.target.value)}
        />
      </div>

      {/* Предупреждения */}
      <RedWrapper>
        <div style={{ display: 'flex', gap: '16px' }}>
          <LikeIcon />
          <Typography variant="description14">
            Пожалуйста, внимательно прочитайте каждый вопрос и выберите наиболее
            подходящий вариант ответа, отражающий поведение и эмоциональное
            состояние вашего ребёнка в течение последних 2–4 недель.
          </Typography>
        </div>
        <div style={{ display: 'flex', gap: '16px' }}>
          <FlaqIcon />
          <Typography variant="description14">Все вопросы обязательны к заполнению</Typography>
        </div>
      </RedWrapper>

      {/* Опросник */}
      <SurveyForm schema={surveySchema} onSuccess={() => {}} />
    </div>
  );
};

export default UserDataStep;
