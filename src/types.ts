export interface PhotoPreview { file: File; url: string; }


export interface BaseQuestion {
  id: string;
  text: string;
  type: 'radio' | 'text';
  required?: boolean;
}

export interface RadioQuestion extends BaseQuestion {
  type: 'radio';
  options: { value: string | number; label: string }[];
}

export interface TextQuestion extends BaseQuestion {
  type: 'text';
  placeholder?: string;
}

export type Question = RadioQuestion | TextQuestion;

export interface Section {
  id: string;
  title: string;
  questions: Question[];
}

export type SurveySchema = Section[];

export type SurveyAnswers = Record<string, string | number>;
