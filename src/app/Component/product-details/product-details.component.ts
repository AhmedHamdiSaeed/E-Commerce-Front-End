import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../../Services/product/product.service';
import { Category } from '../../models/categoryModel';
import { Product } from '../../models/product';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit {
  product: Product | undefined;
  allCategories: Category[] = [];
  isLoading: boolean = false;
  error: string = "";
  categoryName: string = ""; // Corrected property name

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService
  ) {}

  ngOnInit(): void {
    this.getAllCategories();
    const productId = this.route.snapshot.paramMap.get('id');
    if (productId) {
      this.isLoading = true;
      this.productService.getProductById(productId)
        .subscribe(
          (product: any) => {
            this.product = product;
            this.isLoading = false;
            const category = this.allCategories.find(c => product.category == c._id );
            if (category) {
              this.categoryName = category.name;
            }
            console.log(this.categoryName);

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

  getAllCategories(): void {
    this.productService.getAllCategories().subscribe(
      (res: Category[] | any) => { // Adjust the type here
        if (Array.isArray(res)) {
          this.allCategories = res;
        } else {
          this.allCategories = [res];
        }
      },
      (err) => {
        console.log(err);
        this.isLoading = false;
        this.error = err.error.message;
      }
    );
  }
}
