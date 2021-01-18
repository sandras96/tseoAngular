import { ToastrService } from 'ngx-toastr';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Payment } from 'src/app/model/payment.model';
import { PaymentService } from 'src/app/services/payment.service';
import { ModalService } from 'src/app/_modal';
import { FormGroup, FormBuilder} from '@angular/forms';
import { Student } from 'src/app/model/student.model';

@Component({
  selector: 'app-student-payments',
  templateUrl: './student-payments.component.html',
  styleUrls: ['./student-payments.component.css']
})
export class StudentPaymentsComponent implements OnInit {

  addForm: FormGroup;
  @Input() payments : Payment[];
  @Input() student : Student;
  @Output() createPayment = new EventEmitter<Payment[]>();
  @Output() deletePayment = new EventEmitter<Payment[]>();
  constructor(private paymentService : PaymentService,
              private formBuilder: FormBuilder,
              private toastr : ToastrService,
              private modalService: ModalService) { }

  ngOnInit(): void {
   
    this.addForm = this.formBuilder.group({
    id : [],
    accountNumber : [''],
    address: [''],
    amount : [''],
    city : [''],
    date : [''],
    model : [''],
    name : [''],
    paymentCode : [''],
    purpose : [''],
    reference : [''],
    student : this.student
    })
  }

  addPayment(){
    console.log("Form dabogsacuvaj drugi deo", this.addForm.value)
    this.paymentService.create(this.addForm.value)
      .subscribe(data=>{
        this.createPayment.emit(data);
        this.toastr.success('Payment was successfully created!', 'Created');
        this.closeModal('createPaymentModal');
        console.log("Created payment je :", data)
      },error=>{
        console.log(error)
      })
  }

  removePayment(p){
    this.paymentService.delete(p.id)
      .subscribe( data=>{
        this.deletePayment.emit(p);
        this.toastr.success("Payment " + p.purpose + " was successfully deleted", "Success")
      },
      error => {
        console.log(error)
      })

  }
  openModal(id: string) {
    this.modalService.open(id);
}

  closeModal(id: string) {
    this.modalService.close(id);
}

onSubmit(){
  
}
}
