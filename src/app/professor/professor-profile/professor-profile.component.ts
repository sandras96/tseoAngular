import { Authority } from './../../model/authority.model';
import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Professor } from 'src/app/model/professor.model';
import { ProfessorService } from 'src/app/services/professor.service';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-professor-profile',
  templateUrl: './professor-profile.component.html',
  styleUrls: ['./professor-profile.component.css']
})
export class ProfessorProfileComponent implements OnInit {
    
    
  form: FormGroup;
  authorityList: any = [
    { id: 1, name: 'ADMIN' },
    { id: 3, name: 'PROFESSOR'}
  ];
  
  
  
  @Input() professor : Professor;
 
  authorities : Authority[];
  authority : String;
  
  name = 'Angular';
  isMasterSel:boolean;
  categoryList:any;
  checkedCategoryList:any;
 
  message = "";
  constructor(private formBuilder: FormBuilder,
    private professorService : ProfessorService,
              private router : Router ) {
                this.form = this.formBuilder.group({
                  role: this.formBuilder.array([], [Validators.required])
                })
               }

  ngOnInit(): void {
  
   this.authorities = this.professor.user.authorities;

  }
  onCheckboxChange(e) {
    const role: FormArray = this.form.get('role') as FormArray;
  
    if (e.target.checked) {
      role.push(new FormControl(e.target.value));
    } else {
       const index = role.controls.findIndex(x => x.value === e.target.value);
       role.removeAt(index);
    }
  }

  updateProfessor(): void {
    this.professorService.update(this.professor.id, this.professor)
      .subscribe(
        response => {
          console.log(response);
          this.message = 'This Student was updated successfully!';
          
        },
        error => {
          console.log(error);
        });
  }
deleteProfessor() : void {
  this.professorService.delete(this.professor.id)
    .subscribe(
      response =>{
        this.router.navigate(['/professors']);
      }, 
      error => {
        console.log(error)
      }
    )
}


 
  
}
