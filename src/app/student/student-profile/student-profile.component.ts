import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Student } from 'src/app/model/student.model';
import { StudentService } from 'src/app/services/student.service';
import { ModalService } from 'src/app/_modal';

@Component({
  selector: 'app-student-profile',
  templateUrl: './student-profile.component.html',
  styleUrls: ['./student-profile.component.css']
})
export class StudentProfileComponent implements OnInit {

  closeResult: string;
  @Input() student : Student;

  constructor(private studentService : StudentService,
              private router : Router,
              private toastr: ToastrService,
              private modalService: ModalService) { }

  ngOnInit(): void {
  }

  updateStudent() : void {
    this.studentService.update(this.student.id, this.student)
      .subscribe(
        response => {
          this.toastr.success("Student was successfully updated!", "Success")
          console.log("Updated student", response)
        },
        error => {
          
          console.log(error)
        }
      )
  }

  deleteStudent() : void {
    this.studentService.delete(this.student.id)
      .subscribe(
        response => {
          this.toastr.success('This Student was deleted successfully!', 'Delete')
          this.router.navigate(['/students']);
        },
        error => {
          this.toastr.error('Error!', 'Delete')
          console.log(error)
        }
      )
  }

 
  

  openModal(id: string) {
    this.modalService.open(id);
}

  closeModal(id: string) {
    this.modalService.close(id);
}
}
