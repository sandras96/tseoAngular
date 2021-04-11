import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FinancialCardService {

  private baseUrl = 'http://localhost:8080/api/financialCard';

  constructor(private http : HttpClient ) { }

  getByStudent(student_id : number) : Observable<any>{
    return this.http.get(`${this.baseUrl}/student/${student_id}`);
  }
}
