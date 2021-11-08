import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { CandidateService } from 'src/app/services/candidate.service';
import { Location } from '@angular/common';
import { Candidate } from 'src/app/interfaces/candidate';

@Component({
  selector: 'app-candidate-edit',
  templateUrl: './candidate-edit.component.html',
  styleUrls: ['./candidate-edit.component.css']
})
export class CandidateEditComponent implements OnInit {

  constructor(
    private fb: FormBuilder,
    private candidateService: CandidateService,
    private route: ActivatedRoute,
    private location: Location
  ) { }

  editCandidateSub?: Subscription
  candidateId: string = ''
  currentCandidate?: Candidate

  ngOnInit(): void {
    this.candidateId = this.route.snapshot.params.id
    this.candidateService.getCurrentCandidate(this.candidateId).subscribe((candidate: any) => {
      this.currentCandidate = candidate
      console.log(this.currentCandidate);

      this.formGroup.setValue({
        firstName: candidate.firstName,
        middleName: candidate.middleName,
        lastName: candidate.lastName,
        date: candidate.date,
        gender: candidate.gender,
        address: candidate.address,
        city: candidate.city,
        zipCode: candidate.zipCode,
        state: candidate.state,
        ssn: candidate.ssn,
        phoneNumber: candidate.phoneNumber,
        email: candidate.email,
      })
    })

  }

  ngOnDestroy(): void {
    this.editCandidateSub?.unsubscribe()

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


  submit(e: any) {
    e.preventDefault();
    console.log(this.formGroup.value);

    this.editCandidateSub = this.candidateService.editCandidate({ ...this.formGroup.value, id: this.candidateId }).subscribe(() => {
      this.formGroup.reset()
      this.goBack()
    }
    )
  }

  goBack() {
    this.location.back()
  }
}
