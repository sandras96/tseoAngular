import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../model/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private baseUrl = 'http://localhost:8080/api/users';

  constructor(private http : HttpClient) { }

  getAll(): Observable<any>{
    return this.http.get(`${this.baseUrl}/all`);
  }

  get(user_id : number) : Observable<any>{
    return this.http.get(`${this.baseUrl}/${user_id}`);
  }

  create(user : User): Observable<any>{
    return this.http.post(`${this.baseUrl}`, user);
  }

  update(user_id : number, data) : Observable<any>{
    return this.http.put(`${this.baseUrl}/${user_id}`, data);
  }

  delete(user_id : number) : Observable<any>{
    return this.http.delete(`${this.baseUrl}/${user_id}`);
  }

  getByStudentId(student_id : number) : Observable<any>{
    return this.http.get(`${this.baseUrl}/student/${student_id}`);
  }
              
}
