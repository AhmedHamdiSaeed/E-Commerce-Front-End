import { Component, EventEmitter, Output, ViewChild } from '@angular/core';
import { Product } from '../../../models/product';
import { ProductService } from '../../../Services/product/product.service';
import { CartService } from '../../../Services/Cart/cart.service';
import { Router } from '@angular/router';
import { AuthService } from '../../../Services/auth/auth.service';
import { CategoriesComponent } from '../../categories/categories.component';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { baseURL } from '../../../../../env';
import { CheckoutService } from '../../../Services/checkout/checkout.service';
import { TranslateService } from '@ngx-translate/core';
import { ConfirmMessageComponent } from '../../../SharedComponent/confirm-message/confirm-message.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css'
})
export class CartComponent {
  products: Product[] = [];
  cartProducts: any[] = [];
  error: string = "";
  quantity: number = 1;
  success:boolean = false;
  newCart:any;
  isLoading:boolean=false;
  checkoutSession:any={}

  constructor(private router: Router ,private sanitizer: DomSanitizer,
    private cartService: CartService ,
    private auth: AuthService,
    private translate: TranslateService,
    private checkoutservice:CheckoutService,
    private dialog: MatDialog) { }
  

  setItem(){
    localStorage.setItem("cart", JSON.stringify(this.cartProducts));
  }
  ngOnInit(): void {
    this.getCartProduct();
    }
  clearCart() {

  
          this.cartService.Clear();
          this.getCartProduct();
    }
  

 
 
  getCartProduct(){
    if("cart" in localStorage){
      this.cartProducts = JSON.parse(localStorage.getItem("cart")!);
      console.log("cart :",this.cartProducts)

    } 
  }
  
  removeItem(i: number) {
  this.cartProducts .splice(i, 1);
  this. setItem();
  this.cartService.updateCartLengthFromLocalStorage();
  
  }
  

Clear(){
  this.cartProducts = [];
  this.setItem();
  this.getTotalPrice();
  this.cartService.updateCartLengthFromLocalStorage();
}


getTotalPrice(): number {
  return this.cartProducts.reduce((total, item) => total + (item.quantity * item.product.price), 0);
}
increaseQuantity(item: any): void {
  if (item.quantity < item.product.quantity) {
    item.quantity++;
    this.setItem();
    this.cartService.updateCartLengthFromLocalStorage();
  }
}

decreaseQuantity(item: any): void {
  if (item.quantity > 1) {
    item.quantity--;
    this.setItem();
    this.cartService.updateCartLengthFromLocalStorage();
  }
}




orderNow(){
  this.isLoading=true;
  if (!this.auth.isAuthenticated()) {
    this.router.navigate(['/login']);
    return;
  }
  
  let products= this.cartProducts.map(item=>{
    return{productId: item.product._id, quantity: item.quantity}
  })
  this.cartService.createNewCart(products).subscribe(
    res => {
      this.success = true;
      this.newCart=res;
       console.log("cart before order:",this.newCart)
      console.log("cart before order:",res)
    // this.router.navigateByUrl('/paymentSuccess/660c89afbb43b63edecfc5fa')
        this.checkoutservice.checkout(this.newCart.data._id).subscribe(
          (res)=>{
            this.checkoutSession=res;
            this.isLoading=true;
            window.location.href=this.checkoutSession.session.url;
          },
          (err)=>{console.log(" Error creating checkout: ",err)}
        )
    },
    error => {
      console.error('Error creating new cart:', error);
    }    

  );
  console.log(products);
  this.Clear();
}

// Load image
getImageUrl(imagePath: string): SafeUrl {
 
  let safeurl = baseURL + imagePath ;
  return  this.sanitizer.bypassSecurityTrustUrl(safeurl) ;

}
}

