import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { CategoryService } from '../../Services/category/category-services.service';

@Component({
  selector: 'app-add-category',
  templateUrl: './add-category.component.html',
  styleUrl: './add-category.component.css'
})
export class AddCategoryComponent {
selectedImage!: File ;

  constructor(private categoryService: CategoryService){}

  onFileSelected(event: any){
    this.selectedImage = event.target.files[0] ;
    console.log(this.selectedImage);
    
  }

  AddCategory(form: NgForm){
    const forData = new FormData();
    forData.append('name' , form.value.title);
    forData.append('image' , this.selectedImage);

    this.categoryService.addCategory(forData).subscribe((res)=>{
      console.log(res);
      form.resetForm() ;
      
    },err =>{
      console.log(err);
      
    })

  }
}
