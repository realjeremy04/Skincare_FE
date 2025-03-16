import { Feedback } from "./feedback";

export interface Services {
  _id: string;
  serviceName: string;
  description: string;
  price: number;
  isActive: boolean;
  image: string;
}

export interface ServiceDetail {
  _id: string;
  serviceName: string;
  description: string;
  price: number;
  isActive: boolean;
  image: string;
  feedbacks: Feedback[];
}
