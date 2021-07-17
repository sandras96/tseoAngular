
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
   
import {  Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Student } from '../model/student.model';

@Injectable({
  providedIn: 'root'
})
export class StudentService {

  private baseUrl = "http://localhost:8080/api/students";
   
  
  
  constructor(private http: HttpClient) { }
   
  getAll(): Observable<any>{
    return this.http.get(`${this.baseUrl}/all`);
  }
   
  get(student_id : number) : Observable<any>{
    return this.http.get(`${this.baseUrl}/${student_id}`);
  }

  create(student : Student): Observable<any>{
    return this.http.post(`${this.baseUrl}`, student);
  }
   
  update(student_id : number, data) : Observable<any>{
    return this.http.put(`${this.baseUrl}/${student_id}`, data);
  }
   
  delete(student_id : number) : Observable<any>{
    return this.http.delete(`${this.baseUrl}/${student_id}`);
  }
    
  getByUserId(user_id : number) : Observable<any>{
    return this.http.get(`${this.baseUrl}/user/${user_id}`);
  }
  
  findByFirstname(firstname): Observable<any> {
    return this.http.get(`${this.baseUrl}/searchByFirstname/${firstname}`);
  }
  findByLastname(lastname): Observable<any> {
    return this.http.get(`${this.baseUrl}/searchByLastname/${lastname}`);
  }
  findByIndexnumber(indexnum): Observable<any> {
    return this.http.get(`${this.baseUrl}/searchByIndexnumber/${indexnum}`);
  }

  signUpExam(data, student_id) : Observable<any>{
    return this.http.put(`${this.baseUrl}/signExam/${student_id}`, data);
  }
}