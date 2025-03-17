import { Slot } from "./slots";
import { Therapist } from "./therapist";

export interface Shift {
  _id: string;
  slotsId: Slot;
  appointmentId: string;
  therapistId: Therapist;
  date: string;
  isAvailable: boolean;
}
