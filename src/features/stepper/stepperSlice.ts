import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

export interface StepperState {
  step: 1 | 2 | 3;
}

const initialState: StepperState = {
  step: 1,
};

const stepperSlice = createSlice({
  name: 'stepper',
  initialState,
  reducers: {
    setStep(state, { payload }: PayloadAction<1 | 2 | 3>) {
      state.step = payload;
    },
  },
});

export const { setStep } = stepperSlice.actions;
export default stepperSlice.reducer;