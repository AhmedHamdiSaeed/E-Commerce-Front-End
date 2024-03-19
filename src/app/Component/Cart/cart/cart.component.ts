import { Component } from '@angular/core';
import { Product } from '../../../models/product';
import { ProductService } from '../../../Services/product/product.service';
import { CartService } from '../../../Services/Cart/cart.service';
@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css'
})
export class CartComponent {
  products: Product[] = [];
  isLoading: boolean = false;
  cartProducts: any[] = [];
  error: string = "";

  setItem(){
    localStorage.setItem("cart", JSON.stringify(this.cartProducts));
  }
  constructor(private cartService: CartService) {}

  ngOnInit(): void {
  this.getCartProduct();
  }
  getCartProduct(){
    if("cart" in localStorage){
      this.cartProducts = JSON.parse(localStorage.getItem("cart")!);
    } 
    console.log(this.cartProducts )
  }
  removeItem(i: number) {
  this.cartProducts .splice(i, 1);
  this. setItem();
  }
  increaseQuantity(product: Product) {
    product.quantity++;
    this. setItem(); 
}

decreaseQuantity(product: Product) {
    if (product.quantity > 1) {
        product.quantity--; 
        this. setItem();
    }
}
Clear(){
  this.cartProducts = [];
  this.setItem();
  this.getTotalPrice();
}
getTotalPrice(): number {

 return this.cartProducts.reduce((total, product) => total + (product.quantity * product.price), 0);
}

orderNow(){
  // let model={
  //   cartItems:[],
  //   user: this.user
  // }
}
}
