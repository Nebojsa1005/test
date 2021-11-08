import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Observable, Subscription } from 'rxjs';
import { Candidate } from 'src/app/interfaces/candidate';
import { CandidateService } from 'src/app/services/candidate.service';

@Component({
  selector: 'app-candidate-list',
  templateUrl: './candidate-list.component.html',
  styleUrls: ['./candidate-list.component.css']
})
export class CandidateListComponent implements OnInit, OnDestroy {

  constructor(
    private fb: FormBuilder,
    private candidateService: CandidateService
  ) { }

  candidates$?: Observable<Candidate[]>
  getCandidatesSub?: Subscription

  ngOnInit(): void {
    this.getCandidatesSub = this.candidateService.getCandidates().subscribe()
    this.candidates$ = this.candidateService.candidateList
  }

  ngOnDestroy(): void {
    this.getCandidatesSub?.unsubscribe()

  }
}
