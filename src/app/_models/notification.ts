import { Doctor } from './doctor';
import { Patient } from './patient';

export class Notification {
  doctor: Doctor;
  patient: Patient;
  notificationType: string;
  date: Date;
  msg: string;
  beenDisplayed: boolean;
}
