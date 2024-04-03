export class User {
    fname: string;
    lname: string;
    email: string;
    image: string;
    address: {
      city: string;
      postalCode: string;
      street: string;
    };
  
    constructor(fname: string, lname: string, email: string, image: string, address: { city: string, postalCode: string, street: string }) {
      this.fname = fname;
      this.lname = lname;
      this.email = email;
      this.image = image;
      this.address = address;
    }
  }