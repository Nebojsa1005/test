import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AuthUser } from '../interfaces/auth-user';
import { User } from '../interfaces/user';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private http: HttpClient
  ) { }

  apiKey: string = 'AIzaSyCMoho95PbLFNv-dGep3Rfp2UFCtGGaGTo'
  signUpUrl: string = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key='
  signInUrl: string = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key='

  errorMessage = new BehaviorSubject('')

  signUpUser(userData: AuthUser) {
    return this.http.post<any>(this.signUpUrl + this.apiKey, {
      email: userData.email,
      password: userData.password,
      returnSecureToken: true
    }).pipe(
      catchError((err: any): any => {
        const message = err.error.error.message.split('_')
        message.forEach((word: string) => {
          word.toLowerCase()
          word[0].toUpperCase()
        })
        this.errorMessage.next(message.join(' '))
      }))
  }

  signInUser(data: AuthUser) {
    return this.http.post<any>(this.signInUrl + this.apiKey, {
      email: data.email,
      password: data.password,
      returnSecureToken: true
    }).pipe(
      catchError((err: any): any => {
        const message = err.error.error.message.split('_')
        message.forEach((word: string) => {
          word.toLowerCase()
          word[0].toUpperCase()
        })
        this.errorMessage.next(message.join(' '))
      }))
  }
}
