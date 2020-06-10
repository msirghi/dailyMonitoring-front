export interface ProjectTaskModel {
  user: {
    fullName: string;
    id: number;
    username: string;
    url?: string;
  };
  task: {
    name: string,
    description?: string;
    date?: string;
  };
}
