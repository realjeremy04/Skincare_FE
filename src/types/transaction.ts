import { Account } from "./account";
import { Appointment } from "./appointment";

export interface CreateTransaction {
  therapistId: string;
  slotsId: string;
  serviceId: string;
  notes: string;
  date: string;
  paymentMethod: string;
}

export interface Transaction {
  _id: string;
  customerId: Account;
  appointmentId: Appointment;
  paymentMethod: string;
  status: string;
  createdAt: string;
}
