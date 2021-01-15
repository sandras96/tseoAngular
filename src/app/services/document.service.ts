import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DocumentService {

  private baseUrl = 'http://localhost:8080/api/documents';

  constructor(private http : HttpClient) { }

  getDocumentsByStudentId(student_id : number) : Observable<any>{
    return this.http.get(`${this.baseUrl}/student/${student_id}`);
  }
  delete(doc_id : number) : Observable<any>{
    return this.http.delete(`${this.baseUrl}/${doc_id}`);
  }
}
