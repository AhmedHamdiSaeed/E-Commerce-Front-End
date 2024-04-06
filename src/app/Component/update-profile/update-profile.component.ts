import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { User } from '../../models/user';
import { UserProfileService } from '../../Services/UserProfile/user-profile.service';
import { ImageService } from '../../Services/images/image.service';
// import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-update-profile',
  templateUrl: './update-profile.component.html',
  styleUrl: './update-profile.component.css',
})
export class UpdateProfileComponent {
  user: any;
  userProfile!: FormGroup;
  isLoading: boolean = false;
  selectedImageFile!: File;
  // url: any;
  // toastr = inject(ToastrService);
  constructor(
    private fb: FormBuilder,
    private userService: UserProfileService,
    private imageService: ImageService
  ) {

    // this.userProfileService.getCurrentUser().subscribe((user) => {
    //   console.log('user', user);
    //   this.userDb = user;
    //   const { fname, lname, email, address, image } = this.userDb;
    //   this.userProfile.patchValue({
    //     fname: this.userDb.fname,
    //     lname: this.userDb.lname.value,
    //     email: this.userDb.email,
    //     image: this.userDb.image,
    //     address: {
    //       city: this.userDb.city,
    //       postalCode: this.userDb.postalCode,
    //       street: this.userDb.street,
    //     },
    //   });


  }

  ngOnInit(): void {
    this.userService.getCurrentUser().subscribe((userData => {
      this.user = userData;
      // console.log(this.user)

      this.userProfile = this.fb.group({
        fname: new FormControl(this.user?.fname, [Validators.required]),
        lname: new FormControl(this.user?.lname, [Validators.required]),
        email: new FormControl(this.user?.email, [Validators.required]),
        address: new FormGroup({
          city: new FormControl(this.user?.address.city, [Validators.required]),
          postalCode: new FormControl(this.user?.address.postalCode, [Validators.required]),
          street: new FormControl(this.user?.address.street, [Validators.required]),
        }),
        // image: new FormControl(this.user?.image, [Validators.required]),
      });

    }))

  }

  onImageSelected(event: any) {
    this.selectedImageFile = event.target.files[0];
  }


  getUserImage(path: string) {
    return this.imageService.getImageUrl(path);
  }

  updateUser() {

    const userdata = new FormData();

    // console.log(this.userProfile.value);

    Object.keys(this.userProfile).forEach((key) => {
      if (key !== 'image') {
        userdata.append(key, this.userProfile.value['key'])
      }
    })

    userdata.append('image', this.selectedImageFile);

    // todo send user data back to the server 
  }

}

//
//   update() {
//     this.subscription = this.userProfileService
//       .updateUser(this.userProfile)
//       .subscribe(
//         (newUser) => {
//           console.log('new User updated', newUser);
//           this.toastr.success('User Updated');
//         },
//         (err) => {
//           console.log('err : ', err);
//         }
//       );
//   }
