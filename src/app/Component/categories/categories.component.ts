import { Component, OnInit } from '@angular/core';
import { CategoryServicesService } from '../../Services/category/category-services.service';
import { Category } from '../../models/categoryModel';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrl: './categories.component.css'
})
export class CategoriesComponent implements OnInit  {
  cats!: Category[] ;

  constructor(private CategoryServices: CategoryServicesService){}

  ngOnInit(): void {

    this.CategoryServices.getCategory()
    .subscribe(data=>{
      this.cats = data ;
      // console.log(data) ;
    })
      //  this.CategoryServices.getCategory() ;
  }

  // getData(){
  //   this.CategoryServices.getCategory().subscribe(data=>{
  //     this.cats = data ;
  //     console.log(data) ;
  //   });
  // }



}
