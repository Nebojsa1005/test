import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Program } from 'src/app/interfaces/program';
import { UserService } from 'src/app/services/user.service';

@Injectable({
  providedIn: 'root'
})
export class ProgramService {

  constructor(
    private http: HttpClient,
    private userService: UserService
  ) { }

  programDbUrl: string = 'https://test-angular-7d768-default-rtdb.firebaseio.com/programs.json'


  postProgram(program: Program) {
    return this.http.post<Program>(`${this.programDbUrl}?auth=${this.userService.currentToken}`, program)
  }
}
