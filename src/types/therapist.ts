import { Account } from "./account";
import { Services } from "./services";

export interface Therapist {
  _id: string;
  accountId: Account;
  specialization: Services[];
  certification: Certification[];
  experience: string;
}

interface Certification {
  name: string;
  issuedBy: string;
  issuedDate: string;
}
