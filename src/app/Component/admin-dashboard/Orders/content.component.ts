import { Component ,OnInit} from '@angular/core';
import { AdminServices } from '../../../Services/admin/admin-services.service';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { baseURL } from '../../../../../env';
import { appUser } from '../../../models/applicationUser';

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
  users!: appUser[];
  orders: any;
  select: any;
  isloading = false;
  showDelet = false ;
  constructor(
    private adminService: AdminServices,
    private sanitizer: DomSanitizer
  ) {}
  ngOnInit(): void {
    this.isloading = true ;
    // this.getOrderInfo();
    this.orders = this.adminService.getOrders().subscribe((res) => {
      this.orderInfo = res;
      // this.select = res.status;
      // console.log(res , this.orderInfo);
    });
    this.adminService.getUsers().subscribe((res) => {
      this.users = res;
      this.isloading = false ;
      // console.log(this.users);
    });  // 1- todo handle error if req failde to get users data 
        // 2- conect the user with the link of the profile 
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


  getImgUrl(path: string): SafeUrl {
  let imagePath = baseURL+ '/'+ path ;
  // console.log(imagePath);
  
   return this.sanitizer.bypassSecurityTrustUrl(imagePath)
  }

  deleteUser(userId: string){
    return this.adminService.deleteUser(userId)
    .subscribe((res)=>{
      console.log(res);
      this.users = this.users.filter((user) => user._id !== userId);
      
    }, error =>{
      console.log(error);
      
    })
    // todo handle the error 
    // console.log(user._id);
    
  }

  showDele(){
    this.showDelet = true ;
  }
}
