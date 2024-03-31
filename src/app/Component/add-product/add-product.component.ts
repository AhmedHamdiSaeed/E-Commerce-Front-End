import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Category } from '../../models/categoryModel';
import { CategoryService } from '../../Services/category/category-services.service';
import { ViewCat } from '../../models/viewCat';
import { ProductService } from '../../Services/product/product.service';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmMessageComponent } from '../../SharedComponent/confirm-message/confirm-message.component';
import { Router } from '@angular/router';

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

  constructor(private getCategories:CategoryService , public prductService: ProductService ,public dialog: MatDialog , private router: Router){}

  ngOnInit(): void {
    this.getAllCategories();

  }

  confirmAddProduct(addForm: NgForm): void {
    const dialogRef = this.dialog.open(ConfirmMessageComponent, {
      width: '300px',
      data: { message: 'Are you sure you want to add this product?' },
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result)
      {
        this.AddProduct(addForm);
    this.router.navigate(['/Admin']) ;
      }
      addForm.resetForm() ;

  });
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
    this.color =  '#008000';
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
  confirmRemoveColor(color: string): void {
    const dialogRef = this.dialog.open(ConfirmMessageComponent, {
      width: '300px',
      data: { message: 'Are you sure you want to remove this color?' },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.removeColor(color);
      }
    });
  }
  hideRemoveIcon(chosenColor: string): void {}
  showRemoveIcon(chosenColor: string): void {}
}
