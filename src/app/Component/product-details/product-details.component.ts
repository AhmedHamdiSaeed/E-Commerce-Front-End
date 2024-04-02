import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../Services/product/product.service';
import { Category } from '../../models/categoryModel';
import { Product } from '../../models/product';
import {baseURL} from '../../../.././env'
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';

import { ActivatedRoute, Router } from '@angular/router';
import { CartService } from '../../Services/Cart/cart.service';
import { AuthService } from '../../Services/auth/auth.service';


@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit {

  product: Product | any;
  allCategories: Category[] = [];
  isLoading: boolean = false;
  error: string = "";
  categoryName: string = "";
  successMessage: string ="";
  quantity: number = 0;
  success:boolean = false;
  cartProducts: any[] = [];


  constructor(
    private route: ActivatedRoute,
    private sanititzer: DomSanitizer,
    private router: Router, private productService: ProductService, private cartService: CartService,private auth : AuthService
  ) {}


  async ngOnInit(): Promise<void> {
    await this.getAllCategories();
    const productId = this.route.snapshot.paramMap.get('id');
    if (productId) {
      this.isLoading = true;
      this.productService.getProductById(productId)
        .subscribe(
          (product: any) => {
            console.log(product);

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
  
  // addToCart(product: Product) {
  //   if (this.quantity <= 0) {

  //     return;
  //   }
  //   console.log("quantity: " + this.quantity);
  //   this.alertAppear();
  //   this.cartService.addToCart(product, this.quantity);
  //   this.quantity = 0;
  // }
  getImageUrl(imagePath: string) :SafeUrl {
    // return `../../../assets${imagePath}`;
    let safeurl = baseURL + imagePath ;

    console.log(safeurl);

    return  this.sanititzer.bypassSecurityTrustUrl(safeurl) ;

  }
  // increaseQuantity(product: Product) {
  //   const maxQuantity = product.quantity;
  //   if (this.quantity <= maxQuantity) {
  //     this.quantity++;
  //   }
  // }


  // decreaseQuantity(product: Product) {
  //   if (this.quantity > 1) {
  //     this.quantity--;
  //   }
  // }

   //add to cart 
   addToCart(product: Product) {
    const availableQuantity = product.quantity; // Get the available quantity of the product
    const currentQuantityInCart = this.getHoveredProductQuantity(product); // Get the current quantity of the product in the cart
    const quantityToAdd = Math.min(1, availableQuantity - currentQuantityInCart);
  
    if (quantityToAdd > 0) {
      this.cartService.addToCart(product, quantityToAdd);
    }
  }
  
 
  removeFromCart(product: Product) {
    this.cartService.removeFromCart(product); // Remove the product from the cart
  }
  
 getHoveredProductQuantity(product: Product): number {
    return this.cartService.getTotalQuantityInCart(product); // Convert
  }
  orderNow(){
    if (!this.auth.isAuthenticated()) {
      this.router.navigate(['/login']);
      return;
    }
    const quantity = this.getHoveredProductQuantity(this.product);
    const products = [{
      productId: this.product._id,
      quantity: quantity
    }];
  
    this.cartService.createNewCart(products).subscribe(
      res => {
        console.log(' creating new cart:', res);
        
      },
      error => {
        console.error('Error creating new cart:', error);
      }
    );
    console.log(products);
    
  }
  
}
