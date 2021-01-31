import { Course } from "./course.model";
import { ExamPeriod } from "./exam-period.model";

export class Exam {

    id : number;
    assignment : String;
    date : Date;
    points: number;
    course : Course;
    examPeriod : ExamPeriod;

    
}
