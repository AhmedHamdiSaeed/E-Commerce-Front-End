import { Component, OnInit } from '@angular/core';
import { CartService } from '../../Services/Cart/cart.service';
import { CheckoutService } from '../../Services/checkout/checkout.service';
import { ActivatedRoute } from '@angular/router';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { baseURL } from '../../../../env';
import { ImageService } from '../../Services/images/image.service';

@Component({
  selector: 'app-payment-success',
  templateUrl: './payment-success.component.html',
  styleUrl: './payment-success.component.css'
})
export class PaymentSuccessComponent implements OnInit{
order:any
payment:any
paymentId:string=''
isLoading: boolean = false ;

constructor(private cartservice:CartService,private imagServices: ImageService,private route:ActivatedRoute,private checkoutService:CheckoutService,private sanitizer: DomSanitizer) 
{
  localStorage.removeItem('cart');
this.isLoading=true;
this.route.params.subscribe((params)=>{
  this.paymentId=params['id'];
  this.checkoutService.getPaymentById(this.paymentId).subscribe((p)=>{
    this.payment=p;
    this.checkoutService.getOrderByIdWithProducts(this.payment.orderId).subscribe((res)=>{
      this.order=res;
      this.isLoading=false;

    })
  })
})
}
ngOnInit():void
{

 
}

// Load image
getImageUrl(imagePath: string) {
  return this.imagServices.getImageUrl(imagePath) ;
  }

}