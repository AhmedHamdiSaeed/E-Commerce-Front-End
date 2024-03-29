import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Product } from '../../models/product';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css'],
})
export class SearchComponent implements OnInit {
  @Input() receivedProducts: Product[] = []; // Define receivedProducts as an input property

  searchTerm: string = '';

  constructor() {}

  ngOnInit(): void {}

  @Output()
  searchTextChanged: EventEmitter<string> = new EventEmitter<string>();

  onSearchChange() {
    this.searchTextChanged.emit(this.searchTerm);
  }


  productMatchesSearch(product: Product): boolean {
    if (!this.searchTerm) {
      return true;
    }
    return product.title.toLowerCase().includes(this.searchTerm.toLowerCase());
  }
}
