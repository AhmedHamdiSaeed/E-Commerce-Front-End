import { Component, Sanitizer } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { UserProfileService } from '../../Services/UserProfile/user-profile.service';
import { baseURL } from '../../../../env';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { ImageService } from '../../Services/images/image.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrl: './user-profile.component.css'
})
export class UserProfileComponent {
userProfile:any;

constructor(
  private userProfileService:UserProfileService,
  private imageServices:ImageService) {
  this.userProfileService.getUserUpdate().subscribe(user=>{
    console.log("user",user)
    this.userProfile=user;
    console.log("userProfile",this.getImageUrl(this.userProfile.image))

  })

}
getImageUrl(imagePath: string) :SafeUrl {
  return this.imageServices.getImageUrl(imagePath) ;
}
}
