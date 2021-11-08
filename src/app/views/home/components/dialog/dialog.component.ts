import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { CandidateService } from 'src/app/services/candidate.service';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css']
})
export class DialogComponent implements OnInit, OnDestroy {

  constructor(
    private fb: FormBuilder,
    private candidateService: CandidateService,
  ) { }

  createCandidateSub?: Subscription
  displayModal?: boolean;

  ngOnInit(): void {

  }

  ngOnDestroy(): void {
    this.createCandidateSub?.unsubscribe()
  }

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
  })

  toggleModal() {
    this.displayModal = !this.displayModal;
  }


  submit(e: any) {
    e.preventDefault();
    this.createCandidateSub = this.candidateService.createCandidate({ ...this.formGroup.value, created: new Date() }).subscribe()
    this.formGroup.reset()
    this.toggleModal()
  }
}
