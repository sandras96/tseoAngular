import { ToastrService } from 'ngx-toastr';
import { Component, OnInit } from '@angular/core';
import { StudentService } from 'src/app/services/student.service';
import { FormGroup, FormControl, FormArray, Validators} from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-student-create',
  templateUrl: './student-create.component.html',
  styleUrls: ['./student-create.component.css']
})
export class StudentCreateComponent implements OnInit {

  studentForm: FormGroup;
  submitted = false;
  
  constructor(private studentService : StudentService,
              private router : Router,
              private toastr : ToastrService) { }

  ngOnInit(): void {
    this.studentForm = new FormGroup({
      
      address : new FormControl('', Validators.required),
      birthDate: new FormControl('', Validators.required),
      city : new FormControl('', Validators.required),
      country : new FormControl('', Validators.required),
      email : new FormControl('', Validators.required),
      firstname : new FormControl('', Validators.required),
      lastname : new FormControl('', Validators.required),
      phone : new FormControl('', Validators.required),
      zip: new FormControl('', Validators.required),
      indexNum : new FormControl('', Validators.required),
      user : new FormGroup({
          username : new FormControl('', Validators.required),
          password :new FormControl('', Validators.required),
          authorities : new FormArray([
              new FormGroup({
                  id: new FormControl(2),
                  name: new FormControl('STUDENT'),
                })
            ])
      })
    })
  }
  get f() { return this.studentForm.controls; }
  onSubmit(){
    this.submitted = true;

   if (this.studentForm.invalid) {
       return false;
   }
      this.createStudent()
 }
  createStudent(){
    console.log("Student form value je ", this.studentForm.value)
    this.studentService.create(this.studentForm.value)
      .subscribe(data=>{
         console.log(data)
         this.toastr.success('Student '+data.firstname+ ' ' + data.lastname+ ' was successfully created.', "Success!")
         this.router.navigate(['/students/',data.id])
       },error=>{
         console.log(error)
       })

  }

  refresh(){
    this.studentForm.reset();
  }

}
