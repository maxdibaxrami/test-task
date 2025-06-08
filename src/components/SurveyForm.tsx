// SurveyForm.tsx
import React, { type ChangeEvent, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../hook/hooks';
import { updateAnswer } from '../features/survey/surveySlice';
import { selectSurveyAnswers } from '../features/survey/selectors';
import type { Section, Question, SurveySchema } from '../types';
import { Radio } from './Radio';
import { TextField } from './TextField';
import { Typography } from './Typography';
import styled from 'styled-components';
import { breakpoints, containerWidths } from '../theme';

interface Props {
  schema?: SurveySchema;
  onSuccess: () => void;
}

export const SurveyForm: React.FC<Props> = ({ schema = [], onSuccess }) => {
  const dispatch = useAppDispatch();
  const answers = useAppSelector(selectSurveyAnswers);
  const [error, setError] = useState<string | null>(null);

  const update = (id: string, value: string | number) => {
    dispatch(updateAnswer({ id, value }));
  };


  return (
    <Wrapper>
      {schema.map((section: Section) => (
        <SectionBlock key={section.id}>
          <Typography variant="title3">{section.title}</Typography>
          {section.questions.map((question: Question) => (
            <QuestionRenderer
              key={question.id}
              question={question}
              value={answers[question.id]}
              onChange={update}
            />
          ))}
        </SectionBlock>
      ))}

      {error && (
        <ErrorWrapper>
          <Typography variant="description14">{error}</Typography>
        </ErrorWrapper>
      )}

    </Wrapper>
  );
};

interface QRProps {
  question: Question;
  value: string | number | undefined;
  onChange: (id: string, value: string | number) => void;
}

const QuestionRenderer: React.FC<QRProps> = ({ question, value, onChange }) => (
  <QuestionBlock>
    {question.type === 'radio' && 
      <Typography variant="description16">
        {question.text} {question.required && '*'}
      </Typography>
    }
    {question.type === 'radio' ? (
      <RadioRow>
        {question.options.map((opt, idx) => (
          <Radio
            key={`${question.id}-${idx}`}
            id={`${question.id}-${idx}`}
            name={question.id}
            value={String(opt.value)}
            checked={String(value) === String(opt.value)}
            onChange={(e: ChangeEvent<HTMLInputElement>) => onChange(question.id, e.target.value)}
            label={opt.label}
          />
        ))}
      </RadioRow>
    ) : (
      <TextField
        label={question.text}
        placeholder={question.placeholder}
        value={value ?? ''}
        onChange={(e: ChangeEvent<HTMLInputElement>) => onChange(question.id, e.target.value)}
        multiline
      />
    )}
  </QuestionBlock>
);

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 32px;
`;
const SectionBlock = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;
const QuestionBlock = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;
const RadioRow = styled.div`
  display: flex;
  gap: 24px;
  flex-direction: column;
  @media (min-width: ${breakpoints.md}px) {
    flex-direction: row;
  }
`;
const ErrorWrapper = styled.div`
  color: red;
`;
