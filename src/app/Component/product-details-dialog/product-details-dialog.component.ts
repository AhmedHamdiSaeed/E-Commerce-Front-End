import { Product } from '../../models/product';
import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { baseURL } from '../../../../env';
import { Category } from '../../models/categoryModel';
import { AdminServices } from '../../Services/admin/admin-services.service';
import { ConfirmMessageComponent } from '../../SharedComponent/confirm-message/confirm-message.component';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';

@Component({
  selector: 'app-product-details-dialog',
  templateUrl: './product-details-dialog.component.html',
  styleUrls: ['./product-details-dialog.component.css']
})
export class ProductDetailsDialogComponent {
  categoryName: string = "";
  allCategories: Category[] = [];

  constructor(
    private sanitizer: DomSanitizer,
    private productService: AdminServices,
    private dialog: MatDialog,
    private router: Router,
    @Inject(MAT_DIALOG_DATA) public data: Product,
    public dialogRef: MatDialogRef<ProductDetailsDialogComponent>,
  ) { }
  async ngOnInit(): Promise<void> {
    await this.getAllCategories();
    const category = this.allCategories.find(c => this.data.category == c._id );
            if (category) {
              this.categoryName = category.name;
            }
            console.log(this.categoryName);
  }
  closeDialog(): void {
    this.dialogRef.close();
  }

  getImageUrl(imagePath: string): SafeUrl {
    let safeurl = baseURL + imagePath;
    console.log(safeurl);
    return this.sanitizer.bypassSecurityTrustUrl(safeurl);
  }
  async getAllCategories(): Promise<void> {
    try {
      const res: Category[] | any = await this.productService.getAllCategories().toPromise();
      if (Array.isArray(res)) {
        this.allCategories = res;
      } else {
        this.allCategories = [res];
      }
    } catch (err: any) {
      console.log(err);
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
  editProduct(productId: string) {
    this.closeDialog();
    this.router.navigateByUrl(`/Admin/EditProduct/${productId}`);
  }

  deleteProduct(productId: string) {
    console.log(productId);
    this.productService.deleteProduct(productId).subscribe(
      () => {
        console.log("Product deleted successfully");
        this.closeDialog();

      },
      err => {
        console.log(err);
      }
    );
  }

}
