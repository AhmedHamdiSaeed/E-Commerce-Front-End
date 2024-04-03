import { Component } from '@angular/core';
import { CategoryService } from '../../../Services/category/category-services.service';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-category',
  templateUrl: './add-category.component.html',
  styleUrls: ['./add-category.component.css']
})
export class AddCategoryComponent {
  selectedImage!: File;

  constructor(private categoryService: CategoryService, private router: Router) {}

  onFileSelected(event: any) {
    this.selectedImage = event.target.files[0];
    console.log(this.selectedImage);
  }

  AddCategory(form: NgForm) {
    const forData = new FormData();
    forData.append('name', form.value.title);
    forData.append('image', this.selectedImage);

    this.categoryService.addCategory(forData).subscribe(
      (res) => {
        this.router.navigateByUrl('/Admin/Products');
        console.log(res);
      },
      (err) => {
        console.log(err);
      }
    );
  }
}
