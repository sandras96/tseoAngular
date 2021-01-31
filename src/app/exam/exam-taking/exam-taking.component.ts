import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ExamTaking } from 'src/app/model/exam-taking.model';
import { FormGroup, FormBuilder, FormControl, Validators} from '@angular/forms';
import { ModalService } from 'src/app/_modal';
import { Professor } from 'src/app/model/professor.model';
import { Student } from 'src/app/model/student.model';
import { ProfessorService } from 'src/app/services/professor.service';
import { StudentService } from 'src/app/services/student.service';
import { Exam } from 'src/app/model/exam.model';
import { ExamTakingService } from 'src/app/services/exam-taking.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-exam-taking',
  templateUrl: './exam-taking.component.html',
  styleUrls: ['./exam-taking.component.css']
})
export class ExamTakingComponent implements OnInit {

  addForm : FormGroup;
  submitted = false;
  date;
  studentsAll : Student[];
  professorsAll : Professor[];
  professorId : number;
  examTaking = new ExamTaking;
  
  editET : ExamTaking;

  @Input() examTakings : ExamTaking[];
  @Input() exam : Exam;
  @Output() createExamTaking = new EventEmitter<ExamTaking[]>();
  @Output() deleteExamTaking = new EventEmitter<ExamTaking[]>();

  constructor(private examTakingService : ExamTakingService,
              private studentService : StudentService,
              private professorService : ProfessorService,
              private formBuilder: FormBuilder,
              private modalService: ModalService,
              private toastr : ToastrService) {}

  ngOnInit(): void {
    this.getStudents();
    this.getProfessors();
    this.addForm = this.formBuilder.group({
      id : [],
      mark : ['', Validators.required],
      pass : ['', Validators.required],
      points : ['', Validators.required],
      exam : this.exam,
      professor: ['', Validators.required],
      student : ['', Validators.required]
    })
  
  }
  get f() { return this.addForm.controls; }

  onSubmit(){
     this.submitted = true;

    if (this.addForm.invalid) {
        return false;
    }
       this.addExamTaking()
  }

  addExamTaking(){
    console.log("FOrm dabogsacuvaj je", this.addForm)
    this.examTakingService.create(this.addForm.value)
      .subscribe(data=>{
        this.examTaking = data;
        this.createExamTaking.emit(data);
        this.addForm.reset();
        this.toastr.success('Success', 'Success!');
        this.closeModal('createETModal');
        console.log("Examtaking dabogsacuvaj je", data)
      })
  }

  removeExamTaking(exam){
    this.examTakingService.delete(exam.id)
      .subscribe(data=>{
        this.deleteExamTaking.emit(exam);
        
      },error=>{
        console.log(error)
      })
  }
  getStudents(){
    this.studentService.getAll()
      .subscribe(data=>{
        this.studentsAll = data;
      },error=>{
        console.log(error)
      })
  }
  getProfessors(){
    this.professorService.getAllByCourseId(this.exam.course.id)
      .subscribe(data=>{
        this.professorsAll = data;
      },error=>{
        console.log(error)
      })
  }
  openModal(id: string) {
    this.modalService.open(id);
}
openModalEdit(id: string, etId : number) {
  this.modalService.open(id);
   this.getEditET(etId);
}

  getEditET(id){
    this.examTakingService.get(id)
      .subscribe(data=>{
        this.editET = data;
      },error=>{
        console.log(error)
      })
} 

editExamTaking(){
  this.examTakingService.update(this.editET.id, this.editET)
    .subscribe(data=>{
      console.log("edit exam taking ", data)
    })

}
  closeModal(id: string) {
    this.modalService.close(id);
}

}
