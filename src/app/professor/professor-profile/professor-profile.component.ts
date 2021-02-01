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
    
  
  @Input() professor : Professor;
 

 
  
  constructor(private professorService : ProfessorService,
              private router : Router,
              private toastr: ToastrService,
              public authService : AuthService) {}

  ngOnInit(): void {
  

  }


  updateProfessor(): void {
    this.professorService.update(this.professor.id, this.professor)
      .subscribe(
        response => {
          console.log(response);
          this.toastr.success('This Professor was updated successfully!', 'Update')
        },
        error => {
          console.log(error);
        });
  }
deleteProfessor() : void {
  this.professorService.delete(this.professor.id)
    .subscribe(
      response =>{
        this.toastr.success('This Professor was deleted successfully!', 'Delete')
        this.router.navigate(['/professors']);
      }, 
      error => {
        console.log(error)
      }
    )
}


 
  
}
