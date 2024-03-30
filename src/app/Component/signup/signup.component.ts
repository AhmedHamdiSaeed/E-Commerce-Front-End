import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../Services/auth/auth.service';
import { User } from '../../models/user';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css'
})
export class SignupComponent implements OnInit {

  isLoading: boolean = false ;
  error: string = "" ;
  constructor(private fb: FormBuilder,
              private auth: AuthService,
              private router: Router){}


  "registerForm" : FormGroup ;
  ngOnInit(): void {
    this.registerForm = this.fb.group({
      "UserFname" : new FormControl('' , [Validators.minLength(3) , Validators.maxLength(25) , Validators.required]),
      "UserLname" : new FormControl('' , [Validators.minLength(3) , Validators.maxLength(25) , Validators.required]),
      "email": new FormControl('' , [Validators.email , Validators.required]),
      "password": new FormControl('' , [Validators.minLength(6) , Validators.maxLength(25) , Validators.required]),
      "confirmPassword": new FormControl('' , Validators.required)
    } , {validator: this.checkMatchingPassword});
  }

  checkMatchingPassword(group : FormGroup)
  {
    const password = group.get('password')?.value ;
    const confirmpassword = group.get('confirmPassword')?.value ;
    return password === confirmpassword ? null : {nomatch: true};
  };

  onRegister(){

    this.isLoading = true ;
    console.log(this.registerForm.value);
    // const user = new User();
    const fname = this.registerForm.value.UserFname ;
    const lname = this.registerForm.value.UserLname ;
    const email = this.registerForm.value.email ;
    const password = this.registerForm.value.password ;
    this.auth.register(fname, lname , email , password)
    .subscribe((resdata)=>{
      console.log(resdata);
      this.isLoading = false ;
      this.router.navigateByUrl('/login') ;


    } , (err)=>{
      console.log(err);
      this.isLoading = false ;
      this.error = err.error.message ;


    })
    this.registerForm.reset();
  }
}
