import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ExamRegisterService {

  private baseUrl = 'http://localhost:8080/api/registerexam';

  constructor(private http: HttpClient) { }

  getAllRegistered(student_id : number) : Observable<any>{
    return this.http.get(`${this.baseUrl}/student/${student_id}`);
  }

  signUpExam(data, student_id) : Observable<any>{
    return this.http.put(`${this.baseUrl}/${student_id}`, data);
  }
}
