import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AdminServices } from '../../../Services/admin/admin-services.service';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { baseURL } from '../../../../../env';
import { ConfirmMessageComponent } from '../../../SharedComponent/confirm-message/confirm-message.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {
  products: any;

  constructor(private router: Router,
     private productService: AdminServices,
     private sanitizer: DomSanitizer ,public dialog: MatDialog ,) {}

  ngOnInit(): void {
    this.getProducts();

  }

  async getProducts() {
    try {
      const res = await this.productService.getProducts().toPromise();
      this.products = res;
    } catch (error) {
      console.error(error);
    }
  }

  confirmRemoveProduct(productId: string): void {
    const dialogRef = this.dialog.open(ConfirmMessageComponent, {
      width: '300px',
      data: { message: 'Are you sure you want to remove this product?' },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.deleteProduct(productId);
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
      },
      err => {
        console.log(err);
      }
    );
  }



  getImageUrl(imagePath: string) :SafeUrl {
    // return `../../../assets${imagePath}`;
    let safeurl = baseURL + imagePath ;

    // console.log(safeurl);

    // return "http://localhost:3000/api/v1/uploads/image-1711636730983.jpg"
    return  this.sanitizer.bypassSecurityTrustUrl(safeurl) ;

  }

}
