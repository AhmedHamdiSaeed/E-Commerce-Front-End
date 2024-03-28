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
  searchTerm: string = '';
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private productService: ProductService,
    private cartService: CartService,
    private auth: AuthService
  ) {}

  allCategories: Category[] = [];
  // products: Product[] | any = [];
  isLoading: boolean = false;
  error: string = '';
  categoryId: string | null = null;
  successMessage: string = '';
  sortBy: string = '';
  receivedProducts: any[] = [];

  ngOnInit(): void {
    this.getAllCategories();
    this.getAllProducts();
    this.route.paramMap.subscribe((params) => {
      this.categoryId = params.get('id');
      if (this.categoryId) {
        this.getProductsByCategory(this.categoryId);
      }
    });
  }
  getAllProducts(): void {
    this.isLoading = true;
    this.productService.getProducts().subscribe(
      (products: any) => {
        this.receivedProducts = products;
        this.isLoading = false;
      },
      (err) => {
        console.log(err);
        this.isLoading = false;
        this.error = err.error.message;
      }
    );
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

  getProductsByCategory(categoryId: string): void {
    console.log('getProductsByCategory:', categoryId);
    this.productService.getProductsByCategory(categoryId).subscribe(
      (product: any) => {
        this.receivedProducts = product;
      },
      (error) => {
        console.log(error);
        this.isLoading = false;
        this.error = error.message;
      }
    );
  }

  alertAppear() {
    this.successMessage = 'Product added to cart!';
    setTimeout(() => {
      this.successMessage = '';
    }, 3000);
  }
  // addToCart(product: Product) {
  //   if (!this.auth.isAuthenticated()) {
  //     this.router.navigate(['/login']);
  //     return;
  //   }
  //   this.alertAppear();
  //   this.cartService.addToCart(product);
  // }
  getSpecificCategory(categoryId: string): void {
    console.log('Category clicked:', categoryId);
    this.getProductsByCategory(categoryId);
  }

  // Load image
  getImageUrl(imagePath: string): string {
    return `../../../assets${imagePath}`;
  }

  //filter
  onSearchTextChanged(searchValue: string) {
    this.searchTerm = searchValue;
  }

  //sort
  onSortChange(sortBy: string): void {
    if (sortBy === 'price') {
      this.receivedProducts.sort((a: { price: any }, b: { price: any }) => {
        const priceA = a.price;
        const priceB = b.price;
        return priceA - priceB; // Sort by price in ascending order
      });
    } else if (sortBy === 'price-desc') {
      this.receivedProducts.sort((a: { price: any }, b: { price: any }) => {
        const priceA = a.price;
        const priceB = b.price;
        return priceB - priceA; // Sort by price in descending order
      });
    } else if (sortBy === 'category') {
      this.receivedProducts.sort(
        (a: { category: any }, b: { category: any }) => {
          const categoryA = a.category.toLowerCase();
          const categoryB = b.category.toLowerCase();
          if (categoryA < categoryB) {
            return -1;
          }
          if (categoryA > categoryB) {
            return 1;
          }
          return 0;
        }
      );
    }
  }

  //pagination
  updateDisplayedProducts(displayedProducts: any[]): void {
    this.receivedProducts = displayedProducts;
  }
}
