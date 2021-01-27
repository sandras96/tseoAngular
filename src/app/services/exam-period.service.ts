import { ExamPeriod } from './../model/exam-period.model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ExamPeriodService {

  private baseUrl = 'http://localhost:8080/api/examPeriods';
  
  constructor(private http: HttpClient) { }

  getAll(): Observable<any>{
    return this.http.get(`${this.baseUrl}/all`);
  }
  get(examPeriod_id : number) : Observable<any>{
    return this.http.get(`${this.baseUrl}/${examPeriod_id}`);
  }
  update(examPeriod_id : number, data) : Observable<any>{
    return this.http.put(`${this.baseUrl}/${examPeriod_id}`, data);
  }
  delete(examPeriod_id : number) : Observable<any>{
    return this.http.delete(`${this.baseUrl}/${examPeriod_id}`);
  }
  create(examPeriod : ExamPeriod): Observable<any>{
    return this.http.post(`${this.baseUrl}`, examPeriod);
  }
}
