import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from '../../Services/product/product.service';
import { Product } from '../../models/product';
import { Category } from '../../models/categoryModel';
import { CartService } from '../../Services/Cart/cart.service';
import { AuthService } from '../../Services/auth/auth.service';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css'],
})
export class CategoriesComponent implements OnInit {
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private productService: ProductService,
    private cartService: CartService,
    private auth: AuthService
  ) {}

  allCategories: Category[] = [];
  products: Product[] | any = [];
  isLoading: boolean = false;
  error: string = "";
  categoryId: string | null = null;
  successMessage: string = "";

  async ngOnInit(): Promise<void> {
    await this.getAllCategories();
    await this.getAllProducts();
    this.route.paramMap.subscribe((params) => {
      this.categoryId = params.get('id');
      if (this.categoryId) {
        this.getProductsByCategory(this.categoryId);
      }
    });
  }

  async getAllProducts(): Promise<void> {
    try {
      this.isLoading = true;
      this.products = await this.productService.getProducts().toPromise();
      this.isLoading = false;
    } catch (err: any) {
      console.error(err);
      this.isLoading = false;
      this.error = err.error.message;
    }
  }

  async getAllCategories(): Promise<void> {
    try {
      const res: any = await this.productService.getAllCategories().toPromise();
      if (Array.isArray(res)) {
        this.allCategories = res;
      } else {
        this.allCategories = [res];
      }
    } catch (err: any) { 
      console.error(err);
      this.isLoading = false;
      this.error = err.error.message;
    }
  }

  async getProductsByCategory(categoryId: string): Promise<void> {
    try {
      console.log('getProductsByCategory:', categoryId);
      this.products = await this.productService.getProductsByCategory(categoryId).toPromise();
    } catch (error: any) {
      console.error(error);
      this.isLoading = false;
      this.error = error.error.message;
    }
  }

  alertAppear(): void {
    this.successMessage = 'Product added to cart!';
    setTimeout(() => {
      this.successMessage = '';
    }, 3000);
  }

  addToCart(product: Product): void {
    if (!this.auth.isAuthenticated()) {
      this.router.navigate(['/login']);
      return;
    }
    this.alertAppear();
    this.cartService.addToCart(product);
  }

  getSpecificCategory(categoryId: string): void {
    console.log('Category clicked:', categoryId);
    this.getProductsByCategory(categoryId);
  }

  // Load image
  getImageUrl(imagePath: string): string {
    return `../../../assets${imagePath}`;
  }
}
