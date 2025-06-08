import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

export interface TaskState {
  taskId: string | null;
}

const initialState: TaskState = {
  taskId: null,
};

const taskSlice = createSlice({
  name: 'task',
  initialState,
  reducers: {
    setTaskId(state, { payload }: PayloadAction<string | null>) {
      state.taskId = payload;
    },
  },
});

export const { setTaskId } = taskSlice.actions;
export default taskSlice.reducer;