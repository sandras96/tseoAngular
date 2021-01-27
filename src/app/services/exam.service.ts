import { Exam } from './../model/exam.model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ExamService {

  private baseUrl = 'http://localhost:8080/api/exams';
  
  constructor(private http: HttpClient) { }

  getAll(): Observable<any>{
    return this.http.get(`${this.baseUrl}/all`);
  }

  get(exam_id : number) : Observable<any>{
    return this.http.get(`${this.baseUrl}/${exam_id}`);
  }

  create(exam : Exam, course_id : number, ep_id : number): Observable<any>{
    return this.http.post(`${this.baseUrl}/${course_id}/${ep_id}`, exam);
  }
  createExam(exam : Exam): Observable<any>{
    return this.http.post(`${this.baseUrl}`, exam);
  }

  update(exam_id : number, data) : Observable<any>{
    return this.http.put(`${this.baseUrl}/${exam_id}`, data);
  }

  delete(exam_id : number) : Observable<any>{
    return this.http.delete(`${this.baseUrl}/${exam_id}`);
  }

  getByExamPeriodId(examPeriod_id : number) : Observable<any>{
    return this.http.get(`${this.baseUrl}/examPeriod/${examPeriod_id}`);
  }
}
