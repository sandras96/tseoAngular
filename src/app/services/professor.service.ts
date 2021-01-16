import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Professor } from '../model/professor.model';

@Injectable({
  providedIn: 'root'
})
export class ProfessorService {

  private baseUrl = 'http://localhost:8080/api/professors';

  constructor(private http: HttpClient) { }

   getAll(): Observable<any>{
    return this.http.get(`${this.baseUrl}/all`);
  }
  get(professor_id : number) : Observable<any>{
    return this.http.get(`${this.baseUrl}/${professor_id}`);
  }

  create(professor : Professor): Observable<any>{
    return this.http.post(`${this.baseUrl}`, professor);
  }

  update(professor_id : number, data) : Observable<any>{
    return this.http.put(`${this.baseUrl}/${professor_id}`, data);
  }

  delete(professor_id : number) : Observable<any>{
    return this.http.delete(`${this.baseUrl}/${professor_id}`);
  }

  getAllByCourseId(professor_id : number) : Observable<any>{
    return this.http.get(`${this.baseUrl}/course/${professor_id}`);
  }

  getAllCoursesByProfId(professor_id :number) : Observable<any>{
    return this.http.get(`${this.baseUrl}/profcourse/${professor_id}`);
  }

  getAllExamTakingsByProfId(professor_id :number) : Observable<any>{
    return this.http.get(`${this.baseUrl}/profExam/${professor_id}`);
  }
  getByUserId(user_id : number) : Observable<any>{
    return this.http.get(`${this.baseUrl}/user/${user_id}`);
  }
  removeCourseProfessor(professor_id : number, course_id) : Observable<any>{
    return this.http.delete(`${this.baseUrl}/profcourse/${professor_id}/${course_id}`);
  }
}
