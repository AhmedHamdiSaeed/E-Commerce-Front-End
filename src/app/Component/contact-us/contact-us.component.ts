
import { Component, OnInit } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ContactService } from '../../Services/Contact/contact.service';
@Component({
  selector: 'app-contact-us',
  templateUrl: './contact-us.component.html',
  styleUrls: ['./contact-us.component.css']
})
export class ContactUsComponent  {
  contactForm!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private contactService: ContactService
  ) { }

  ngOnInit(): void {
    this.contactForm = this.formBuilder.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      message: ['', Validators.required]
    });
  }

  onSubmit(): void {
    if (this.contactForm.invalid) {
      return;
    }

    const { name, email, message } = this.contactForm.value;
    this.contactService.sendEmail(name, email, message)
      .subscribe(
        (res) => {
          console.log('Email sent and saved successfully');
          console.log(res);
          this.contactForm.reset();
        },
        (error:any) => {
          console.log('Error sending email:', error);
         
        }
      );
  }

}