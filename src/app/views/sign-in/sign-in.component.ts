import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent implements OnInit {

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private router: Router
  ) { }

  getUserAfterSignInSub?: Subscription

  ngOnInit(): void {
  }

  formGroup = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]]
  })

  submit(e: any) {
    e.preventDefault()

    this.getUserAfterSignInSub = this.userService.getUserAfterSignIn(this.formGroup.value).subscribe(() => {
      this.router.navigate(['/candidate-list'])
    })
  }

}
