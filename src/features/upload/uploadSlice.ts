import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

export interface UploadState {
  files: (File | null)[];
  previews: (string | null)[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  taskId: string | null;
  error: string | null;
}

const initialState: UploadState = {
  files: [null, null, null],
  previews: [null, null, null],
  status: 'idle',
  taskId: null,
  error: null,
};

type SelectFilePayload = { index: number; file: File };

export const uploadSlice = createSlice({
  name: 'upload',
  initialState,
  reducers: {
    selectFile(state, { payload }: PayloadAction<SelectFilePayload>) {
      const { index, file } = payload;
      state.files[index] = file;
      state.previews[index] = URL.createObjectURL(file);
    },
    clearPreview(state, { payload }: PayloadAction<number>) {
      state.files[payload] = null;
      state.previews[payload] = null;
    },
    uploadRequested(state) {
      state.status = 'loading';
      state.error = null;
    },
    uploadSucceeded(state) {
      state.status = 'succeeded';
    },
    uploadFailed(state, { payload }: PayloadAction<string>) {
      state.status = 'failed';
      state.error = payload;
    },
  },
});

export const {
  selectFile,
  clearPreview,
  uploadRequested,
  uploadSucceeded,
  uploadFailed,
} = uploadSlice.actions;

export default uploadSlice.reducer;
