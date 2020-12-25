import { Student } from './../model/student.model';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
   
import {  Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class StudentService {

  private apiURL = "http://localhost:8080/api/students";
   
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }
  
  constructor(private httpClient: HttpClient) { }
   
  getAll(): Observable<Student[]> {
    return this.httpClient.get<Student[]>(this.apiURL + '/all')
    .pipe(
      catchError(this.errorHandler)
    )
  }
   
  create(student): Observable<Student> {
    return this.httpClient.post<Student>(this.apiURL + '/', JSON.stringify(student), this.httpOptions)
    .pipe(
      catchError(this.errorHandler)
    )
  }  
   
  find(id): Observable<Student> {
    return this.httpClient.get<Student>(this.apiURL + '/' + id)
    .pipe(
      catchError(this.errorHandler)
    )
  }
   
  update(id, student): Observable<Student> {
    return this.httpClient.put<Student>(this.apiURL + '/' + id, JSON.stringify(student), this.httpOptions)
    .pipe(
      catchError(this.errorHandler)
    )
  }
   
  delete(id){
    return this.httpClient.delete<Student>(this.apiURL + '/posts/' + id, this.httpOptions)
    .pipe(
      catchError(this.errorHandler)
    )
  }
    
  
  errorHandler(error) {
    let errorMessage = '';
    if(error.error instanceof ErrorEvent) {
      errorMessage = error.error.message;
    } else {
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    return throwError(errorMessage);
 }
}