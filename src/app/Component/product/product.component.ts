import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../Services/product/product.service';
import { Product } from '../../models/product';
import { CartService } from '../../Services/Cart/cart.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css'] // Correct property name
})
export class ProductComponent implements OnInit {
  products: Product[] = [];
  isLoading: boolean = false;
  cartProducts: any[] = [];
  error: string = "";
  successMessage: string ="";
  constructor(private productService: ProductService,private cartService: CartService) {}

  ngOnInit() {
    this.isLoading = true;
    this.productService.getProducts()
      .subscribe(
        (products: any) => {
          this.products = products;
          this.isLoading = false;
        },
        (err) => {
          console.log(err);
          this.isLoading = false;
          this.error = err.error.message;
        }
      );
  }
  //hanel add to cart
  alertAppear(){
    this.successMessage='Product added to cart!';
    setTimeout(() => {
      this.successMessage = ''; 
    }, 3000);
  }
  addToCart(product: Product) {
  this.alertAppear();  
  this.cartService.addToCart(product);
   }
}
