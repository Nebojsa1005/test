import { Injectable } from '@angular/core';
import { User } from '../interfaces/user';
import { AuthService } from './auth.service';
import { map, switchMap } from 'rxjs/operators'
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { AuthUser } from '../interfaces/auth-user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(
    private authService: AuthService,
    private http: HttpClient
  ) {
    this.isLoggedIn$ = this.currentUser$.pipe(map(user => !!user))
    this.isLoggedOut$ = this.isLoggedIn$?.pipe(map(loggedIn => !loggedIn))
  }

  usersDbUrl: string = 'https://test-angular-7d768-default-rtdb.firebaseio.com/users.json?auth='

  isLoggedIn$?: Observable<boolean>
  isLoggedOut$?: Observable<boolean>

  currentToken?: string
  currentUser = new BehaviorSubject(null)
  currentUser$: Observable<any> = this.currentUser.asObservable()

  storeUser(data: User) {
    return this.authService.signUpUser({
      email: data.email,
      password: data.password
    }).pipe(switchMap(user => {
      this.currentToken = user.idToken
      this.currentUser.next(user)
      return this.http.post<any>(this.usersDbUrl + this.currentToken, data)
    }))
  }

  getUserAfterSignIn(userData: AuthUser) {
    return this.authService.signInUser(userData).pipe(switchMap(user => {
      this.currentToken = user.idToken
      return this.http.get<any>(`${this.usersDbUrl}${this.currentToken}`).pipe(map(data => {
        let user
        for (let key in data) {
          if (data[key].email === userData.email) {
            user = data[key]
            user.id = key
            this.currentUser.next(user)
          }
        }
      }))
    }))
  }
}


