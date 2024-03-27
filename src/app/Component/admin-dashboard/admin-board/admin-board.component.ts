import { Component, ElementRef, ViewChild , OnInit } from '@angular/core';
import { AdminServices } from '../../../Services/admin/admin-services.service';
import {AuthService} from "../../../Services/auth/auth.service"
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-board',
  templateUrl: './admin-board.component.html',
  styleUrl: './admin-board.component.css'
})
export class AdminBoardComponent implements OnInit {
  products: any;
  orderInfo = [];
  users: any;
  totalSales = 0;
  constructor(
    private router: Router,
    private product: AdminServices,
   private auth : AuthService
  ) {}
  ngOnInit(): void {
    this.getProducts();
    this.getUser();
    console.log(this.totalSales);
    console.log(this.orderInfo);
  }
  getUser() {
    this.product.getUsers().subscribe((res) => {
      this.users = res;
    });
  }
  // getOrders() {
  //   this.product.getOrders().subscribe((res) => {
  //     this.orderInfo = res;
  //     this.orderInfo.map((item) => {
  //       this.totalSales += item;
  //     });
  //   });
  // }
  logout() {
    this.auth.logout();
    localStorage.removeItem('token');
    this.router.navigateByUrl('/login');
  }
  getProducts() {
    this.product.getProducts().subscribe((res) => {
      this.products = res;
      console.log(res);
    });
  }
}
