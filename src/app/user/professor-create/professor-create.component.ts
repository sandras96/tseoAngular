import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ProfessorService } from 'src/app/services/professor.service';

@Component({
  selector: 'app-professor-create',
  templateUrl: './professor-create.component.html',
  styleUrls: ['./professor-create.component.css']
})
export class ProfessorCreateComponent implements OnInit {

  professorForm : FormGroup;

  constructor(private professorService : ProfessorService,
              private router : Router,
              private toastr : ToastrService) { }

  ngOnInit(): void {
    this.professorForm = new FormGroup({
      
      address : new FormControl('', Validators.required),
      birthDate: new FormControl('', Validators.required),
      city : new FormControl('', Validators.required),
      country : new FormControl('', Validators.required),
      email : new FormControl('', Validators.required),
      firstname : new FormControl('', Validators.required),
      lastname : new FormControl('', Validators.required),
      phone : new FormControl('', Validators.required),
      zip: new FormControl('', Validators.required),
      role : new FormControl('', Validators.required),
      user : new FormGroup({
          username : new FormControl('', Validators.required),
          password :new FormControl('', Validators.required),
          authorities : new FormArray([
              new FormGroup({
                  id: new FormControl(3),
                  name: new FormControl('PROFESSOR'),
                })
            ])
      })
    })
  }

  createProfessor(){
    console.log("create prof form je ", this.professorForm.value)
    this.professorService.create(this.professorForm.value)  
      .subscribe(data =>{
        this.toastr.success('Professor '+data.firstname+ ' ' + data.lastname+ ' was successfully created.', "Success!")
        this.router.navigate(['/professors',data.id])
        console.log(data)
      }, error=>{
        console.log(error)
      })
  }

  refresh(){
    this.professorForm.reset();
  }
}
