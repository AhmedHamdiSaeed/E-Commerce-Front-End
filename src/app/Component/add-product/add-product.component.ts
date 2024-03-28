import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Category } from '../../models/categoryModel';
import { CategoryService } from '../../Services/category/category-services.service';
import { ViewCat } from '../../models/viewCat';
import { ProductService } from '../../Services/product/product.service';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrl: './add-product.component.css'
})
export class AddProductComponent implements OnInit {
  allCategories: ViewCat[] = [];
  selectedImage!: File  ;
  color :string ="fff" ;

@ViewChild('addForm' , {static: true}) AddProductForm !: NgForm ;

  constructor(private getCategories:CategoryService , public prductService: ProductService ){}

  ngOnInit(): void {
    this.getAllCategories();
    
  }
  getAllCategories(): void {
    this.getCategories.getCategories().subscribe(
      (res: Category[]) => {
       res.forEach(element => {
          let tempCate = new ViewCat(element.name , element._id) ;
          this.allCategories.push(tempCate) ;
       }); 
      },
      (err) => {
        console.log(err);
        // this.isLoading = false;
        // this.error = err.error.message;
      }
    );
  }
  AddProduct(form: NgForm){
    // console.log(this.AddProductForm.value);
    const formData = new FormData() ;
    formData.append('title' , form.value.title);
    formData.append('quantity' , form.value.quantity);
    formData.append('price' , form.value.price);
    formData.append('description' , form.value.description);
    formData.append('colors' , this.color);
    formData.append('category' , form.value.category);
    formData.append('company' , form.value.company);
    formData.append('sold' , form.value.sold);
    formData.append('image' , this.selectedImage);

    console.log(formData.get('image'));
    
    
    this.prductService.addProduct(formData)
    .subscribe((res)=>{
      console.log("producte created successfuly");

      form.resetForm() ;
       
      
    }, err => {
      console.log(err);
      
    })

    
  }
  onFileSelected(event: any){
    this.selectedImage= event.target.files[0] ;
    // console.log(event.target.files[0]);
    
  }
}
