import { Component, OnInit, Input } from '@angular/core';
import { Payment } from 'src/app/model/payment.model';

@Component({
  selector: 'app-student-payments',
  templateUrl: './student-payments.component.html',
  styleUrls: ['./student-payments.component.css']
})
export class StudentPaymentsComponent implements OnInit {

  @Input() payments : Payment[];
  
  constructor() { }

  ngOnInit(): void {
  }

}
