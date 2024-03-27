import { Component, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrl: './add-product.component.css'
})
export class AddProductComponent {
@ViewChild('addForm' , {static: true}) AddProductForm !: NgForm ;
  AddProduct(){
    console.log(this.AddProductForm);
    
  }
}
