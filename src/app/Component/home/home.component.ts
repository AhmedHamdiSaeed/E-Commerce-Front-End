import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../Services/auth/auth.service';
import { CartService } from '../../Services/Cart/cart.service';
import { ProductService } from '../../Services/product/product.service';
import { CategoriesComponent } from '../categories/categories.component';
import { Product } from '../../models/product';
import { Category } from '../../models/categoryModel';
import { CarouselModule } from 'ngx-bootstrap/carousel';
import { DomSanitizer } from '@angular/platform-browser';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  constructor(private route: ActivatedRoute,
    private router: Router,
     private productService: ProductService,
      private cartService: CartService,
      private auth : AuthService,
      private sanitizer: DomSanitizer) {}

  allCategories: Category[] = [];
  products: Product[] = [];
  isLoading: boolean = false;
  error: string = "";
  categoryId: string | null = null;
  successMessage: string ="";

  ngOnInit(): void {
    this.getAllCategories();
    this.getAllProducts();
    this.route.paramMap.subscribe(params => {
      this.categoryId = params.get('id');
      if (this.categoryId) {
        this.getProductsByCategory(this.categoryId);
      }
    });
  }
  getAllProducts():void{
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

  getAllCategories(): void {
    this.productService.getAllCategories().subscribe(
      (res: any) => {
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

  getProductsByCategory(categoryId: string): void {
    console.log('getProductsByCategory:', categoryId);
    this.productService.getProductsByCategory(categoryId).subscribe(
       (product: any) => {
        console.log(product);
        
        // this.products = product;
      },(error) => {
        console.log(error);
        this.isLoading = false;
        this.error = error.message;
    });
  }

 
  getSpecificCategory(categoryId: string): void {
    console.log('Category clicked:', categoryId);
    this.getProductsByCategory(categoryId);
  }
}
