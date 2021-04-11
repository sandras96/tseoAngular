import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UploadFileService {

  private baseUrl = '/api/files';

  constructor(private http: HttpClient) { }

  upload(file: File,student_id : any): Observable<HttpEvent<any>> {
    const formData: FormData = new FormData();

    //we use formData to build an object which correspons to an HTML form with append() method
    formData.append('file', file);

    const req = new HttpRequest('POST', `${this.baseUrl}/upload/${student_id}`, formData, {
      reportProgress: true,
      responseType: 'json'
    });

    return this.http.request(req);
  }

  getFiles(student_id : any): Observable<any> {
    return this.http.get(`${this.baseUrl}/files/student/${student_id}`);
  }

  delete(file_id : number) : Observable<any>{
    return this.http.delete(`${this.baseUrl}/${file_id}`);
  }
}
