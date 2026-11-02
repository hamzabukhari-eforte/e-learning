export type TrainerNotification = {
  id: string;
  trainingId: string;
  trainingName: string;
  subTrainingId: string;
  subTrainingName: string;
  dateFrom: string;
  dateTo: string;
  text: string;
  createdAt: string;
};

export type TrainerNotificationInput = {
  dateFrom: string;
  dateTo: string;
  trainingId: string;
  subTrainingId: string;
  text: string;
};
