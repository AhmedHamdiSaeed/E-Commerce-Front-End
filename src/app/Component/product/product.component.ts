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
}
