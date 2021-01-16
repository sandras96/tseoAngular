import { EnumType } from 'typescript';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/model/user.model';
import { UserService } from 'src/app/services/user.service';
import { Student } from 'src/app/model/student.model';
import { StudentService } from 'src/app/services/student.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProfessorService } from 'src/app/services/professor.service';

@Component({
  selector: 'app-user-view',
  templateUrl: './user-view.component.html',
  styleUrls: ['./user-view.component.css']
})
export class UserViewComponent implements OnInit {

  createProfessorForm: FormGroup;
  user : User;
  student : Student = new Student();
  submitted = false;

  constructor(private userService : UserService,
              private studentService : StudentService,
              private professorService : ProfessorService,
              private route : ActivatedRoute,
              private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.getUser(this.route.snapshot.paramMap.get('id'));

    this.createProfessorForm = this.formBuilder.group({
      address : ['', Validators.required],
      birthdate: [''],
      city : [''],
      country : [''],
      email : [''],
      firstname : [''],
      lastname : [''],
      phone : [''],
      zip: [''],
      role : ['DEMONSTRATOR'],
      user : this.user
      
      
    });
  }

  createProfessor(){
    this.professorService.create(this.createProfessorForm.value)
      .subscribe( data=>{
        console.log("PRof je ", data)
      })
  }
  getUser(id){
    this.userService.get(id)
      .subscribe(data => {
        this.user = data;
        console.log(data)
      },
      error =>{
        console.log(error)
      })
  }

  newStudent() : void {
    this.submitted = false;
    this.student = new Student();
  }

  save(){
    this.studentService.create(this.student)
      .subscribe(data=> {
        console.log(data);
        this.student = new Student();
        console.log(this.student)
      },
      error=>{
        console.log(error)
      })
  }

  onSubmit(){
    this.submitted = true;
    this.save();
  }

}
