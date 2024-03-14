// product-details.component.ts
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../../Services/product/product.service';
import { Product } from '../../models/product';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css'] // Correct property name
})
export class ProductDetailsComponent implements OnInit {
  product: Product | undefined; // Define as optional

  isLoading: boolean = false;
  error: string = "";

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService
  ) {}

  ngOnInit(): void {
    const productId = this.route.snapshot.paramMap.get('id');
    if (productId) {
      this.isLoading = true;
      this.productService.getProductById(productId)
        .subscribe(
          (product: any) => {
            this.product = product;
            this.isLoading = false;
          },
          (error) => {
            console.error(error);
            this.isLoading = false;
            this.error = error.message || "An error occurred while fetching the product.";
          }
        );
    } else {
      console.error("Product ID is undefined.");
      this.error = "Product ID is undefined.";
    }
  }
}
