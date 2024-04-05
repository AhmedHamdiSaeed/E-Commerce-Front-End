import { Component, OnDestroy, inject } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { UserProfileService } from '../../Services/UserProfile/user-profile.service';
import { Subscription } from 'rxjs';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-update-profile',
  templateUrl: './update-profile.component.html',
  styleUrl: './update-profile.component.css',
})
export class UpdateProfileComponent implements OnDestroy {
  userDb: any;
  userProfile: FormGroup;
  isLoading: boolean = false;
  url: any;
  toastr = inject(ToastrService);
  constructor(
    private userProfileService: UserProfileService,
    private formBuilder: FormBuilder,
    private subscription: Subscription,
    private fb: FormBuilder
  ) {
    this.isLoading = true;
    this.userProfile = fb.group({
      fname: [''],
      lname: [''],
      email: [''],
      address: formBuilder.group({
        city: [''],
        postalCode: [''],
        street: [''],
      }),
      image: [''],
    });
    this.userProfileService.getCurrentUser().subscribe((user) => {
      console.log('user', user);
      this.userDb = user;
      const { fname, lname, email, address, image } = this.userDb;
      this.userProfile.patchValue({
        fname: this.userDb.fname,
        lname: this.userDb.lname.value,
        email: this.userDb.email,
        image: this.userDb.image,
        address: {
          city: this.userDb.city,
          postalCode: this.userDb.postalCode,
          street: this.userDb.street,
        },
      });

      this.isLoading = false;
    });
  }
  setURL(e: any) {
    const reader = new FileReader();
    reader.readAsDataURL(e.target.files[0]);
    reader.onload = (p) => {
      this.url = p;
    };
  }
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  get fname() {
    return this.userProfile.get('fname');
  }
  get lname() {
    return this.userProfile.get('lname');
  }
  get email() {
    return this.userProfile.get('email');
  }
  get image() {
    return this.userProfile.get('image');
  }
  get city() {
    return this.userProfile.get('city');
  }
  get postalCode() {
    return this.userProfile.get('postalCode');
  }
  get street() {
    return this.userProfile.get('street');
  }
  update() {
    this.subscription = this.userProfileService
      .updateUser(this.userProfile)
      .subscribe(
        (newUser) => {
          console.log('new User updated', newUser);
          this.toastr.success('User Updated');
        },
        (err) => {
          console.log('err : ', err);
        }
      );
  }
}
