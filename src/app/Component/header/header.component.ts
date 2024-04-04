import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { AuthService } from '../../Services/auth/auth.service';
import { Subscription } from 'rxjs';
import { User } from '../../models/user';
import { CartService } from '../../Services/Cart/cart.service';
import { ActivatedRoute, Params } from '@angular/router';
import { CartComponent } from '../Cart/cart/cart.component';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit, OnDestroy {
  cartlength: number = 0;
  isAuthed: boolean = false ;
  userSub !: Subscription ;
  user !: User | null ;
  lang:any = 'en';
  
  constructor(private auth: AuthService ,private cartService: CartService ,private translate: TranslateService){
   console.log(this.lang= this.translate.currentLang)
    this.lang= this.translate.currentLang;

  }
  ///change language 
  changeLanguage(){
    if(this.lang=="en"){
      localStorage .setItem("lang" , "ar")
    
      }else{
        localStorage .setItem("lang" , "en")
      }
      window.location.reload();
  }
 
  ngOnInit(): void {
   this.userSub =  this.auth.userSubject.subscribe((user)=>{
      this.isAuthed = !!user ;
      this.user = user ;
    })
    this.getCartProductLength();
  }
  getCartProductLength(){
  this.cartService.getCartLength().subscribe(length => {
      this.cartlength = length;
    });
  }


  
  ngOnDestroy(): void {
    this.userSub.unsubscribe() ;
   
  }

  onLogout(){
   
    this.auth.logout();

    this.cartService.Clear();
  }
  getUser()
  {
    
  }
  getUserIamge(){
    return "../../../assets/project images/person2.png" ;
  }
}
