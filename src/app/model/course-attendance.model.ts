import { Student } from 'src/app/model/student.model';
import { Course } from './course.model';
export class CourseAttendance {

    id : number;
    course : Course;
    student : Student;
}
