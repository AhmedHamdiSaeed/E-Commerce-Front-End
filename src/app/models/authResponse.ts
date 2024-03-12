import { User } from "./user";

export interface AuthResponseData {
    message: string ,
    token: string,
    expiresIn: string
    user: {
      fname: string,
      lname: string,
      email: string ,
      role: string
      
    },
  
  }