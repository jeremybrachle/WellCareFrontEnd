import {Doctor} from './doctor';
import {Patient} from './patient';
export class Prescription {
  scripNum: number;
  prescriber: Doctor;
  patient: Patient;
  description?: string;
  name?: string;
  writtenOn: Date;
  expiration: Date;
}
