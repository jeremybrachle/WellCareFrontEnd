import { DocReview } from './doc_review';
import { Appointment } from './appt';
import { Prescription } from './scrip';
import { DoctorNote } from './note';
import { Notification } from './notification';
export class Doctor {
  id: number;
  username: string;
  password: string;
  firstName: string;
  lastName: string;
  specialty: string;
  email: string;
  phone: string;
  address: string;
  rating?: Number;
  profPic?: string;
  reviews?: DocReview[]; // REQUIRES SEPERATE GET
  appointments?: Appointment[]; // REQUIRES SEPERATE GET
  scrips?: Prescription[]; // REQUIRES SEPERATE GET
  notesForPatient?: DoctorNote[]; // REQUIRES SEPERATE GET
  notifications?: Notification[]; // REQUIRES SEPERATE GET
}
