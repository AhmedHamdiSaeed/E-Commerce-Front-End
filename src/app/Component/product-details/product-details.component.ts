import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../Services/product/product.service';
import { Category } from '../../models/categoryModel';
import { Product } from '../../models/product';
import {baseURL} from '../../../../env'
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';

import { ActivatedRoute, Router } from '@angular/router';
import { CartService } from '../../Services/Cart/cart.service';
import { AuthService } from '../../Services/auth/auth.service';
import { ImageService } from '../../Services/images/image.service';
import { CheckoutService } from '../../Services/checkout/checkout.service';


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
  newCart:any;
  checkoutSession:any={}
  constructor(
    private route: ActivatedRoute,
    private imageServices: ImageService,
    private router: Router, private productService: ProductService,
     private cartService: CartService,private auth : AuthService,private checkoutservice:CheckoutService,
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


  getImageUrl(imagePath: string)  {
  return this.imageServices.getImageUrl(imagePath) ;

  }
  



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
    this.isLoading = true;
  
    if (!this.auth.isAuthenticated()) {
      this.router.navigate(['/login']);
      return;
    }
  
    let products= this.cartProducts.map(item=>{
      return{productId: item.product._id, quantity: item.quantity}
    })
    this.cartService.createNewCart(products).subscribe(
      res => {
        this.success = true;
        this.newCart=res;
         console.log("cart before order:",this.newCart)
        console.log("cart before order:",res)
      // this.router.navigateByUrl('/paymentSuccess/660c89afbb43b63edecfc5fa')
          this.checkoutservice.checkout(this.newCart.data._id).subscribe(
           
            (res)=>{
              this.checkoutSession=res;
              this.isLoading=false;
              
              window.location.href=this.checkoutSession.session.url;
            },
            (err)=>{console.log(" Error creating checkout: ",err,this.newCart.data._id)}
          )
      },
      error => {
        console.error('Error creating new cart:', error);
      }    
  
    );
  
  }
  clearCart() {
    this.cartService.clearCart().subscribe(
      () => {
        this.cartService.Clear();
      },
      error => {
        console.error('Failed to clear cart:', error);
      }
    );
  }

}
