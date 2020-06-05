export interface ProjectAlertModel {
  id?: number;
  message: string;
  authorName?: string;
  authorId?: string;
  type: 'INFO' | 'SUCCESS' | 'DANGER' | 'WARNING';
  date?: string | Date;
  areMembersNotified?: boolean;
}
