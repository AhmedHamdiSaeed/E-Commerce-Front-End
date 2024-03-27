import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../Services/product/product.service';
import { Category } from '../../models/categoryModel';
import { Product } from '../../models/product';
import { CartService } from '../../Services/Cart/cart.service';
import { AuthService } from '../../Services/auth/auth.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit {
  constructor(private route: ActivatedRoute,private router: Router, private productService: ProductService, private cartService: CartService,private auth : AuthService) {}

  product: Product | any;
  allCategories: Category[] = [];
  isLoading: boolean = false;
  error: string = "";
  categoryName: string = "";
  successMessage: string ="";




  async ngOnInit(): Promise<void> {
    await this.getAllCategories();
    const productId = this.route.snapshot.paramMap.get('id');
    if (productId) {
      this.isLoading = true;
      try {
        this.product = await this.productService.getProductById(productId).toPromise();
        const category = this.allCategories.find(c => this.product?.category == c._id );
        if (category) {
          this.categoryName = category.name;
        } else {
          this.categoryName = 'Unknown Category';
        }
      } catch (error: any) {
        console.error(error);
        this.error = error.message || "An error occurred while fetching the product.";
      } finally {
        this.isLoading = false;
      }
    } else {
      console.error("Product ID is undefined.");
      this.error = "Product ID is undefined.";
    }
  }

  async getAllCategories(): Promise<void> {
    this.isLoading = true;
    try {
      const res: Category[] | any = await this.productService.getAllCategories().toPromise();
      if (Array.isArray(res)) {
        this.allCategories = res;
      } else {
        this.allCategories = [res];
      }
      this.isLoading = false;
    } catch (err: any) {
      console.log(err);
      this.isLoading = false;
      this.error = err.error.message;
    }
  }
  alertAppear(){
    this.successMessage='Product added to cart!';
    setTimeout(() => {
      this.successMessage = '';
    }, 3000);
  }
  addToCart(product: Product) {
    if(!this.auth.isAuthenticated()){
      this.router.navigate(['/login']);
      return;
    }
    this.alertAppear();
    this.cartService.addToCart(product);
     }

  getImageUrl(imagePath: string): string {
    return `../../../assets${imagePath}`;
  }
}
