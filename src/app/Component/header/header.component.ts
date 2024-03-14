import { Component, OnDestroy, OnInit } from '@angular/core';
import { AuthService } from '../../Services/auth/auth.service';
import { Subscription } from 'rxjs';
import { User } from '../../models/user';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit, OnDestroy {

  isAuthed: boolean = false ;
  userSub !: Subscription ;
  user !: User | null ;
  constructor(private auth: AuthService){}

  ngOnInit(): void {
   this.userSub =  this.auth.userSubject.subscribe((user)=>{
      this.isAuthed = !!user ;
      this.user = user ;
    })
  }

  ngOnDestroy(): void {
    this.userSub.unsubscribe() ;
  }

  onLogout(){
    this.auth.logout();
  }
}
