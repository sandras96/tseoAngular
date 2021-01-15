import { CourseAttendance } from './../model/course-attendance.model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Course } from '../model/course.model';

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
  getStudentsNotInCourse(course_id:number) : Observable<any>{
    return this.http.get(`${this.baseUrl}/studentNotIn/${course_id}`);
  }
  delete(student_id : number, course : Course) : Observable<any>{
    return this.http.delete(`${this.baseUrl}/${student_id}/${course.id}`);
  }
}
