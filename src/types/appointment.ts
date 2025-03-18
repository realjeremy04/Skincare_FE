import { Therapist } from "./therapist";
import { Account } from "./account";
import { Slot } from "./slots";
import { Services } from "./services";

export interface Appointment {
  _id: string;
  therapistId: Therapist;
  customerId: Account;
  slotsId: Slot;
  serviceId: Services;
  checkInImage: string;
  checkOutImage: string;
  notes: string;
  amount: number;
  status: string;
}

export interface UpdateAppointment {
  checkInImage?: File;
  checkOutImage?: File;
  notes: string;
  status: string;
}
