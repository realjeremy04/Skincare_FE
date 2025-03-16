import { Account } from "./account";
import { Therapist } from "./therapist";

export interface Feedback {
  _id: string;
  accountId: Account;
  appointmentId: string;
  serviceId: string;
  therapistId: Therapist;
  images: string;
  comment: string;
  rating: number;
}
