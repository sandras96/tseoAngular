import { CourseAttendance } from './../model/course-attendance.model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CourseAttendanceService {

  private baseUrl = 'http://localhost:8080/api/courseAttendances';

  constructor(private http: HttpClient) { }

    getAllByCourseId(course_id :number) : Observable<any>{
    return this.http.get(`${this.baseUrl}/course/${course_id}`);
  }
  create(course_id : number, student_id : number): Observable<any>{
    return this.http.post(`${this.baseUrl}/courseId/${course_id}/studentId/${student_id}`, {course_id, student_id});
  }
  
}
