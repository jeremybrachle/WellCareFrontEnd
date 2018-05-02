import { DocReview } from './doc_review';
import { Appointment } from './appt';
import { Prescription } from './scrip';
import { DoctorNote } from './note';
import { Notification } from './notification';
export class Doctor {
  doc_id: number;
  username: string;
  password: string;
  firstName: string;
  lastName: string;
  specialty?: string;
  email?: string;
  phone?: string;
  address?: string;
  rating?: Number;
  profPic?: string;
  reviews?: DocReview[];
  appointments: Appointment[];
  scrips: Prescription[];
  notesForPatient: DoctorNote[];
  notifications: Notification[];
}
