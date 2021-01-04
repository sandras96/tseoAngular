import { Component, Input, OnInit } from '@angular/core';
import { Professor } from 'src/app/model/professor.model';


@Component({
  selector: 'app-professor-detail',
  templateUrl: './professor-detail.component.html',
  styleUrls: ['./professor-detail.component.css']

})
export class ProfessorDetailComponent implements OnInit {

  @Input() public professor: Professor; 

  constructor() { }

  ngOnInit(): void {
    
  }

}
