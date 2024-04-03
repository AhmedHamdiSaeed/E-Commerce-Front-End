import { Component, Sanitizer } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { UserProfileService } from '../../Services/UserProfile/user-profile.service';
import { baseURL } from '../../../../env';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrl: './user-profile.component.css'
})
export class UserProfileComponent {
userProfile:any;

constructor(private userProfileService:UserProfileService,private sanitizer:DomSanitizer) {
  this.userProfileService.getUserUpdate().subscribe(user=>{
    console.log("user",user)
    this.userProfile=user;
    console.log("userProfile",this.getImageUrl(this.userProfile.image))

  })

}
getImageUrl(imagePath: string) :SafeUrl {
  let safeurl = baseURL + imagePath ;
  return  this.sanitizer.bypassSecurityTrustUrl(safeurl) ;
}
}
