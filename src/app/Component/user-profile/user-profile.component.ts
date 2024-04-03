import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { UserProfileService } from '../../Services/UserProfile/user-profile.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrl: './user-profile.component.css'
})
export class UserProfileComponent {
userProfile:FormGroup

constructor(private userProfileService:UserProfileService) {
  this.userProfile=new FormGroup({
    fname:new FormControl(''),
  lname:new FormControl(''),
  email:new FormControl(''),
  image:new FormControl(''),
  address:new FormGroup({
    city:new FormControl(''),
    postalCode:new FormControl(''),
    street:new FormControl(''),
  }),
  })
  this.userProfileService.getUserUpdate().subscribe(user=>{
    console.log("user",user)
  })

}
}
