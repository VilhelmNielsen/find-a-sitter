import { UsersService } from './../users.service';
import { AuthService } from './../auth.service';
import { Router } from '@angular/router';
import { Sitter } from './../entities/sitter';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Baby } from '../entities/baby';
import { UsersActions } from '../users.actions';
import { NgRedux } from '@angular-redux/store';
import { IAppState } from '../store/store';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;
  isBaby: boolean;
  babies: Baby[];
  

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private authService: AuthService,
    private ngRedux: NgRedux<IAppState>,
    private usersService: UsersService,
    private usersActions: UsersActions
  ) {
  }

  onSubmit(form) {
    if (form.valid) {
      const user = form.value;
      user.birthDate = new Date(user.birthDate);
      const baby: Baby = user as Baby;
      this.usersActions.addBaby(baby);
    } else {
      // Error handling
      alert('The form is invalid!');
    }
  }

  findAge(form) {
    /* Find current age */
    const dob = form.value.birthDate;
    const today = new Date();
    const birthDate = new Date(dob);
    let age = today.getFullYear() - birthDate.getFullYear();
    const m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
  }

  ngOnInit() {
    this.ngRedux.select(state => state.users).subscribe(res => {
      this.isBaby = res.isBaby;
      this.babies = res.babies;
    });

    /* this.registerForm = this.fb.group({
      userName: ['', Validators.required],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      birthDate: ['', Validators.required],
      area: ['', Validators.required],
      gender: ['', Validators.required],
      rate: [0, Validators.required],
      typeOfUser: 'baby',
      isAdmin: false
    }); */

    this.registerForm = this.fb.group({
      userName: ['oliver', Validators.required],
      firstName: ['Oliver', Validators.required],
      lastName: ['Kirschberg', Validators.required],
      birthDate: [new Date(2017, 5, 17), Validators.required],
    });
  }

}
