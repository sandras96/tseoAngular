import { TokenStorageService } from 'src/app/services/token-storage.service';
import { AuthService } from 'src/app/services/auth.service';
import { EnumType } from 'typescript';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/model/user.model';
import { UserService } from 'src/app/services/user.service';
import { Student } from 'src/app/model/student.model';
import { StudentService } from 'src/app/services/student.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ProfessorService } from 'src/app/services/professor.service';
import { ModalService } from 'src/app/_modal';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-user-view',
  templateUrl: './user-view.component.html',
  styleUrls: ['./user-view.component.css']
})
export class UserViewComponent implements OnInit {

  private roles;
  user : User;
  submitted = false;
 
  currentUserId;
  changeForm: FormGroup;


  constructor(private userService : UserService,
              private route : ActivatedRoute,
              private authService : AuthService,
              private toastr: ToastrService,
              private router : Router,
              private modalService: ModalService,
              private tokenStorage : TokenStorageService) { }

  ngOnInit(): void {
    this.currentUserId = this.tokenStorage.getUser().id;
    this.getUser(this.route.snapshot.paramMap.get('id'));
    this.changeForm = new FormGroup({
      oldpassword: new FormControl('', Validators.required),
      newpassword: new FormControl('', Validators.required),
      cnewpassword: new FormControl('', Validators.required),
    })

  }
  get f() { return this.changeForm.controls; }

  getUser(id){
    console.log("getUser()")
    this.userService.get(id)
      .subscribe(data => {
        console.log(data)
        this.roles = data.authorities;
        const isAdmin = this.roles.some(role => role.name === "ADMIN");
        if(isAdmin){
          this.user = data;
        } 
        else{
          this.toastr.error("Admin not found!","Error!")
          this.router.navigate(['users'])
        }
       
      },
      error =>{
        this.toastr.error("The user not found!","Error!")
        this.router.navigate(['users']);
        console.log(error)
      })
  }

  deleteUser(){
    this.userService.delete(this.user.id)
      .subscribe(data=>{
        this.router.navigate(['users']);
        this.toastr.success("The user "+this.user.username+" was successfully deleted!","Success!");
      },error=>{
        console.log(error)
        this.toastr.error("Error, try again!", "Error!");
      })

  }

  updateUser(){
    this.userService.update(this.user.id, this.user)
      .subscribe(data=>{
        this.toastr.success("The username was sucessfully updated!", "Success!");
        console.log(this.user)
        console.log(data)
      },
      error => {
        this.toastr.error("Error, try again!", "Error!")
        console.log(error)
      })
  }
  openModal(id: string) {
    this.modalService.open(id);
}

  closeModal(id: string) {
    this.modalService.close(id);
    this.changeForm.reset();
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


}
