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
import { CourseService } from 'src/app/services/course.service';
import { AuthService } from 'src/app/services/auth.service';

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
  
  etForDelete : ExamTaking;
  editET : ExamTaking;

  @Input() examTakings : ExamTaking[];
  @Input() exam : Exam;
  @Output() createExamTaking = new EventEmitter<ExamTaking[]>();
  @Output() deleteExamTaking = new EventEmitter<ExamTaking[]>();
  @Output() updateExamTaking = new EventEmitter<ExamTaking[]>();

  constructor(private examTakingService : ExamTakingService,
              private courseService : CourseService,
              private professorService : ProfessorService,
              private formBuilder: FormBuilder,
              private modalService: ModalService,
              private toastr : ToastrService,
              public authService : AuthService) {}

  ngOnInit(): void {
    this.getStudents();
    this.getProfessors();
    
    console.log("this exam jee", this.exam)
    this.addForm = new FormGroup({
      exam : new FormControl(this.exam),
       mark : new FormControl('', Validators.required),
       points: new FormControl('', Validators.required),
       professor : new FormControl('', Validators.required),
       student : new FormControl('',Validators.required)
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
    this.addForm.value.exam = this.exam
    console.log("FOrm dabogsacuvaj je", this.addForm.value, this.exam)
    
    this.examTakingService.create(this.addForm.value)
      .subscribe(data=>{
        this.examTaking = data;
        this.createExamTaking.emit(data);
        this.addForm.reset();
        this.toastr.success('Examination was successfully created!', 'Success!');
        this.closeModal('createETModal2');
        
      })
  }

  removeExamTaking(exam){
    this.examTakingService.delete(exam.id)
      .subscribe(data=>{
        this.deleteExamTaking.emit(exam);
        this.closeModalDelete('deleteModal');
        this.toastr.success('Examination was susessfully deleted!', 'Success!');
      },error=>{
        console.log(error)
      })
  }
  getStudents(){
    this.courseService.getStudents(this.exam.course.id)
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
    this.addForm.reset();
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
      this.toastr.success("Examination was successfully updated!", "Success!");
      this.closeModal('editETModal');
      this.updateExamTaking.emit(data);
      console.log("edit exam taking ", data)
    })

}
  closeModal(id: string) {
    this.modalService.close(id);
    this.addForm.reset();
}
openDeleteModal(id: string, et){
  console.log("kurs za brisanje", et)
  this.modalService.open(id);
  this.etForDelete = et;
}

closeModalDelete(id: string) {
  this.modalService.close(id);
}
}

  // buildForm(){
  //   this.addForm = this.formBuilder.group({
  //      mark : ['', Validators.required],
  //      points : ['', Validators.required],
  //     exam : this.exam,
  //     professor: ['', Validators.required],
  //     student : ['', Validators.required]
  // })}