import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';

import { MustMatch } from '../../helpers/MustMatchValidator';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit, OnDestroy {

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private userService: UserService
  ) { }

  storeUserSub?: Subscription

  formGroup = this.fb.group({
    firstName: ['', [Validators.required]],
    middleName: ['', [Validators.required]],
    lastName: ['', [Validators.required]],
    date: [''],
    gender: [''],
    address: ['', [Validators.required]],
    city: ['', [Validators.required]],
    zipCode: ['', [Validators.required]],
    state: ['', [Validators.required]],
    ssn: [''],
    phoneNumber: ['', [Validators.required]],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]],
    confirmPassword: ['', [Validators.required]]
  }, {
    validator: MustMatch('password', 'confirmPassword')
  })

  ngOnInit(): void {
  }

  ngOnDestroy() {
    this.storeUserSub?.unsubscribe()
  }



  submit(e: any) {
    e.preventDefault()

    this.storeUserSub = this.userService.storeUser({
      ...this.formGroup.value
    }).subscribe(data => {
      this.formGroup.reset()
      this.router.navigate(['/candidate-list'])
    })
  }
}
