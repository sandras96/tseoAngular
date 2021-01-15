import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Student } from 'src/app/model/student.model';
import { StudentService } from 'src/app/services/student.service';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';

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
              private modalService: NgbModal) { }

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

  open(content) {

    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {

      this.closeResult = `Closed with: ${result}`;
      console.log("result je " + result)

    }, (reason) => {

      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;

    });

  }

  

  private getDismissReason(reason: any): string {

    if (reason === ModalDismissReasons.ESC) {

      return 'by pressing ESC';

    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {

      return 'by clicking on a backdrop';

    } else {

      return  `with: ${reason}`;

    }

  }
}
