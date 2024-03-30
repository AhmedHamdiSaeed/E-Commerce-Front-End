import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Category } from '../../models/categoryModel';
import { CategoryService } from '../../Services/category/category-services.service';
import { ViewCat } from '../../models/viewCat';
import { ProductService } from '../../Services/product/product.service';
import { MatDialog } from '@angular/material/dialog';
@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css'],

})
export class AddProductComponent implements OnInit {
  allCategories: ViewCat[] = [];
  selectedImage!: File  ;
  color: string = '#008000';
  colors: string[] = [];
  chosenColors: string[] = [];

  @ViewChild('addForm' , {static: true}) AddProductForm !: NgForm ;

  constructor(private getCategories:CategoryService , public prductService: ProductService ,public dialog: MatDialog ){}

  ngOnInit(): void {
    this.getAllCategories();

  }
  confirmAddProduct(addForm: NgForm): void {
    if (confirm('Are you sure you want to add this product?')) {
      this.AddProduct(addForm);
    }
    addForm.resetForm();

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
      }
    );
  }
  AddProduct(form: NgForm){
    const formData = new FormData() ;
    formData.append('title' , form.value.title);
    formData.append('quantity' , form.value.quantity);
    formData.append('price' , form.value.price);
    formData.append('description' , form.value.description);
    formData.append('colors' , this.colors.join(','));
    formData.append('category' , form.value.category);
    formData.append('company' , form.value.company);
    formData.append('sold' , form.value.sold);
    formData.append('image' , this.selectedImage);

    this.prductService.addProduct(formData)
    .subscribe((res)=>{
      console.log("product created successfully");
      form.resetForm();
    }, err => {
      console.log(err);
    });
  }
  onFileSelected(event: any){
    this.selectedImage= event.target.files[0] ;
  }
  addColor(): void {
    if (!this.chosenColors.includes(this.color)) {
      this.chosenColors.push(this.color);
      this.colors.push(this.color);
    }
    this.color = '';
  }
  removeColor(chosenColor: string): void {
    const index = this.chosenColors.indexOf(chosenColor);
    if (index !== -1) {
      this.chosenColors.splice(index, 1);
    }
    const colorIndex = this.colors.indexOf(chosenColor);
    if (colorIndex !== -1) {
      this.colors.splice(colorIndex, 1);
    }
  }
}
