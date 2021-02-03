import { AuthService } from './../../services/auth.service';
import { catchError } from 'rxjs/operators';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ExamPeriod } from 'src/app/model/exam-period.model';
import { ExamPeriodService } from 'src/app/services/exam-period.service';
import { ModalService } from 'src/app/_modal';
import { throwError } from 'rxjs';


@Component({
  selector: 'app-exam-period-list',
  templateUrl: './exam-period-list.component.html',
  styleUrls: ['./exam-period-list.component.css']
})
export class ExamPeriodListComponent implements OnInit {
  
  submitted = false;
  addForm : FormGroup;
  @Input() examPeriods : ExamPeriod[];
  @Output() createExamPeriod = new EventEmitter<ExamPeriod[]>();
  @Output() deleteExamPeriod = new EventEmitter<ExamPeriod[]>();
  
  constructor(private examPeriodService : ExamPeriodService,
              private modalService: ModalService,
              private toastr : ToastrService,
              public authService : AuthService) { }

  ngOnInit(): void {
    
  this.addForm = new FormGroup({
     name : new FormControl('', Validators.required),
     startDate : new FormControl('', Validators.required),
     endDate : new FormControl('', [Validators.required])
    })

  }
  get f() { return this.addForm.controls; }

  onSubmit(){
    this.submitted = true;

   if (this.addForm.invalid) {
       return false;
   }
      this.addExamPeriod()
 }
  addExamPeriod(){
    console.log("forma za exam period je ", this.addForm.value)
    this.examPeriodService.create(this.addForm.value)
      .subscribe(
        data=>{
          console.log(data)
          this.createExamPeriod.emit(data);
          this.toastr.success('Exam period: ' +data.name+ ' was successfully created!', 'Success!')
          this.closeModal('createEPModal');
        }, (error : any) =>{
            if(error.status === 403){
              this.toastr.error('Exam period with the same name already exists!', 'Forbidden!')
              
            }
        }
      )
  }

  deleteExamP(examPeriod){
    this.examPeriodService.delete(examPeriod.id)
      .subscribe(data=>{
        this.deleteExamPeriod.emit(examPeriod);
        this.toastr.success('Exam period: '+ examPeriod.name + ' was successfully deleted!', "Deleted!")
      })
  }
  openModal(id: string) {
    this.modalService.open(id);
}

  closeModal(id: string) {
    this.modalService.close(id);
    this.addForm.reset();
}

retrieveExams(search){
  this.examPeriodService.findByName(search)
    .subscribe(data=>{
      this.examPeriods = data;
    })
}
}
