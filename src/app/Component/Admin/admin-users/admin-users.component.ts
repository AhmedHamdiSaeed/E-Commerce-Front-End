import { Component, OnInit } from '@angular/core';
import { baseURL } from '../../../../../env';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { AdminServices } from '../../../Services/admin/admin-services.service';
import { appUser } from '../../../models/applicationUser';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmMessageComponent } from '../../../SharedComponent/confirm-message/confirm-message.component';


@Component({
  selector: 'app-admin-users',
  templateUrl: './admin-users.component.html',
  styleUrl: './admin-users.component.css'
})
export class AdminUsersComponent implements OnInit {
  isloading = false;
  users!: appUser[];
  message!: string ;



  constructor(private sanitizer:DomSanitizer,
              private adminService: AdminServices,
              private confirmdialog: MatDialog
    ){

  }

  ngOnInit(): void {
    this.adminService.getUsers().subscribe((res) => {
      this.users = res;
      this.isloading = false ;
      // console.log(this.users);
    });  // 1- todo handle error if req failde to get users data
        // 2- conect the user with the link of the profile
     }

  OpenDialog( Id: string ){

    const msgDialog =  this.confirmdialog.open(ConfirmMessageComponent , {
       data: {message:"Are you sure remove this user?", title: "Remove User"},
       panelClass: 'custom-dialog' // Apply custom CSS class


     })

     msgDialog.afterClosed().subscribe((result=>{
       // console.log('dialog closed' , result);
       if(result) {
         console.log('confirm');
         this.message = "this user will be deleted " ;
         this.deleteUser(Id) ;


       }
       else {
        console.log("cansle");

       }

     }))
   }



  getImgUrl(path: string): SafeUrl {
    let imagePath = baseURL+ '/'+ path ;
    console.log(imagePath);

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
}
