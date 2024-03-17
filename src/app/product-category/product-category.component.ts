import { Component, OnInit } from '@angular/core';
import { Product } from '../models/product';
import { ProductService } from '../Services/product/product.service';
import { CategoryService } from '../Services/category/category-services.service';
import { ActivatedRoute } from '@angular/router';
import { Category } from '../models/categoryModel';

@Component({
  selector: 'app-product-category',
  templateUrl: './product-category.component.html',
  styleUrls: ['./product-category.component.css'], // Changed styleUrl to styleUrls
})
export class ProductCategoryComponent implements OnInit {
  products: Product[] = [];
  categoryProducts: Product[] = [];
  cats: Category[] = [];
  isLoading: boolean = false;
  error: string = '';
  myCat!: string;

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService,
    private categoryService: CategoryService
  ) {}

  ngOnInit() {
    const categoryName = this.route.snapshot.paramMap.get('name');

    this.isLoading = true;
    this.categoryService.getCategories().subscribe((cats: any) => {
      this.cats = cats;
      this.isLoading = false;
      for (let cat of this.cats) {
        if (cat.name === categoryName) {
          this.myCat = cat._id;
          break;
        }
      }
    });
    this.productService.getProducts().subscribe(
      (products: any) => {
        this.products = products;
        this.categoryProducts = this.products.filter(
          (product) => product.category === this.myCat
        );
        this.isLoading = false;
      },
      (error) => {
        console.error(error);
        this.isLoading = false;
        this.error =
          error.message || 'An error occurred while fetching the product.';
      }
    );
  }
}
