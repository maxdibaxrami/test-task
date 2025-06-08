import type { RootState } from '../../store';

export const selectFiles = (s: RootState) => s.upload.files;
export const selectPreviews = (s: RootState) => s.upload.previews;
export const selectCanSubmit = (s: RootState) =>
  s.upload.files.every((f) => f !== null);
export const selectStatus = (s: RootState) => s.upload.status;
export const selectError = (s: RootState) => s.upload.error;
