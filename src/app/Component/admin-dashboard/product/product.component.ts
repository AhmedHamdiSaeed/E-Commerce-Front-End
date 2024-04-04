import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AdminServices } from '../../../Services/admin/admin-services.service';
import { ConfirmMessageComponent } from '../../../SharedComponent/confirm-message/confirm-message.component';
import { MatDialog } from '@angular/material/dialog';
import { ProductDetailsDialogComponent } from '../../Admin/product-details-dialog/product-details-dialog.component';
import { ImageService } from '../../../Services/images/image.service';
import { CategoryService } from '../../../Services/category/category-services.service';

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

  constructor(
    private router: Router,
    private dialog: MatDialog,
    private productService: AdminServices,
    private imageService: ImageService,
    private categoryService: CategoryService
  ) {}

  ngOnInit(): void {
    this.loadProducts();
    this.loadCategories();
  }

  async loadProducts() {
    this.isloading = true;
    try {
      const res = await this.productService.getProducts().toPromise();
      this.products = res;
      this.displayedProducts = res;
    } catch (error) {
      console.error(error);
    } finally {
      this.isloading = false;
    }
  }

  async loadCategories() {
    try {
      const res = await this.productService.getAllCategories().toPromise();
      this.categories = res;
    } catch (error) {
      console.error(error);
    }
  }

  filterProductsByCategory() {
    this.isloading = true;

    if (this.selectedCategory === '') {
      this.displayedProducts = this.products;
      this.isloading = false;
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
        },
        () => {
          this.isloading = false;
        }
      );
    }
  }

  openProductDetailsDialog(product: any): void {
    this.dialog.open(ProductDetailsDialogComponent, {
      data: product
    });
  }

  confirmRemoveProduct(productId: string): void {
    const dialogRef = this.dialog.open(ConfirmMessageComponent, {
      data: { message: 'Are you sure you want to remove this product?' ,title :' Remove Product '},

    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.deleteProduct(productId);
      }
    });
  }

  addProduct() {
    this.router.navigateByUrl('/Admin/AddProduct').then(() => {
      this.loadProducts();
    });
  }

  addCategory() {
    this.router.navigateByUrl('/Admin/AddCategory').then(() => {
      this.loadCategories();
    });
  }

  editProduct(productId: string) {
    this.router.navigateByUrl(`/Admin/EditProduct/${productId}`).then(() => {
      this.loadProducts();
  });
  }

  deleteProduct(productId: string) {
    console.log(productId);

    this.productService.deleteProduct(productId).subscribe(
      () => {
        console.log("Product deleted successfully");
        this.products = this.products.filter((p: any) => p._id !== productId);
        this.loadProducts();
      },
      err => {
        console.log(err);
      }
    );
  }

  getImageUrl(imagePath: string) {
    return this.imageService.getImageUrl(imagePath);
  }

  handelimageError(event: any){
    event.target.src = "../../../../assets/project images/4.png"
  }
}
