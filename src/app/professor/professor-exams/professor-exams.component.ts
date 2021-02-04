import { ModalService } from 'src/app/_modal';
import { AuthService } from './../../services/auth.service';
import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { ExamTaking } from 'src/app/model/exam-taking.model';
import { ExamTakingService } from 'src/app/services/exam-taking.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-professor-exams',
  templateUrl: './professor-exams.component.html',
  styleUrls: ['./professor-exams.component.css']
})
export class ProfessorExamsComponent implements OnInit {

  eTakingForDelete : ExamTaking;
  @Input() examtakings : ExamTaking;
  @Output() deleteExamTaking = new EventEmitter<ExamTaking[]>();
  constructor(private examTakingService : ExamTakingService,
              public authService : AuthService,
              private toastr : ToastrService,
              private modalService : ModalService) { }

  ngOnInit(): void {
  }

  removeExamTaking(et){
    this.examTakingService.delete(et.id)
      .subscribe(data=>{
        this.deleteExamTaking.emit(et);
        this.closeModal('deleteModal')
        this.toastr.success('Exam taking was susessfully deleted!', 'Success!');
      },error=>{
        console.log(error)
      })
  }

  toggleWithGreeting(tooltip, greeting: string) {
    if (tooltip.isOpen()) {
      tooltip.close();
    } else {
      tooltip.open({greeting});
    }
  }

  openDeleteModal(id: string, et){
    console.log("kurs za brisanje", et)
    this.modalService.open(id);
    this.eTakingForDelete = et;
  }
  closeModal(id: string) {
    this.modalService.close(id);
}
}
