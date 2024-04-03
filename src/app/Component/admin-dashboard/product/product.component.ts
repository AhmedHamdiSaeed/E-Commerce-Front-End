import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AdminServices } from '../../../Services/admin/admin-services.service';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { baseURL } from '../../../../../env';
import { ConfirmMessageComponent } from '../../../SharedComponent/confirm-message/confirm-message.component';
import { MatDialog } from '@angular/material/dialog';
import {ProductDetailsDialogComponent} from '../../Admin/product-details-dialog/product-details-dialog.component';
@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {
  isloading = false;
  products: any;
  categories: any;
  selectedCategory: string = '';
  displayedProducts: any;

  constructor(private router: Router, private dialog: MatDialog,
    private productService: AdminServices,
    private sanitizer: DomSanitizer) {}

  ngOnInit(): void {
    this.isloading = true ;
    this.getProducts();

    this.getCategories();
  }

  async getProducts() {
    try {
      const res = await this.productService.getProducts().toPromise();
      this.products = res;
      this.displayedProducts = res;
      this.isloading = false ;

    } catch (error) {
      console.error(error);
    }
  }

  async getCategories() {
    try {
      const res = await this.productService.getAllCategories().toPromise();
      this.categories = res;
    } catch (error) {
      console.error(error);
    }
  }

  filterProductsByCategory() {
    if (this.selectedCategory === '') {
      this.displayedProducts = this.products;
    } else {
      this.productService.getProductsByCategory(this.selectedCategory).subscribe(
        (res: any) => {
          if (res && Array.isArray(res)) {
            this.displayedProducts = res;
          } else {
            console.error('Invalid response format:', res);
          }
        },
        (error) => {
          console.error(error);
        }
      );
    }
  }



  openProductDetailsDialog(product: any): void {
    this.dialog.open(ProductDetailsDialogComponent, {
      // width: '500px',
      data: product
    });
  }
  confirmRemoveProduct(productId: string): void {
    const dialogRef = this.dialog.open(ConfirmMessageComponent, {
      width: '300px',
      data: { message: 'Are you sure you want to remove this product?' },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.deleteProduct(productId);
        console.log("Product deleted successfully");
        this.products = this.products.filter((p: any) => p._id !== productId);
      }
    });
  }
  addProduct() {
    this.router.navigateByUrl('Admin/AddProduct');
  }

  addCategory(){
    this.router.navigateByUrl('/Add_Category');
  }

  editProduct(productId: string) {
    this.router.navigateByUrl(`/Admin/EditProduct/${productId}`);
  }

  deleteProduct(productId: string) {
    console.log(productId);

    this.productService.deleteProduct(productId).subscribe(
      () => {
        console.log("Product deleted successfully");
        this.products = this.products.filter((p: any) => p._id !== productId);
        this.getProducts(); // Refresh the list of products
      },
      err => {
        console.log(err);
      }
    );
  }




  getImageUrl(imagePath: string) :SafeUrl {
    // return `../../../assets${imagePath}`;
    let safeurl = baseURL + '/' + imagePath ;

    console.log(safeurl);

    return  this.sanitizer.bypassSecurityTrustUrl(safeurl) ;

  }

}
