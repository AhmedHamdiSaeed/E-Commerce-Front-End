import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-address-input',
  templateUrl: './address-input.component.html',
  styleUrl: './address-input.component.css'
})
export class AddressInputComponent {
address:FormGroup;
constructor(private fb:FormBuilder)
{
  this.address=this.fb.group(
    {
      city:[''],
      postalCode:[''],
      street:['']
    }
  )
}
}
