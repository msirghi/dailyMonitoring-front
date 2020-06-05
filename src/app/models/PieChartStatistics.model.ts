export interface PieChartStatisticsModel {
  pieStatistics: Array<TaskByUser>;
  projectTaskCount: number;
  doneProjectTaskCount: number;
  undoneProjectTaskCount: number;
}

interface TaskByUser {
  userId: number;
  fullName: string;
  tasksDone: number;
  taskPercentage: number;
};

