import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { OrderService } from '../../Services/order/order.service';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { baseURL } from '../../../../env';

@Component({
  selector: 'app-user-orders',
  templateUrl: './user-orders.component.html',
  styleUrl: './user-orders.component.css'
})
export class UserOrdersComponent {
orders:any
isLoading:boolean=false;
constructor(private orderService:OrderService,private sanitizer:DomSanitizer)
{
  this.isLoading=true;
  this.orderService.getUserOrders().subscribe(
    (res)=>{
      this.orders=res
      this.isLoading=false;
      console.log("order qty",this.orders);
    }
  )
}
getImageUrl(imagePath: string) :SafeUrl {
  let safeurl = baseURL + imagePath ;
  return  this.sanitizer.bypassSecurityTrustUrl(safeurl) ;
}
}
