// review.model.ts
import { User } from '../models/user';
export interface Review {
    product: string;
    user: User;
    ratting: number;
    description: string;
   
  }