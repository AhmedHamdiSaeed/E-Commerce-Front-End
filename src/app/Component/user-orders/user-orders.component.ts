import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { OrderService } from '../../Services/order/order.service';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { baseURL } from '../../../../env';
import { CartService } from '../../Services/Cart/cart.service';
import { ImageService } from '../../Services/images/image.service';

@Component({
  selector: 'app-user-orders',
  templateUrl: './user-orders.component.html',
  styleUrl: './user-orders.component.css'
})
export class UserOrdersComponent {
orders:any
isLoading:boolean=false;
constructor(private orderService:OrderService,private imageService:ImageService,private sanitizer:DomSanitizer,private cartService: CartService)
{
  this.isLoading=true;
  this.orderService.getUserOrders().subscribe(
    (res)=>{
      this.orders=res
      this.isLoading=false;
      
      console.log("order qty", this.orders[0].cartItems[0].product.image);
    }
  )
}

getImageUrl(imagePath: string) :SafeUrl {
  let safeurl = baseURL + '/'+imagePath ;
  return  this.sanitizer.bypassSecurityTrustUrl(safeurl) ;
}
}

    