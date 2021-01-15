import { Exam } from './exam.model';
import { Professor } from './professor.model';
import { Student } from './student.model';
export class ExamTaking {

    id : number;
    mark : number;
    pass : boolean;
    points : number;
    exam : Exam;
    professor: Professor;
    student : Student;
}
