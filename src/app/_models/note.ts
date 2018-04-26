import { Doctor } from './doctor';
import { Patient } from './patient';

export class DoctorNote {
  message: string;
  recipient: Patient;
  sender: Doctor;
  date: Date;
  beenDisplayed: boolean;
}
