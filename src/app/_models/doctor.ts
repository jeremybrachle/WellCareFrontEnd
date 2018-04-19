import { DocReview } from './doc_review';

export class Doctor {
  id: number;
  username: string;
  password: string;
  firstName: string;
  lastName: string;
  specialty?: string;
  email?: string;
  phone?: string;
  address?: string;
  rating?: Number;
  reviews?: DocReview[];
  profPic?: string;
}
