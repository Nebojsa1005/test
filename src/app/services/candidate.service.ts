import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { Candidate } from '../interfaces/candidate'
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class CandidateService {

  constructor(
    private http: HttpClient,
    private usersService: UserService
  ) { }


  candidatesDbUrl: string = 'https://test-angular-7d768-default-rtdb.firebaseio.com/candidates'
  candidateList = new BehaviorSubject<Candidate[]>([])



  getCandidates() {
    return this.http.get<Candidate>(`${this.candidatesDbUrl}.json?auth=${this.usersService.currentToken}`).pipe(map((data: any) => {
      let result: Candidate[] = []

      for (let key in data) {
        result.push({
          firstName: data[key].firstName,
          middleName: data[key].middleName,
          lastName: data[key].lastName,
          date: data[key].data,
          gender: data[key].gender,
          address: data[key].address,
          city: data[key].city,
          ssn: data[key].ssn,
          state: data[key].state,
          zipCode: data[key].zipCode,
          phoneNumber: data[key].phoneNumber,
          email: data[key].email,
          fullName: data[key].firstName + ' ' + data[key].lastName,
          id: key,
          created: data[key].created
        })
      }
      this.candidateList.next(result)
      return result
    }))
  }

  createCandidate(candidateData: Candidate) {
    return this.http.post<Candidate>(`${this.candidatesDbUrl}.json?auth=${this.usersService.currentToken}`, candidateData)
      .pipe(switchMap(data => {
        return this.getCandidates()
      }))
  }

  getCurrentCandidate(id: string) {
    return this.http.get<any>(`${this.candidatesDbUrl}/${id}.json?auth=${this.usersService.currentToken}`)
      .pipe(map(data => {
        return { ...data, id: id }
      }))
  }

  editCandidate(data: Candidate) {
    return this.http.put<any>(`${this.candidatesDbUrl}/${data.id}.json?auth=${this.usersService.currentToken}`, data)

  }
}
