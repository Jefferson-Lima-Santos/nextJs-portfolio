import { gql } from '@apollo/client';

export const NOTIFICATION_SUBSCRIPTION = gql`
  subscription NotificationCreated {
    notificationCreated {
      eventType
      notificationId
      notificationUId
      name
      message
      severity
      startDate
      endDate
      timestamp
      systems
      crmUnities
    }
  }
`;

export interface NotificationCreatedSubscription {
  notificationCreated: {
    eventType: string;
    notificationId: number;
    notificationUId: string;
    name: string;
    message: string;
    severity: number;
    startDate: string;
    endDate: string;
    timestamp: string;
    systems: string[];
    crmUnities: string[];
  };
}
