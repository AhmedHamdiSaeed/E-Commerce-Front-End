import { Component , OnInit} from '@angular/core';
import { Product } from '../../models/product';
import {ProductService} from '../../Services/product.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrl: './product.component.css'
})
export class ProductComponent  implements OnInit {
  products: Product[] = [];

  constructor(private productService: ProductService) {}

  ngOnInit() {
    this.productService.getProducts()
      .subscribe((products : any) => {
        this.products = products;
      });
  }
}
