import { FinancialCardService } from './../../services/financial-card.service';
import { StudentService } from 'src/app/services/student.service';
import { Component, OnInit, Input } from '@angular/core';
import { Exam } from 'src/app/model/exam.model';
import { FinancialCard } from 'src/app/model/financial-card.model';
import { Student } from 'src/app/model/student.model';

@Component({
  selector: 'app-exam-registered',
  templateUrl: './exam-registered.component.html',
  styleUrls: ['./exam-registered.component.css']
})
export class ExamRegisteredComponent implements OnInit {
 
  student : Student;
  financialCard : FinancialCard;
  signExams = [];
  checked = [];
  balanceAfter : any;
  selectedItemsList = [];
  checkedIDs = [];

  @Input() exams : Exam[];
  constructor(private studentService : StudentService,
              private financialCardService : FinancialCardService) { }

  ngOnInit(): void {
    console.log("U exam-registered componenti sam!!")
    this.getFinancialCard();
  }

  signUp(exam){
    console.log("exam je ",exam)
    this.signExams.push(exam);
    this.student = JSON.parse(localStorage.getItem('currentStudent'));
  
    this.studentService.signUpExam(this.signExams,this.student.id)
      .subscribe(data=>{
        console.log(data)
      })
   }
  
   register(){
  
     console.log("cekni su", this.selectedItemsList)
     this.student = JSON.parse(localStorage.getItem('currentStudent'));
  
     this.studentService.signUpExam(this.selectedItemsList,this.student.id)
       .subscribe(data=>{
         console.log(data)
       })
   }
  changeSelection() {
  
    console.log("BALANCE AFTER")
    this.fetchSelectedItems()
    
  }
  ;
  
   fetchSelectedItems() {
    this.selectedItemsList = this.exams.filter((value, index) => {
      return value['checked']
      
    });
    this.balanceAfter = this.financialCard.balance - (this.selectedItemsList.length * 200);
  }
  
  fetchCheckedIDs() {
    this.checkedIDs = []
    this.exams.forEach((value, index) => {
      if (value['checked']) {
        this.checkedIDs.push(value.id);
      }
    });
  }
  
  getFinancialCard(){
    this.student = JSON.parse(localStorage.getItem('currentStudent'));
    this.financialCardService.getByStudent(this.student.id)
      .subscribe(data=>{
        this.financialCard = data;
      })
  }
}
