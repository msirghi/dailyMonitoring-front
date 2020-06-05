import { ProjectTaskActivityModel } from './projectTaskActivity.model';

export interface UserActivityStatisticsModel {
  taskStatistics: {
    totalProjects: number;
    totalTasks: number;
    totalDoneTasks: number;
    totalUndoneTasks: number;
  };
  projectTaskActivity: Array<ProjectTaskActivityModel>;
  chartMonths: Array<string>;
  chartValues: Array<number>;
}
