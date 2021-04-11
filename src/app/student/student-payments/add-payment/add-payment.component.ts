import { FinancialCardService } from './../../../services/financial-card.service';
import { FinancialCard } from './../../../model/financial-card.model';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { Student } from 'src/app/model/student.model';
import { StudentService } from 'src/app/services/student.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { PaymentService } from 'src/app/services/payment.service';

@Component({
  selector: 'app-add-payment',
  templateUrl: './add-payment.component.html',
  styleUrls: ['./add-payment.component.css']
})
export class AddPaymentComponent implements OnInit {

  paymentForm : FormGroup;
  tabIndex = 0;
  date;
  student : Student;
  financialCard : FinancialCard;

  constructor(private route : ActivatedRoute,
              private financialCardService : FinancialCardService,
              private studentService : StudentService,
              private paymentService : PaymentService) { }

  ngOnInit(): void {
    this.date = new Date().toISOString().slice(0, 10);
    this.getStudent(this.route.snapshot.paramMap.get('id'));
    this.paymentForm = new FormGroup({
       financialCard : new FormControl(this.financialCard),
       purpose : new FormControl('', Validators.required),
       amount: new FormControl('', Validators.required),
       creditCard : new FormGroup({
        name : new FormControl('', [Validators.required]),
        cardNumber : new FormControl('',Validators.required ),
        valid : new FormControl(this.date, Validators.required),
        cvc : new FormControl('', Validators.required)
    })
      
         })
  }
  get f() { return this.paymentForm.controls; }

  getStudent(id){
    this.studentService.get(id)
      .subscribe(data=>{
        this.student = data;
        this.getFinancialCard(data.id);
        console.log(data);
      })
  }
  getFinancialCard(id){
    this.financialCardService.getByStudent(id)
      .subscribe(data=>{
        this.financialCard = data;
        console.log(data)
      })
  }

  onSubmit(){ 
    this.paymentForm.value.financialCard = this.financialCard;
    this.paymentForm.value.date = this.date;
    console.log("payment je ", this.paymentForm.value);
    this.paymentService.create(this.paymentForm.value)
      .subscribe(data=>{
        console.log(data)
      })
  }
  onTabClick(index){
    this.tabIndex = index;
  }

  nextBtn1(){
    this.tabIndex = 1;
  }
  nextBtn2(){
    this.tabIndex = 2;
  }
  

}
