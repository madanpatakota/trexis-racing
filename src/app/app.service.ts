import { EventEmitter, Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { member } from './member.model';
import { Observable, Subject, Subscription } from 'rxjs';
import { ThrowStmt } from '@angular/compiler';



@Injectable({
  providedIn: 'root'
})
export class AppService {

  api = 'http://localhost:8000';
  username: string = '';

  openModelUp = new Subject<any>();
  editEvent = new Subject<any>();
  modelPopupClose = new EventEmitter<void>();

  constructor(private http: HttpClient) { }

  // Returns all members
  public getMembers():Observable<any> {
    return this.http
      .get(`${this.api}/members`)
      .pipe(catchError(this.handleError));
  }

  public getTeams():Observable<any>{
    return this.http
    .get(`${this.api}/teams`)
    .pipe(catchError(this.handleError));
  }

  public editMember(member:member,  id:number){
     return this.http.put("http://localhost:8000/members/"+ id , member);
  }

  public insertMember(member:member){
    return this.http.post('http://localhost:8000/members' , member);
 }

 public RemoveMember(member:member){
  return this.http.delete(`${this.api}/members/`+member.id);
 }

  setUsername(name: string): void {
    this.username = name;
  }

    routerStatus = new Subject<any>();

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      console.error('An error occurred:', error.error.message);
    } else {
      console.error(
        `Backend returned code ${error.status}, ` + `body was: ${error.error}`
      );
    }
    return [];
  }
}
