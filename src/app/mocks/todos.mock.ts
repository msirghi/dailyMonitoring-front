import { TaskModel } from '../models/task.model';

export const currentTasksMock: Array<TaskModel> = [
  {
    id: 1,
    name: 'First task',
    description: 'Description of the first task'
  },
  {
    id: 2,
    name: 'Second task',
    description: 'Description of the second task'
  }
];

export const tasksDoneMock: Array<TaskModel> = [
  {
    id: 0,
    name: 'First completed task',
    description: 'Description of the first completed  task',
    taskDoneTime: new Date()
  },
];
