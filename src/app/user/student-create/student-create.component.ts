import { Component, OnInit } from '@angular/core';
import { Student } from 'src/app/model/student.model';
import { User } from 'src/app/model/user.model';
import { StudentService } from 'src/app/services/student.service';
import { FormGroup, FormBuilder} from '@angular/forms';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-student-create',
  templateUrl: './student-create.component.html',
  styleUrls: ['./student-create.component.css']
})
export class StudentCreateComponent implements OnInit {

  addForm: FormGroup;
  student : Student = new Student();
  user : User = new User();
  constructor(private userService : UserService,
              private studentService : StudentService,
              private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.addForm = this.formBuilder.group({
      id : [],
      address : [''],
      birthDate: [''],
      city : [''],
      country : [''],
      email : [''],
      firstname : [''],
      lastname : [''],
      phone : [''],
      zip: [''],
      indexNum : [''],
      
      username : [''],
       password : [''],
       authorities : ['student']

      
    })
  }

  createStudent(){
    console.log("Form je dabogsacuvaj ", this.addForm.value)
    this.userService.create(this.addForm.value)
      .subscribe(data=>{
        console.log(data)
      })
    // this.studentService.create(this.student)
    //   .subscribe(data=>{
    //     console.log(data)
    //   })

  }

  refresh(){

  }

}
