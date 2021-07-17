import { ToastrService } from 'ngx-toastr';
import { PaymentService } from './../../../services/payment.service';
import { FinancialCardService } from './../../../services/financial-card.service';
import { FinancialCard } from './../../../model/financial-card.model';
import { StudentService } from './../../../services/student.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Student } from 'src/app/model/student.model';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-create-payment',
  templateUrl: './create-payment.component.html',
  styleUrls: ['./create-payment.component.css']
})
export class CreatePaymentComponent implements OnInit {
  
  paymentForm : FormGroup;
  tabIndex = 0;
  student : Student;
  financialCard : FinancialCard;
  date : String;
  
  constructor(private route : ActivatedRoute,
              private router : Router,  
              private studentService : StudentService,
              private financialCardService : FinancialCardService,
              private paymentService : PaymentService,
              private toastrService : ToastrService) { }

  ngOnInit(): void {
    this.getStudent(this.route.snapshot.paramMap.get('id'));

    this.date = new Date().toISOString().slice(0, 10);
    this.paymentForm = new FormGroup({
      financialCard : new FormControl(this.financialCard),
      purpose : new FormControl('', Validators.required),
      amount: new FormControl('', Validators.required),
      accountName: new FormControl('', Validators.required),
      creditCard : new FormGroup({
          name : new FormControl('', [Validators.required]),
          cardNumber : new FormControl('',Validators.required ),
          valid : new FormControl(this.date, Validators.required),
          cvc : new FormControl('', Validators.required)
        })
  })
}
  get f() { return this.paymentForm.controls; }

  onSubmit(){ 
    this.paymentForm.value.financialCard = this.financialCard;
    this.paymentForm.value.date = this.date;
    console.log("payment je ", this.paymentForm.value);
    console.log("creditcard je", this.paymentForm.controls)
    this.paymentService.create(this.paymentForm.value)
       .subscribe(data=>{
         this.toastrService.success(`Success!`, `Payment successfully created! Current balance: ${data.financialCard.balance} RSD`)
       //  this.router.navigate(['/students/',this.student.id])
         console.log(data)
    })
  }
  getStudent(id){
    this.studentService.get(id)
      .subscribe(data=>{
        this.student = data;
        this.getFinancialCard(data.id)
      })
  }

  getFinancialCard(id){
    this.financialCardService.getByStudent(id)
      .subscribe(data=>{
        this.financialCard = data;
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
  backBtn1(){
    this.tabIndex = 0;
  }
  backBtn2(){
    this.tabIndex = 1;
  }
}
