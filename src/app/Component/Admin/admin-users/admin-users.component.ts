import { Component, OnInit } from '@angular/core';
import { SafeUrl } from '@angular/platform-browser';
import { AdminServices } from '../../../Services/admin/admin-services.service';
import { appUser } from '../../../models/applicationUser';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmMessageComponent } from '../../../SharedComponent/confirm-message/confirm-message.component';
import { ImageService } from '../../../Services/images/image.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-admin-users',
  templateUrl: './admin-users.component.html',
  styleUrl: './admin-users.component.css'
})
export class AdminUsersComponent implements OnInit {
  isloading = false;
  users!: appUser[];
  message!: string ;



  constructor(
              private adminService: AdminServices,
              private confirmdialog: MatDialog,
              private imageService : ImageService,
              private router: Router
    ){

  }

  ngOnInit(): void {
    this.adminService.getUsers().subscribe((res) => {
      this.users = res;
      this.isloading = false ;
      console.log(this.users);
    }, (error)=>{
      console.log(error);
      
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
      return this.imageService.getImageUrl(path)
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

    getUserData(userIndex: number){
      const userId = this.users[userIndex]._id ;
      console.log(userId);
      this.adminService.getordersofUser(userId).subscribe((res)=>{
        console.log(res);
        
      })
      // this.router.navigateByUrl('')
    }
}
