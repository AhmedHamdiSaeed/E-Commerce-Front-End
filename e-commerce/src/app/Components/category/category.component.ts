import { Component } from '@angular/core';
import { CategoryService } from '../../Services/category/category.service';
import { Category } from '../../models/category';
@Component({
  selector: 'app-category',
  standalone: true,
  imports: [],
  templateUrl: './category.component.html',
  styleUrl: './category.component.css',
})
export class CategoryComponent {
  categories: Category[] = [];
  isLoading: boolean = false;
  error: string = '';
  constructor(private categoryService: CategoryService) {}

  ngOnInit() {
    this.isLoading = true;
    this.categoryService.getProducts().subscribe(
      (categories: any) => {
        this.categories = categories;
        this.isLoading = false;
      },
      (err: { error: { message: string } }) => {
        console.log(err);
        this.isLoading = false;
        this.error = err.error.message;
      }
    );
  }
}
