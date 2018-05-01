import { Appointment } from './appt';
import { Prescription } from './scrip';
import { DoctorNote } from './note';
import { Notification } from './notification';

export class Patient {
  id: number;
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
  appointments?: Appointment[]; // REQUIRE A SEPERATE GET
  scrips?: Prescription[]; // REQUIRE A SEPERATE GET
  docNotes?: DoctorNote[]; // REQUIRE A SEPERATE GET
  notifications?: Notification[]; // REQUIRE A SEPERATE GET
}
