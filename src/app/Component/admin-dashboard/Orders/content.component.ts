import { Component ,OnInit} from '@angular/core';
import { AdminServices } from '../../../Services/admin/admin-services.service';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { baseURL } from '../../../../../env';
import { appUser } from '../../../models/applicationUser';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmMessageComponent } from '../../../SharedComponent/confirm-message/confirm-message.component';

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
  // users!: appUser[];
  orders: any;
  select: any;
  isloading = false;
  showDelet = false ;
  message!: string ;

  constructor(
    private adminService: AdminServices,
    private sanitizer: DomSanitizer,
    private confirmdialog: MatDialog
  ) {}
  ngOnInit(): void {
    this.isloading = true ;
    // this.getOrderInfo();
    this.orders = this.adminService.getOrders().subscribe((res) => {
      this.orderInfo = res;
      // this.select = res.status;
      // console.log(res , this.orderInfo);
      this.orderInfo.forEach((order: any )=> {
          // console.log(order.user.fname ,  order.user.lname);
          order.cartItems.forEach((p: any) => {
              console.log(p.product);
              
          });
          
      });
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


  getImgUrl(path: string): SafeUrl {
  let imagePath = baseURL+ '/'+ path ;
  // console.log(imagePath);
  
   return this.sanitizer.bypassSecurityTrustUrl(imagePath)
  }

 

  OpenDialog( Id: string ){

   const msgDialog =  this.confirmdialog.open(ConfirmMessageComponent , {
      width:'40%',
      height: '35%',
      data: {message: this.message, title: "Delete User"},
      panelClass: 'custom-dialog' // Apply custom CSS class


    })

    msgDialog.afterClosed().subscribe((result=>{
      // console.log('dialog closed' , result);
      if(result) {
        console.log('confirm');
        this.message = "this order will be deleted " ;
         this.deleteOreder(Id);
     
      }
      else {
       console.log("cansle");
        
      }      
      
    }))
  }

  deleteOreder(orderId : string){
    // this.adminService.deleteOrders(orderId).subscribe((res)=>{
    // console.log(res);

    // }, err =>{
    //   console.log(err);
      
    // })

    console.log('not empilemented yet ');
    
  }


}
