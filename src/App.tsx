
import React, { useEffect } from 'react';
import { Provider } from 'react-redux';
import { Container } from './components/Container';
import { Stepper } from './components/Stepper';
import { UploadStep } from './components/stepper/UploadStep';
import UserDataStep from './components/stepper/userDataStep';
import ReportStep from './components/stepper/ReportStep';
import { ArrowLeft, ArrowRight, DoubleArrowRight } from './icon/icon';
import { useAppDispatch, useAppSelector } from './hook/hooks';
import { store } from './store';

// upload
import { selectCanSubmit, selectStatus } from './features/upload/selectors';
import { uploadRequested } from './features/upload/uploadSlice';

// survey
import {
  selectCanProceedSurvey,
  selectSurveySubmitting,
  selectSurveySuccess,
} from './features/survey/selectors';
import { goToStep, setTaskId, submitRequest } from './features/survey/surveySlice';

function Steps() {
  const dispatch = useAppDispatch();

  const step = useAppSelector(s => s.survey.step);

  // Step 1 (upload)
  const canSubmitUpload = useAppSelector(selectCanSubmit);
  const uploadStatus = useAppSelector(selectStatus);

  // Step 2 (survey)
  const canProceedSurvey = useAppSelector(selectCanProceedSurvey);
  const surveySubmitting = useAppSelector(selectSurveySubmitting);
  const surveySucceeded = useAppSelector(selectSurveySuccess);

  const canProceed =
    step === 1
      ? canSubmitUpload && uploadStatus !== 'loading'
      : step === 2
      ? canProceedSurvey && !surveySubmitting
      : true;

  useEffect(() => {
    if (step === 2 && surveySucceeded) {
      dispatch(goToStep(3));
    }
  }, [step, surveySucceeded, dispatch]);

  const handlePrev = () => {
    console.log("aaaa")
    if (step >= 1) {
      dispatch(goToStep((step - 1) as 1 | 2 | 3))
          console.log("abbbbbbaaa")

    };
  };

  const handleNext = async () => {
    if (step === 1) {
      if(uploadStatus !== 'succeeded'){
        await dispatch(uploadRequested());
      }
      dispatch(goToStep(2));
    } else if (step === 2) {
      await dispatch(submitRequest());
    }
  };

  return (
    <Container>
      {step === 1 && <UploadStep />}
      {step === 2 && <UserDataStep />}
      {step === 3 && <ReportStep />}

      <Stepper
        totalSteps={3}
        currentStep={step}
        canProceed={canProceed}
        nextLabels={['Далее', 'Узнать результаты', 'Поделиться результатами']}
        prevLabels={['', 'К загрузке рисунков', 'Назад к анкете']}
        nextIcons={[<ArrowRight key="1" />, <DoubleArrowRight key="2" />, <DoubleArrowRight key="3" />]}
        prevIcons={[undefined, <ArrowLeft key="p2" />, <ArrowLeft key="p3" />]}
        onStepChange={target =>
          target > step ? handleNext() : handlePrev()
        }
      />
    </Container>
  );
}

export default function App() {
  return (
    <Provider store={store}>
      <Steps />
    </Provider>
  );
}
