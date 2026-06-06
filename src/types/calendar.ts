export interface ScheduledInspection {
  id: string;
  title: string;
  date: string;
  status: 'Scheduled' | 'Completed' | 'Urgent';
  surveyor: string;
}
