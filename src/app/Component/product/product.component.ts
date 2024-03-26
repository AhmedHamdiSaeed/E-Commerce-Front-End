import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AdminServices } from '../../Services/admin/admin-services.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {
  products: any;

  constructor(private router: Router, private productService: AdminServices) {}

  ngOnInit(): void {
    this.getProducts();
  }

  getProducts() {
    this.productService.getProducts().subscribe((res) => {
      this.products = res;
    });
  }

  addProduct() {
    this.router.navigateByUrl('/add-product'); // Assuming '/add-product' is the route for adding a new product
  }

  editProduct(productId: string) {
    this.router.navigateByUrl(`/edit-product/${productId}`); // Assuming '/edit-product/:id' is the route for editing a product
  }

  deleteProduct(productId: string) {
    this.productService.deleteProduct(productId).subscribe(() => {
      // Remove the deleted product from the displayed products
      this.products = this.products.filter((product: any) => product._id !== productId);
    });
  }
}
