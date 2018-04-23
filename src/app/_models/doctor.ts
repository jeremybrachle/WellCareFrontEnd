import { DocReview } from './doc_review';
import { Appointment } from './appt';
import { Prescription } from './scrip';
export class Doctor {
  id: number;
  username: string;
  password: string;
  firstName: string;
  lastName: string;
  specialty?: string;
  email?: string;
  phone?: string;
  address?: string;
  rating?: Number;
  reviews?: DocReview[];
  profPic?: string;
  appointments: Appointment[];
  scrips: Prescription[];
}
