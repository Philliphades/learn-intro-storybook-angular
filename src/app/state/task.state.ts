import { Injectable } from '@angular/core';
import { State, Selector, Action, StateContext } from '@ngxs/store';
import { patch, updateItem } from '@ngxs/store/operators';
import { Task } from '../models/task.model';

// Định nghĩa actions
export const actions = {
  ARCHIVE_TASK: 'ARCHIVE_TASK',
  PIN_TASK: 'PIN_TASK',
  ERROR: 'APP_ERROR',
};

export class ArchiveTask {
  static readonly type = actions.ARCHIVE_TASK;
  constructor(public payload: string) {}
}

export class PinTask {
  static readonly type = actions.PIN_TASK;
  constructor(public payload: string) {}
}

// Action để thay đổi trạng thái error
export class AppError {
  static readonly type = actions.ERROR;
  constructor(public payload: boolean) {}
}

// Trạng thái mặc định của Store
export interface TaskStateModel {
  tasks: Task[];
  status: 'idle' | 'loading' | 'success' | 'error';
  error: boolean;
}

const defaultTasks = [
  { id: '1', title: 'Something', state: 'TASK_INBOX' },
  { id: '2', title: 'Something more', state: 'TASK_INBOX' },
  { id: '3', title: 'Something else', state: 'TASK_INBOX' },
  { id: '4', title: 'Something again', state: 'TASK_INBOX' },
];

@State<TaskStateModel>({
  name: 'taskbox',
  defaults: {
    tasks: defaultTasks,
    status: 'idle',
    error: false, // Thêm trạng thái error
  },
})
@Injectable()
export class TasksState {
  @Selector()
  static getError(state: TaskStateModel): boolean {
    return state.error;
  }

  @Selector()
  static getAllTasks(state: TaskStateModel): Task[] {
    return state.tasks;
  }

  @Action(AppError)
  setAppError(
    { patchState, getState }: StateContext<TaskStateModel>,
    { payload }: AppError
  ) {
    patchState({
      error: payload,
    });
  }
}
