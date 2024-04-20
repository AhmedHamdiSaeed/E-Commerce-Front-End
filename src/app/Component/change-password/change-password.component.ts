import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Toast, ToastrService } from 'ngx-toastr';
import { UserProfileService } from '../../Services/UserProfile/user-profile.service';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrl: './change-password.component.css'
})
export class ChangePasswordComponent {
  changePassword:FormGroup;
  showPassword:boolean=false;
  constructor(private toastr:ToastrService,private fb:FormBuilder,private userProfileService:UserProfileService)
  {
   
    this.changePassword=this.fb.group(
      {
        password:['',[Validators.required,Validators.pattern("^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$")]],
        passwordConfirm:['',[Validators.required]]
      }
      ,{
        validators:this.MustMatch});
    
}
 MustMatch(group:FormGroup) {
    const password=group.get('password');
    const confirmPass=group.get('passwordConfirm');
    if(password?.value !== confirmPass?.value)
      {
        confirmPass?.setErrors({mustMatch:true})
        return {mismatch:true};
      }
      else
      {
        confirmPass?.setErrors(null);
        return null;
      }
  }

  onCheckboxChange()
  {
    this.showPassword=!this.showPassword;
  }
  changePass()
  {
    // console.log("password : ",this.changePassword.get('password')?.value)
    const formData=new FormData();
    formData.append('password',this.changePassword.get('password')?.value);
    this.userProfileService.updateUser(formData).subscribe(res=>{this.toastr.success('Your password has been successfully updated');
    this.changePassword.get('password')?.setValue('')
    this.changePassword.get('passwordConfirm')?.setValue('')
    });


  }
}

