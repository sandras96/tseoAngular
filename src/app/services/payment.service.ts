import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Payment } from '../model/payment.model';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {

  private baseUrl = 'http://localhost:8080/api/payments';

  constructor(private http : HttpClient) { }

  get(pay_id : number) : Observable<any>{
    return this.http.get(`${this.baseUrl}/${pay_id}`);
  }
  update(pay_id : number, data) : Observable<any>{
    return this.http.put(`${this.baseUrl}/${pay_id}`, data);
  }
  getPaymentsByStudentId(student_id : number) : Observable<any>{
    return this.http.get(`${this.baseUrl}/student/${student_id}`);
  }
  delete(pay_id : number) : Observable<any>{
    return this.http.delete(`${this.baseUrl}/${pay_id}`);
  }
  create(payment : Payment): Observable<any>{
    return this.http.post(`${this.baseUrl}`, payment);
  }
}
