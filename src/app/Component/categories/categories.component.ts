import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../../Services/product/product.service';
import { Product } from '../../models/product';
import { Category } from '../../models/categoryModel';
import { CartService } from '../../Services/Cart/cart.service';


@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css'],
})
export class CategoriesComponent implements OnInit {
  constructor(private route: ActivatedRoute, private productService: ProductService, private cartService: CartService,) {}

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
        this.products = product;
      },(error) => {
        console.log(error);
        this.isLoading = false;
        this.error = error.message;
    });
  }

  alertAppear(){
    this.successMessage='Product added to cart!';
    setTimeout(() => {
      this.successMessage = '';
    }, 3000);
  }
  addToCart(product: Product) {
  this.alertAppear();
  this.cartService.addToCart(product);
   }
  getSpecificCategory(categoryId: string): void {
    console.log('Category clicked:', categoryId);
    this.getProductsByCategory(categoryId);
  }
}
