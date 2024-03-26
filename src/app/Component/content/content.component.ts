import { Component ,OnInit} from '@angular/core';
import { AdminServices } from '../../Services/admin/admin-services.service';

@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrl: './content.component.css'
})
export class ContentComponent implements OnInit {
  modeSelect: any;
  orderInfo: any = [];
  users: any;
  orders: any;
  select: any;
  constructor(
    private serve: AdminServices,
  ) {}
  ngOnInit(): void {
    this.orders = this.serve.getOrders().subscribe((res) => {
      this.orderInfo = res;
      // this.select = res.status;
      console.log(res);
    });
    this.serve.getUsers().subscribe((res) => {
      this.users = res;
      //console.log(this.users);
    });
  }
  // Status(status, id) {
  //   const changedStatus = {
  //     status,
  //   };
  //   console.log(status, id);

  //   this.serve.updateStatus(id, { status }).subscribe({
  //     next: (res) => {
  //       this.orders = this.serve.getOrders().subscribe((res) => {
  //         this.orderInfo = res;

  //         // console.log(res);
  //       });
  //       console.log(res);
  //     },
  //   });
  // }
}
