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

  create(examPeriod : ExamPeriod): Observable<any>{
    return this.http.post(`${this.baseUrl}`, examPeriod);
  }
}
