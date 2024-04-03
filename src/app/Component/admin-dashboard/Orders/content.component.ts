import { Component ,OnInit} from '@angular/core';
import { AdminServices } from '../../../Services/admin/admin-services.service';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { baseURL } from '../../../../../env';
import { appUser } from '../../../models/applicationUser';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmMessageComponent } from '../../../SharedComponent/confirm-message/confirm-message.component';
import { ImageService } from '../../../Services/images/image.service';

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
    private imageServices: ImageService,
    private confirmdialog: MatDialog
  ) {}
  ngOnInit(): void {
    this.isloading = true ;
    // this.getOrderInfo();
    this.orders = this.adminService.getOrders().subscribe((res) => {
      this.orderInfo = res;
      // this.select = res.status;
      // console.log(res , this.orderInfo);
      // console.log(res);
      this.orderInfo.forEach((order: any )=> {
          // console.log(order.user.fname ,  order.user.lname);
          order.cartItems.forEach((p: any) => {
              // console.log(p.product);
              
          });
          
      });
    });

    
  }


  getOrder(orderId :string){
    console.log(orderId);
    this.adminService.getOrderByID(orderId)
    .subscribe((res)=>{
      console.log(res);
      
    })
    
  }

  getImgUrl(path: string): SafeUrl {
    return this.imageServices.getImageUrl(path) ;
  }

 

  OpenDialog( Id: string ){

   const msgDialog =  this.confirmdialog.open(ConfirmMessageComponent , {
      width:'40%',
      height: '35%',
      data: {message: " this order will be canceled", title: "cancel order "},
      panelClass: 'custom-dialog' // Apply custom CSS class


    })

    msgDialog.afterClosed().subscribe((result=>{
      // console.log('dialog closed' , result);
      if(result) {
        console.log('confirm');
        this.message = "this order will be canceled " ;
         this.deleteOreder(Id);
     
      }
      else {
       console.log("cansle");
        
      }      
      
    }))
  }

  deleteOreder(orderId : string){
    console.log(orderId);
    this.adminService.cancelOrder(orderId).subscribe((res)=>{
      console.log(res);
      
    },(error) => console.log(error)
    )
    
  }


}
