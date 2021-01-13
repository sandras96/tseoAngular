import { Professor } from './professor.model';
import { Student } from './student.model';
export class ExamTaking {

    exam_taking_id : number;
    mark : number;
    pass : boolean;
    points : number;
    exam_id : number;
    professor: Professor;
    student : Student;
}
