import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-register-sitter',
  templateUrl: './register-sitter.component.html',
  styleUrls: ['./register-sitter.component.scss']
})
export class RegisterSitterComponent implements OnInit {

  registerSitterForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.registerSitterForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      birthDate: ['', Validators.required],
      area: ['', Validators.required],
      gender: ['', Validators.required],
      rate: [0, Validators.required]
    });
  }

  onSubmit(form) {
    /* Find current age */
    var dob = form.value.birthDate
    var today = new Date()
    var birthDate = new Date(dob)
    var age = today.getFullYear() - birthDate.getFullYear()
    var m = today.getMonth() - birthDate.getMonth()
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
        age--
    }
    console.log(age);
    if(form.valid) {
      // Send a request
    } else {
      // Error handling
    }
  }

  ngOnInit() {
  }

}
