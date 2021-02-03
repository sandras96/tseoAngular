import { TokenStorageService } from 'src/app/services/token-storage.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
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

  changeForm : FormGroup;
  submitted = false;
  closeResult: string;
 
  @Input() student : Student;

  constructor(private studentService : StudentService,
              public authService : AuthService,
              private router : Router,
              private toastr: ToastrService,
              private modalService: ModalService) { }

  ngOnInit(): void {
  
    this.changeForm = new FormGroup({
      oldpassword: new FormControl('', Validators.required),
      newpassword: new FormControl('', Validators.required),
      cnewpassword: new FormControl('', Validators.required),
    })
  }

 
  get f() { return this.changeForm.controls; }

  onSubmitChangePass(){
    this.submitted = true;

    if (this.changeForm.invalid) {
        return false;
    }
       this.changePassword()
   
  }

  changePassword() : void{
    console.log("value forme je ", this.changeForm.value)
   
    if(this.changeForm.value.newpassword === this.changeForm.value.cnewpassword){

      this.authService.changePassword(this.changeForm.value.oldpassword,this.changeForm.value.newpassword)
        .subscribe(data => {
          console.log(data)
        },(err:Error) => {
          if(err.toString()==='Unauthorized'){
          
            console.log("Greska.");
            
            this.toastr.error('Bad credentials!','Error');
            console.log(err);
          } 
          else if(err.toString()==="OK"){
            this.closeModal('changePasswordModal');
            this.toastr.success("Password was changed successfully!", "Success!")
          }
          else{
        
            this.toastr.error('Change password unsuccessful!','Error!');
          }
         
        }
        );
     
      
      }else{
        this.toastr.error("Passwords don't match!", "Error!") 

      }
          
        
          
        
    
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
    this.changeForm.reset();
}
}
