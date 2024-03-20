import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { AuthService } from '../../Services/auth/auth.service';
import { Subscription } from 'rxjs';
import { User } from '../../models/user';
import { CartService } from '../../Services/Cart/cart.service';
import { ActivatedRoute, Params } from '@angular/router';
import { CartComponent } from '../Cart/cart/cart.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit, OnDestroy {
  cartProducts: any[] = [];
  isAuthed: boolean = false ;
  userSub !: Subscription ;
  user !: User | null ;
  constructor(private auth: AuthService ,private cartService: CartService ){}

  ngOnInit(): void {
   this.userSub =  this.auth.userSubject.subscribe((user)=>{
      this.isAuthed = !!user ;
      this.user = user ;
    })
    this.getCartProduct();
  }
  getCartProduct(){
    if("cart" in localStorage){
     this.cartProducts = JSON.parse(localStorage.getItem("cart")!);
     console.log( this.cartProducts)
     this.setItem()
    } 

  }
  setItem(){
    localStorage.setItem("cart", JSON.stringify(this.cartProducts));
  }
 
  ngOnDestroy(): void {
    this.userSub.unsubscribe() ;
  }

  onLogout(){
    this.auth.logout();
  }
}
