import { Component, OnInit } from '@angular/core';
import { CategoryService } from '../../Services/category/category-services.service';
import { Category } from '../../models/categoryModel';
import { Product } from '../../models/product';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrl: './categories.component.css',
})
export class CategoriesComponent implements OnInit {
  cats: Category[] = [];
  isLoading: boolean = false;
  error: string = '';
  constructor(private CategoryServices: CategoryService) {}

  ngOnInit(): void {
    this.isLoading = true;
    this.CategoryServices.getCategories().subscribe(
      (cats: any) => {
        this.cats = cats;
        this.isLoading = false;
      },
      (err) => {
        console.log(err);
        this.isLoading = false;
        this.error = err.error.message;
      }
    );
  }
}
