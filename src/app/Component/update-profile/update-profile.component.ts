import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { UserProfileService } from '../../Services/UserProfile/user-profile.service';

@Component({
  selector: 'app-update-profile',
  templateUrl: './update-profile.component.html',
  styleUrl: './update-profile.component.css'
})
export class UpdateProfileComponent{
 oldUser:any
  userProfile!: FormGroup;
  
  constructor(private userProfileService:UserProfileService,private fb:FormBuilder) {

    this.userProfileService.getCurrentUser().subscribe(user=>{
      console.log("user",user)
      this.oldUser=user;
      const{fname, lname,email,address,image}=this.oldUser;
      this.userProfile= fb.group({
        fname:new FormControl(fname,[Validators.required,Validators.pattern('[A-Za-z]{3,}')]),
      lname:[lname|| '',Validators.required,Validators.pattern('[A-Za-z]{3,}')],
      email:[email || '',],
      image:[image || '',],
      address:fb.group({
        city:[address.city || '',],
        postalCode:[address.postalCode || '',],
        street:[address.street || '',],
      }),
      })
    })}
   

get fname()
{
  return this.userProfile.get('fname');
}
get lname()
{
  return this.userProfile.get('lname');
}
get email()
{
  return this.userProfile.get('email');
}
get image()
{
  return this.userProfile.get('image');
}
get city()
{
  return this.userProfile.get('city');
}
get postalCode()
{
  return this.userProfile.get('postalCode');
}
get street()
{
  return this.userProfile.get('street');
}
updateUser()
{

}
 
}
