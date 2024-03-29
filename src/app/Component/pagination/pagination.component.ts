import { Component, EventEmitter, Output } from '@angular/core';
import { Product } from '../../models/product';
import { ProductService } from '../../Services/product/product.service';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.css'],
})
export class PaginationComponent {
  currentPage = 1; // Current page
  itemsPerPage = 6;
  products: Product[] | any = [];

  constructor(private productService: ProductService) {}
  ngOnInit(): void {
    this.getDisplayedProducts();
  }

  onPageChange(direction: string): void {
    if (direction === 'next') {
      this.currentPage++;
    } else if (direction === 'prev' && this.currentPage > 1) {
      this.currentPage--;
    }
    this.getDisplayedProducts();
  }

  @Output() displayedProductsEvent = new EventEmitter<any>();

  getDisplayedProducts(): void {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;

    this.productService.getProducts().subscribe((products: any) => {
      const displayedProducts = products.slice(startIndex, endIndex);
      this.displayedProductsEvent.emit(displayedProducts);
    });
  }
  
}
