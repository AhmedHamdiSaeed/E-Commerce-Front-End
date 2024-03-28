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
    this.router.navigateByUrl('/add-product');
  }

  editProduct(productId: string) {
    this.router.navigateByUrl(`/edit-product/${productId}`);
  }

  deleteProduct(productId: string) {
    this.productService.deleteProduct(productId).subscribe(() => {
      this.products = this.products.filter((product: any) => product._id !== productId);
    });
  }

  getImageUrl(imagePath: string) :SafeUrl {
    // return `../../../assets${imagePath}`;
    let safeurl = baseURL + '/' + imagePath ;

    console.log(safeurl);

    // return "http://localhost:3000/api/v1/uploads/image-1711636730983.jpg"
    return  this.sanitizer.bypassSecurityTrustUrl(safeurl) ;

  }
}
