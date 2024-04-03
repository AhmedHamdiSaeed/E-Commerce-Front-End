import { Component, ElementRef, ViewChild , OnInit } from '@angular/core';
import { AdminServices } from '../../../Services/admin/admin-services.service';
import {AuthService} from "../../../Services/auth/auth.service"
import { Router } from '@angular/router';
import { baseURL } from '../../../../../env';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { ImageService } from '../../../Services/images/image.service';
import { Observable, interval } from 'rxjs';

@Component({
  selector: 'app-admin-board',
  templateUrl: './admin-board.component.html',
  styleUrl: './admin-board.component.css'
})
export class AdminBoardComponent implements OnInit {
  count!: number ;
  timer$!: Observable<number>;

  products: any;
  orderInfo = [];
  users: any;
  totalSales = 0;
  constructor(
    private router: Router,
    private adminServices: AdminServices,
   private auth : AuthService,
   private imageServices: ImageService
  ) {}
  ngOnInit(): void {
    this.getProducts();
    this.getUser();
    // console.log(this.totalSales);
    // console.log(this.orderInfo);
  }
  getUser() {
    this.adminServices.getUsers().subscribe((res) => {
      // console.log(res);
      
      this.users = res;
    });
  }

  logout() {
    this.auth.logout();
    localStorage.removeItem('token');
    this.router.navigateByUrl('/login');
  }
  getProducts() {
    this.adminServices.getProducts().subscribe((res) => {
      this.products = res;
      // console.log(res);
    });
  }


  getImageUrl(imagePath: string) :SafeUrl {
    return this.imageServices.getImageUrl(imagePath) ;

  }
}
