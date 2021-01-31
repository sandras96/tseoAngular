import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ExamTaking } from '../model/exam-taking.model';

@Injectable({
  providedIn: 'root'
})
export class ExamTakingService {
  
  private baseUrl = 'http://localhost:8080/api/examtakings';

  constructor(private http : HttpClient) { }

  get(examTaking_id : number) : Observable<any>{
    return this.http.get(`${this.baseUrl}/${examTaking_id}`);
  }
  create(examTaking : ExamTaking): Observable<any>{
    return this.http.post(`${this.baseUrl}`, examTaking);
  }
  update(examTaking_id : number, data) : Observable<any>{
    return this.http.put(`${this.baseUrl}/${examTaking_id}`, data);
  }
  delete(examTaking_id : number) : Observable<any>{
    return this.http.delete(`${this.baseUrl}/${examTaking_id}`);
  }
  getAllByExamId(exam_id : number) : Observable<any>{
    return this.http.get(`${this.baseUrl}/exam/${exam_id}`);
  }
  getAllByStudentId(student_id : number) : Observable<any>{
    return this.http.get(`${this.baseUrl}/student/${student_id}`);
  }
}
