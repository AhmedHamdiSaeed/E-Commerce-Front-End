// search.component.ts
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
// import { SearchService } from '../../Services/search/search.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css'],
})
export class SearchComponent implements OnInit {
  searchTerm: string = '';

  constructor() {}
  ngOnInit(): void {}

  @Output()
  searchTextChanged: EventEmitter<string> = new EventEmitter<string>();
  onSearchChange() {
    this.searchTextChanged.emit(this.searchTerm);
  }
}
