import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
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
import { ReviewService } from '../../Services/Review/review.service';
import { Review } from '../../models/Review';
import { User } from '../../models/user';
import { OrderService } from '../../Services/order/order.service';
import { ToastrService } from 'ngx-toastr';


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
  newReview: Review = {
    product: '',
    user: {} as User,
    ratting: 0,
    description: '',
    
  };
  reviews: Review[] = [];
  checkoutSession:any={}
  constructor(
    private route: ActivatedRoute,
    private imageServices: ImageService,
    private router: Router, private productService: ProductService,
     private cartService: CartService,private reviewService: ReviewService,
     private orderService:OrderService,private toastr: ToastrService,
     private auth : AuthService,private checkoutservice:CheckoutService,
  ) {
    const storedUserData = localStorage.getItem('userData');
    if (storedUserData) {
      this.userData = JSON.parse(storedUserData);
      this.newReview.user = this.userData._id;
    }
  }

   productId = this.route.snapshot.paramMap.get('id');
  async ngOnInit(): Promise<void> {
    await this.getAllCategories();
     this.getCartProduct();
    if (this.productId) {
      this.isLoading = true;
      this.fetchReviews(this.productId)
      this.productService.getProductById(this.productId)
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
  
  getCartProduct(){
    if("cart" in localStorage){
      this.cartProducts = JSON.parse(localStorage.getItem("cart")!);
      console.log("cart :",this.cartProducts)

    } 
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
  console.log(this.cartService.getTotalQuantityInCart(product))
    return this.cartService.getTotalQuantityInCart(product); // Convert
  }
  
  orderNow(){
    this.isLoading = true;
  
    if (!this.auth.isAuthenticated()) {
      this.router.navigate(['/login']);
      return;
    }
    console.log(this.cartProducts);
    let products= this.cartProducts.map(item=>{
      return{productId: item.product._id, quantity: item.quantity}
    })
    console.log(products);
    this.cartService.createNewCart(products).subscribe(
      res => {
        this.success = true;
        this.newCart=res;
         console.log("newCart",this.newCart)
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

  fetchReviews(productId: string): void {
    this.reviewService.getReviews(productId).subscribe(
      reviews => {
        this.reviews = reviews.filter(review => review.product === productId);
        if (this.reviews.length > 0) {
          console.log(this.reviews[0].user.fname); 
        }   
      },
      error => {
        console.error('Error retrieving reviews:', error);
      }
    );
  }

  getStarsArray(ratting: number): number[] {
    return Array(ratting).fill(0);
  }
 
  
  userData:any;
  hasAccess:boolean=false;
  reviewAdded: boolean = Boolean(JSON.parse(localStorage.getItem('reviewAdded') ?? 'false'));
  showForm: boolean = false; 

submitReview(): void {
  if (this.productId !== null) {
   
      this.newReview.product = this.productId;
      console.log('review:', this.newReview);

     
      this.reviewService.createReview(this.newReview).subscribe(
          response => {
              console.log('Review submitted successfully:', response);

              // Remove the flag from local storage
              localStorage.removeItem('reviewAdded');

              // Update the reviewAdded status and fetch reviews for the selected product
              this.reviewAdded = true;
              this.showForm = false;
              this.fetchReviews(this.newReview.product);
          },
          error => {
              console.error('Error submitting review:', error);
          }
      );
  } else {
      console.error('Description or rating is missing.');
  }
}

  setRating(ratting: number): void {
    this.newReview.ratting = ratting;
  }

  checkAccessToWriteReview(productId: string): void {
    if (!this.auth.isAuthenticated()) {
      this.router.navigate(['/login']);
      return;
    }
    if (this.reviewAdded) {
      this.toastr.warning('You have already added a review.', 'Warning');
      return;
    }
    this.orderService.isProductInOrders(productId).subscribe(
      (hasAccess: boolean) => {console.log(hasAccess)
        if (hasAccess) {
          this.showForm = true;
        } else {
          this.toastr.error('Access denied to write a review.', 'Error');
        }
      },
      error => {
        console.error('Error checking access to write review:', error);
      }
    );
  }
  
  deleteReview(review:any) {
    console.log(this.product.reviews[0]._id)
    console.log(this.product._id)
    this.reviewService.deleteReview(review._id).subscribe(
      response => {
        console.log('Review deleted successfully:', response);
        this.fetchReviews(review.product);
        this.reviewAdded = false;
        localStorage.setItem('reviewAdded', JSON.stringify( this.reviewAdded));    
        
      },
      error => {
        console.error('Error deleting review:', error);
      }
    );
  }

  reviewToUpdate :any;
  openUpdateModal(review: any ): void {

    this.reviewToUpdate = review;
    this.newReview.ratting = review.ratting;
    this.newReview.description =review.description;
    
  }

  updateReview() {
    if (this.reviewToUpdate) {
      console.log(this.reviewToUpdate)
      this.newReview.product=this.reviewToUpdate.product;
      console.log('review:', this.newReview);
      this.reviewService.updateReview(this.reviewToUpdate._id, this.newReview).subscribe(
        response => {
          console.log('Review updated successfully:', response);
          this.fetchReviews(this.product._id);
        },
        error => {
          console.error('Error updating review:', error);
        }
      );
    }}



  
}
