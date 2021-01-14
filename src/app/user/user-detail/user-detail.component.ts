import { Component, OnInit, Input } from '@angular/core';
import { Professor } from 'src/app/model/professor.model';
import { Student } from 'src/app/model/student.model';
import { User } from 'src/app/model/user.model';
import { StudentService } from 'src/app/services/student.service';
import { UserComponent } from '../user/user.component';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.css']
})
export class UserDetailComponent implements OnInit {

  @Input() user : User;

  constructor(private studentService : StudentService) { }

  ngOnInit(): void {
  }

 

}
