import { Component, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})
// @NgModule({
//   imports: [
//     FormsModule
//   ]
// })
export class AddProductComponent {
@ViewChild('addForm' , {static: true}) AddProductForm !: NgForm ;

  AddProduct(){
    console.log(this.AddProductForm);
    
  }
}
