import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AdminServices } from '../../../Services/admin/admin-services.service';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { baseURL } from '../../../../../env';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {
  products: any;

  constructor(private router: Router,
     private productService: AdminServices,
     private sanitizer: DomSanitizer) {}

  ngOnInit(): void {
    this.getProducts();
  }

  getProducts() {
    this.productService.getProducts().subscribe((res) => {
      this.products = res;
    });
  }

  addProduct() {
    this.router.navigateByUrl('/Admin/AddProduct');
  }

  editProduct(productId: string) {
    this.router.navigateByUrl(`/edit-product/${productId}`);
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
    let safeurl = baseURL + '/' + imagePath ;
    console.log(safeurl);
    return  this.sanitizer.bypassSecurityTrustUrl(safeurl) ;

  }

}
