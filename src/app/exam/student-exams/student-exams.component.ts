import { Component, Input, OnInit } from '@angular/core';
import { Exam } from 'src/app/model/exam.model';

@Component({
  selector: 'app-student-exams',
  templateUrl: './student-exams.component.html',
  styleUrls: ['./student-exams.component.css']
})
export class StudentExamsComponent implements OnInit {

  @Input() registeredExams : Exam[];
  @Input() unregisteredExams : Exam[];

  constructor() { }

  ngOnInit(): void {
    console.log("dosao sam ovde")
  }

}
