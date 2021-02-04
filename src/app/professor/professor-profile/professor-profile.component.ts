import { ModalService } from 'src/app/_modal';
import { Authority } from './../../model/authority.model';
import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Professor } from 'src/app/model/professor.model';
import { ProfessorService } from 'src/app/services/professor.service';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-professor-profile',
  templateUrl: './professor-profile.component.html',
  styleUrls: ['./professor-profile.component.css']
})
export class ProfessorProfileComponent implements OnInit {

  changeForm : FormGroup;
  submitted = false;

  @Input() professor : Professor;
 
  constructor(private professorService : ProfessorService,
              private router : Router,
              private toastr: ToastrService,
              public authService : AuthService,
              private modalService : ModalService) {}

  ngOnInit(): void {
    this.changeForm = new FormGroup({
      oldpassword: new FormControl('', Validators.required),
      newpassword: new FormControl('', Validators.required),
      cnewpassword: new FormControl('', Validators.required),
    })

  }
  get f() { return this.changeForm.controls; }

  updateProfessor(): void {
    this.professorService.update(this.professor.id, this.professor)
      .subscribe(
        response => {
          console.log(response);
          this.toastr.success('This Professor was updated successfully!', 'Success!')
        },
        error => {
          console.log(error);
        });
  }
deleteProfessor() : void {
  this.professorService.delete(this.professor.id)
    .subscribe(
      response =>{
        this.toastr.success("This Professor "+this.professor.firstname + " " + this.professor.lastname+" was deleted successfully!", "Delete");
        this.router.navigate(['/professors']);
      }, 
      error => {
        this.toastr.error('Error!', 'Delete')
        console.log(error)
      }
    )
}

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
      });
    }else{
      this.toastr.error("Passwords don't match!", "Error!") 

    }
}

openModal(id: string) {
  this.modalService.open(id);
}

closeModal(id: string) {
  this.modalService.close(id);
  this.changeForm.reset();
}

 
  
}
