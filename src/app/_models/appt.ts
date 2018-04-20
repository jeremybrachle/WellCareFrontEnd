import { Patient } from './patient';
import { Doctor } from './doctor';
export class Appointment {
  date: Date;
  time: string;
  patient: Patient;
  doctor: Doctor;
  reason: string;
  insurance: string;
  newPatient: boolean;
}
