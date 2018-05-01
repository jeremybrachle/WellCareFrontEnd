import {Doctor} from './doctor';
import {Patient} from './patient';
export class Prescription {
  Rx_Numb: number;
  doctor: Doctor;
  patient: Patient;
  description?: string;
  name?: string;
  start_date: string;
  expiration: string;
  refill: number;
}
