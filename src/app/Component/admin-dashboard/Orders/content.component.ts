import { Component ,OnInit} from '@angular/core';
import { AdminServices } from '../../../Services/admin/admin-services.service';

@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrl: './content.component.css'
})
// export interface OrderInfo {
//   status: string; // Order status property
// }

export class ContentComponent implements OnInit {
  modeSelect: any;
 orderInfo:any = [];
  users: any;
  orders: any;
  select: any;
  constructor(
    private serve: AdminServices,
  ) {}
  ngOnInit(): void {
    // this.getOrderInfo();
    this.orders = this.serve.getOrders().subscribe((res) => {
      this.orderInfo = res;
      // this.select = res.status;
      // console.log(res);
    });
    this.serve.getUsers().subscribe((res) => {
      this.users = res;
      //console.log(this.users);
    });
  }
  // getOrderInfo() {
  //   this.serve.getOrderInfo() // Replace with your order fetching method
  //     .subscribe(orders => this.orderInfo = orders);
  // }
  // updateOrderStatus(order: OrderInfo, newStatus: string) {
  //   this.serve.updateOrderStatus(order._id, newStatus) // Replace with your order update method
  //     .subscribe(() => {
  //       const index = this.orderInfo.findIndex(o => o._id === order._id);
  //       this.orderInfo[index].status = newStatus;
  //     });
  // }

}
