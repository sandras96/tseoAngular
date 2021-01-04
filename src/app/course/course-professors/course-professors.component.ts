import { Component, OnInit ,Input} from '@angular/core';
import { Professor } from 'src/app/model/professor.model';

@Component({
  selector: 'app-course-professors',
  templateUrl: './course-professors.component.html',
  styleUrls: ['./course-professors.component.css']
})
export class CourseProfessorsComponent implements OnInit {

  @Input() professors : Professor[];
  constructor() { }

  ngOnInit(): void {
  }

}
