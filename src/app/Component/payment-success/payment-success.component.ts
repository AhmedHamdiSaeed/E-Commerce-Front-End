import { Component } from '@angular/core';
import { CartService } from '../../Services/Cart/cart.service';

@Component({
  selector: 'app-payment-success',
  templateUrl: './payment-success.component.html',
  styleUrl: './payment-success.component.css'
})
export class PaymentSuccessComponent {

constructor(private cartservice:CartService) {
  this.cartservice.Clear()
}

}