import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Observable, Subscription } from 'rxjs';
import { Location } from '@angular/common';
import { Candidate } from 'src/app/interfaces/candidate';
import { CandidateService } from 'src/app/services/candidate.service';
import { ProgramService } from '../../services/program.service';

@Component({
  selector: 'app-create-form',
  templateUrl: './create-form.component.html',
  styleUrls: ['./create-form.component.css']
})
export class CreateFormComponent implements OnInit, OnDestroy {

  constructor(
    private fb: FormBuilder,
    private candidateService: CandidateService,
    private location: Location,
    private programService: ProgramService
  ) { }

  candidates$?: Observable<any>
  postProgramSub?: Subscription

  formGroup = this.fb.group({
    candidate: [null, Validators.required],
    program: [null, Validators.required],
    date: [null, Validators.required],
    disability: [null, Validators.required]
  })

  programs = [
    { name: 'JavaScript' },
    { name: 'TypeScript' },
    { name: 'Angular & Node.js' }
  ]

  ngOnInit(): void {
    this.candidates$ = this.candidateService.getCandidates()
  }

  ngOnDestroy(): void {
    this.postProgramSub?.unsubscribe()
  }

  goBack() {
    this.location.back()
  }

  submit() {
    this.postProgramSub = this.programService.postProgram(this.formGroup.value).subscribe(data => {
      console.log(data)
      this.formGroup.reset()
      this.goBack()

    })
  }

}
