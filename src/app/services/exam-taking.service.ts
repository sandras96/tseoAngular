import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ExamTakingService {
  
  private baseUrl = 'http://localhost:8080/api/examtakings';

  constructor(private http : HttpClient) { }

  getAllByExamId(exam_id : number) : Observable<any>{
    return this.http.get(`${this.baseUrl}/exam/${exam_id}`);
  }
}
