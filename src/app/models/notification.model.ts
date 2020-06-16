export interface NotificationModel {
  id: number;
  message: string;
  type: string;
  status: string;
  authorName: string;
  authorUsername: string;
  projectName?: string;
  date: string;
  avatarUrl?: string;
  authorId: number;
}
