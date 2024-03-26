import { HttpClient } from '@angular/common/http';
import { Component, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../../Services/auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
@ViewChild('form', { static: true }) loginForm !: NgForm ;

error: string = '' ;
isLoading: boolean = false ;
constructor(private auth : AuthService,
            private router: Router){}

onSubmit(form : NgForm){
    // console.log('submitted')
    this.isLoading = true ;

    console.log(form.value.email);
    this.auth.login( form.value.email ,  form.value.password).subscribe((data)=>{
      console.log(data.user.role);

      this.isLoading = false ;
      if(data.user.role == 'admin')
      {
        this.router.navigate(['/Admin']) ;
      }
      else
      {
        this.router.navigate(['/products/category']) ;
      }

    } , (err) => {
      console.log(err) ;

      this.error = err.error.message ;
    }
    )


  }
}

