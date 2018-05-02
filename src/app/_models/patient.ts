import { Appointment } from './appt';
import { Prescription } from './scrip';
import { DoctorNote } from './note';
import { Notification } from './notification';

export class Patient {
  patient_id: number;
  // id: number;
  gender: string;
  username: string;
  password: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
  emergency_contact: string;
  dob: Date;
  profPic?: string;
  appointments?: Appointment[];
  scrips?: Prescription[];
  docNotes?: DoctorNote[];
  notifications?: Notification[];
}
