import { Component, ElementRef, ViewChild } from '@angular/core';
import { AdminServicesService } from '../../Services/admin-services.service';

@Component({
  selector: 'app-admin-board',
  templateUrl: './admin-board.component.html',
  styleUrl: './admin-board.component.css'
})
export class AdminBoardComponent {
  isExpanded: boolean = false ;


  constructor( private adminServices : AdminServicesService) {}



  getProducts(){
    this.adminServices.getProducts().subscribe( (products)=>{
      console.log(products);
      console.log("pro");
      
      
    })
  }

  getOrders(){
    this.adminServices.getOrders().subscribe( (orders)=>{
      console.log(orders);
      
    })
  }

  getCategories(){
    this.adminServices.getCategories().subscribe( (cat)=>{
      console.log(cat);
      
    })
  }

  getUsers(){
    this.adminServices.getUsers().subscribe( (users)=>{
      console.log(users);
      
    })
  }

}
