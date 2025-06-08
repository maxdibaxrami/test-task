import type { RootState } from '../../store';

export const selectTaskId = (s: RootState) => s.task.taskId;