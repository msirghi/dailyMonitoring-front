export interface ProjectTaskModel {
  user: {
    fullName: string;
    id: number;
  };
  task: {
    name: string,
    description?: string;
    date?: string;
  };
}
