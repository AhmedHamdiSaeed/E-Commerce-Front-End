import { Component, OnDestroy, Sanitizer } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { UserProfileService } from '../../Services/UserProfile/user-profile.service';
import { baseURL } from '../../../../env';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { ImageService } from '../../Services/images/image.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrl: './user-profile.component.css'
})
export class UserProfileComponent implements OnDestroy{
   userProfile:FormGroup
   userDb:any
   url:any
   isLoading:boolean=false
subscription:Subscription
constructor(
  private userProfileService:UserProfileService,
  private imageServices:ImageService,private formBuilder:FormBuilder) {
    this.isLoading=true;
    this.userProfile=this.formBuilder.group({
        fname: [''],
        lname: [''],
        email: [''],
        address:formBuilder.group({
          city: [''],
          postalCode: [''],
          street: ['']
        }),
        image:['']
    
    });

    this.subscription=this.userProfileService.getCurrentUser().subscribe((user)=>{
      this.userDb=user;
      console.log("user",this.userDb.fname)
      this.url=this.getImageUrl(this.userDb.image);
      this.isLoading=false;
      this.userProfile.patchValue({
        fname:this.userDb.fname,
        lname:this.userDb.lname,
        email:this.userDb.email,
        image:this.userDb.image,
        address:{
          city:this.userDb.city,
          postalCode:this.userDb.postalCode,
          street:this.userDb.street,
        }})
        console.log("userProfile :",)
        // console.log("url",this.getImageUrl(this.userProfile.))

  })}
     


  ngOnDestroy(): void {
    if(this.subscription)
    this.subscription.unsubscribe() }

getImageUrl(imagePath: string) :SafeUrl {
  return this.imageServices.getImageUrl(imagePath) ;
}


  }

      
