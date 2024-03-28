import { Component, EventEmitter, Output } from '@angular/core';
import { Product } from '../../../models/product';
import { ProductService } from '../../../Services/product/product.service';
import { CartService } from '../../../Services/Cart/cart.service';
import { Router } from '@angular/router';
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
  constructor(private router: Router ,private cartService: CartService) {}

  
  setItem(){
    localStorage.setItem("cart", JSON.stringify(this.cartProducts));
  }
 

  ngOnInit(): void {
  this.getCartProduct();
  }
 
  getCartProduct(){
    if("cart" in localStorage){
      this.cartProducts = JSON.parse(localStorage.getItem("cart")!);
     
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
  }
}

decreaseQuantity(item: any): void {
  if (item.quantity > 1) {
    item.quantity--;
    this.setItem();
  }
}
orderNow(){
  let products= this.cartProducts.map(item=>{
    return{productId: item.product._id, quantity: item.quantity}
  })

  this.cartService.createNewCart(products).subscribe(res=>{
   this.success=true;
  })
  console.log(products)
}

// Load image
getImageUrl(imagePath: string): string {
  return `../../../assets${imagePath}`;
}
}
