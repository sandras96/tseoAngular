import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Course } from '../model/course.model';




@Injectable({
  providedIn: 'root'
})
export class CourseService {

  private baseUrl = 'http://localhost:8080/api/courses';
  
  

  constructor(private http: HttpClient) { }

  getAll(params): Observable<any>{
    return this.http.get(`${this.baseUrl}/all`, {params});
  }

  get(course_id : number) : Observable<any>{
    return this.http.get(`${this.baseUrl}/${course_id}`);
  }

  create(course : Course): Observable<any>{
    return this.http.post(`${this.baseUrl}`, course);
  }

  update(course_id : number, data) : Observable<any>{
    return this.http.put(`${this.baseUrl}/${course_id}`, data);
  }

  delete(course_id : number) : Observable<any>{
    return this.http.delete(`${this.baseUrl}/${course_id}`);
  }

  findByName(name): Observable<any> {
    return this.http.get(`${this.baseUrl}/searchByName/${name}`);
  }

  getStudents(course_id : number) : Observable<any>{
    return this.http.get(`${this.baseUrl}/student/course/${course_id}`);
  }

  getExams(course_id : number) : Observable<any>{
    return this.http.get(`${this.baseUrl}/exam/course/${course_id}`);
  }
  
}


