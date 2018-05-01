import { Patient } from './patient';
import { Doctor } from './doctor';
export class Appointment {
  date: string;
  time: string;
  patient: Patient;
  doctor: Doctor;
  reason: string;
  insurance: string;
  newPatient: boolean;
  type: string;
  status: string;
}
