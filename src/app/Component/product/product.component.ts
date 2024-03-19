import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../Services/product/product.service';
import { Product } from '../../models/product';

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

  constructor(private productService: ProductService) {}

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
  addToCart(product: Product) {
    if("cart" in localStorage){
     this.cartProducts = JSON.parse(localStorage.getItem("cart")!);
     let isExist= this.cartProducts.find(i => i._id === product._id);
     if(isExist){
      alert("Product already");
     }else{
       this.cartProducts.push(product);
       localStorage.setItem("cart", JSON.stringify(this.cartProducts));
     }
    }else{
     this.cartProducts.push(product);
     localStorage.setItem("cart", JSON.stringify(this.cartProducts));
    }
   
   }
}
