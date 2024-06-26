import {
  Component,
  ElementRef,
  HostListener,
  OnInit,
  ViewChild,
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from '../../Services/product/product.service';
import { Product } from '../../models/product';
import { Category } from '../../models/categoryModel';
import { CartService } from '../../Services/Cart/cart.service';
import { AuthService } from '../../Services/auth/auth.service';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { baseURL } from '../../../../env';
import { TranslateService } from '@ngx-translate/core';
import { ImageService } from '../../Services/images/image.service';
import { ReviewService } from '../../Services/Review/review.service';

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
    private auth: AuthService,
    private reviewService: ReviewService,
    private imagServices: ImageService,
    private translate: TranslateService
  ) {}

  allCategories: Category[] = [];
  products: Product[] | any = [];
  isLoading: boolean = false;
  error: string = '';
  categoryId: string | null = null;
  successMessage: string = '';
  sortBy: string = '';
  receivedProducts: any[] = [];
  searchTerm: string = '';
  quantity: number = 0;
  p: number = 1;
  itemsPerPage: number = 9;
  isHovered: boolean = false;
  hoveredProduct: any | null = null;
  categoriesInSlides: any[] = [];
  iterationIncrement: number = 0;
  ngOnInit(): void {
    this.getAllCategories();
    this.getAllProducts();
    this.onResize(null);
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
  //for knowing size of window
  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    if (window.innerWidth < 500) {
      this.iterationIncrement = 1;
    } else {
      this.iterationIncrement = 3;
    }
  }
  //
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
    ///////for slider
    for (
      let i = 0;
      i < this.allCategories.length;
      i += this.iterationIncrement
    ) {
      const slice = this.allCategories.slice(i, i + this.iterationIncrement);
      console.log('Slice:', slice);
      this.categoriesInSlides.push(slice);
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

  getSpecificCategory(categoryId: string): void {
    console.log('Category clicked:', categoryId);
    this.getProductsByCategory(categoryId);
  }

  getImageUrl(imagePath: string) {
    return this.imagServices.getImageUrl(imagePath);
  }
  ratting: number=0;
  getStarsArray(ratting: number): number[] {
    return Array(ratting).fill(0);
  }
  //filter

  onSearchTextChanged(searchValue: string) {
    this.searchTerm = searchValue;
    if (this.searchTerm == '') {
      this.ngOnInit();
    } else {
      this.receivedProducts = this.receivedProducts.filter((res) => {
        return res.title.toLowerCase().includes(this.searchTerm.toLowerCase());
      });
    }
  }

  //sort
  onSortChange(sortBy: string): void {
    this.productService.getProducts().subscribe((products: any) => {
      this.receivedProducts = products;
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
    });
  }

  //add to cart
  addToCart(product: Product) {
    const availableQuantity = product.quantity; // Get the available quantity of the product
    const currentQuantityInCart = this.getHoveredProductQuantity(product); // Get the current quantity of the product in the cart
    const quantityToAdd = Math.min(
      1,
      availableQuantity - currentQuantityInCart
    );

    if (quantityToAdd > 0) {
      this.cartService.addToCart(product, quantityToAdd);
    }
  }

  removeFromCart(product: Product) {
    this.cartService.removeFromCart(product); // Remove the product from the cart
  }

  getHoveredProductQuantity(product: Product): number {
    // Return the quantity of the product in the cart
    return this.cartService.getTotalQuantityInCart(product); // Convert
  }
}
