
import React, { useEffect } from 'react';
import { Provider } from 'react-redux';
import { Container } from './components/Container';
import { Stepper } from './components/Stepper';
import { UploadStep } from './components/stepper/UploadStep';
import UserDataStep from './components/stepper/userDataStep';
import ReportStep from './components/stepper/ReportStep';
import { ArrowLeft, ArrowRight, DoubleArrowRight, DownloadIcon, MailIcon } from './icon/icon';
import { useAppDispatch, useAppSelector } from './hook/hooks';
import { store } from './store';

// upload
import { selectCanSubmit, selectStatus } from './features/upload/selectors';
import { uploadRequested } from './features/upload/uploadSlice';

// survey
import {
  selectCanProceedSurvey,
  selectSurveySubmitting,
} from './features/survey/selectors';

import { submitRequest } from './features/survey/surveySlice';
import { setStep } from './features/stepper/stepperSlice';

function Steps() {
  const dispatch = useAppDispatch();

  const step = useAppSelector(s => s.stepper.step);

  // Step 1 (upload)
  const canSubmitUpload = useAppSelector(selectCanSubmit);
  const uploadStatus = useAppSelector(selectStatus);

  // Step 2 (survey)
  const canProceedSurvey = useAppSelector(selectCanProceedSurvey);
  const surveySubmitting = useAppSelector(selectSurveySubmitting);

  const canProceed =
    step === 1
      ? canSubmitUpload && uploadStatus !== 'loading'
      : step === 2
      ? canProceedSurvey && !surveySubmitting
      : true;
      step === 3
      ? true
      : true;


  const handlePrev = () => {
    console.log("aaaa")
    if (step >= 1) {
      dispatch(setStep((step - 1) as 1 | 2 | 3))
          console.log("abbbbbbaaa")

    };
  };

  const handleNext = async () => {
    if (step === 1) {
      if(uploadStatus !== 'succeeded'){
        await dispatch(uploadRequested());
      }
      dispatch(setStep(2));
    } else if (step === 2) {
      await dispatch(submitRequest());
      dispatch(setStep(3));

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
        prevLabels={['', 'К загрузке рисунков', 'Скачать отчет PDF']}
        nextIcons={[<ArrowRight key="1" />, <DoubleArrowRight key="2" />, <MailIcon key="3" />]}
        prevIcons={[undefined, <ArrowLeft key="p2" />, <DownloadIcon key="p3" />]}
        onStepChange={target =>
          target > step ? handleNext() : handlePrev()
        }
        prevVariant={step === 3? "primary" : "default"}
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
