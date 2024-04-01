import { Component, OnDestroy, OnInit } from '@angular/core';
import { AuthService } from './Services/auth/auth.service';
import { Subscription } from 'rxjs';
import { User } from './models/user';
import { FormsModule } from '@angular/forms';
import {TranslateService} from "@ngx-translate/core";
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit,OnDestroy {

  constructor(private auth : AuthService ,private translate: TranslateService){
  
    translate.use('ar');
  }
  userSub!: Subscription ;
  User!: User | null ;
  ngOnInit(): void {
    this.auth.autoLogin()
   this.userSub =  this.auth.userSubject.subscribe((user)=>{
      this.User = user ;
      // console.log(user.);

   })
  }
 
  ngOnDestroy(): void {
    this.userSub.unsubscribe()
  }
}
