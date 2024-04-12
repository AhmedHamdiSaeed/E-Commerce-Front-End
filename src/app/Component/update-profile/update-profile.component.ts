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
import { IndividualConfig, ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { formatDate } from '@angular/common';

@Component({
  selector: 'app-update-profile',
  templateUrl: './update-profile.component.html',
  styleUrl: './update-profile.component.css',
})
export class UpdateProfileComponent implements OnInit,OnDestroy{
  user: any;
  userProfile!: FormGroup;
  isLoading: boolean = false;
  initValues:any
  selectedImageFile!: File;
  imageURL:any;
  subscriptions:Subscription[]=[]
  // url: any;
  toastr = inject(ToastrService);
  constructor(
    private fb: FormBuilder,
    private userService: UserProfileService,
    private imageService: ImageService,
    
  ) {
    const toastrConfig: Partial<IndividualConfig> = {
      positionClass: 'toast-bottom-full-width', // Set position to bottom of the page
      closeButton: true // Enable close button on toastr
    };

    this.isLoading=true;
      this.userProfile =  this.fb.group({
        fname:['',[Validators.maxLength(10),Validators.minLength(3),Validators.pattern('^[A-Za-z]+$'),Validators.required]],
        lname:['',[Validators.maxLength(10),Validators.minLength(3),Validators.pattern('^[A-Za-z]+$'),Validators.required]],
        email: ['',[Validators.required,Validators.email],],
        address: this.fb.group({
          city: ['',[Validators.maxLength(10),Validators.minLength(3),Validators.pattern('^[A-Za-z]+$')]],
          postalCode: ['',[Validators.pattern('^[0-9A-Za-z]+$'),Validators.minLength(3),Validators.maxLength(10)]],
          street: ['',[Validators.pattern('^[0-9A-Za-z]+$'),Validators.minLength(3),Validators.maxLength(10)]],
        }),
        image: [''],
      });

  }
  ngOnDestroy(): void {
    this.subscriptions.forEach(s => s.unsubscribe());
  }
  ngOnInit(): void {
    this.subscriptions.push(this.userService.getCurrentUser().subscribe((userData => {
      this.user = userData;
      this.userProfile.patchValue({
        fname:this.user?.fname,
        lname:this.user?.lname,
        email: this.user?.email,
        address:{
          city: this.user?.address.city,
          postalCode: this.user?.address.postalCode,
          street: this.user?.address.street,
        },
     
      })
      this.imageURL=this.getUserImage(this.user.image)
      this.isLoading=false;
      this.initValues=this.userProfile.value;
    })))  
  
    
  }

  onImageSelected(event: any) {
    this.selectedImageFile = event.target.files[0];
    const reader=new FileReader();
    reader.readAsDataURL(event.target.files[0]);
    reader.onload=(event)=>{
      this.imageURL=event.target?.result;
    }
  }
  get isValuesChanged()
  {
    return JSON.stringify(this.initValues)!==JSON.stringify(this.userProfile.value)
  }
  get canNotUpdate()
  {
    if(!(this.isValuesChanged))return true;
    if (this.userProfile.invalid)return true;
    else return false
  }
  getUserImage(path: string) {
    return this.imageService.getImageUrl(path);
  }
  
  updateUser() {
    const userData=new FormData();
    userData.append('fname',this.userProfile.value.fname);
    userData.append('lname',this.userProfile.value.lname);
    userData.append('email',this.userProfile.value.email);
    userData.append('address[city]',this.userProfile.get('address.city')?.value);
    userData.append('address[postalCode]',this.userProfile.get('address.postalCode')?.value==undefined ? '': this.userProfile.get('address.postalCode')?.value);
    userData.append('address[street]',this.userProfile.get('address.street')?.value);
    if(this.selectedImageFile)
    userData.append('image',this.selectedImageFile);
    this.subscriptions.push(this.userService
    .updateUser(userData)
    .subscribe(
      (newUser) => {
        this.toastr.success('User Updated');
        this.initValues=this.userProfile.value;
      },
      (err) => {
        console.log('err : ', err);
      }
    ));

  }
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
  get city()
  {
    return this.userProfile.get('address.city');
  }
  get postalCode()
  {
    return this.userProfile.get('address.postalCode');
  }
  get street()
  {
    return this.userProfile.get('address.street');
  }

}

