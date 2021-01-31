import { ToastrService } from 'ngx-toastr';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Payment } from 'src/app/model/payment.model';
import { PaymentService } from 'src/app/services/payment.service';
import { ModalService } from 'src/app/_modal';
import { FormGroup, FormBuilder, Validators} from '@angular/forms';
import { Student } from 'src/app/model/student.model';

@Component({
  selector: 'app-student-payments',
  templateUrl: './student-payments.component.html',
  styleUrls: ['./student-payments.component.css']
})
export class StudentPaymentsComponent implements OnInit {

  addForm: FormGroup;
  submitted = false;

  editPay : Payment;
  isShowDivIf = false;
  showEditPay= false;
  @Input() payments : Payment[];
  @Input() student : Student;
  @Output() createPayment = new EventEmitter<Payment[]>();
  @Output() deletePayment = new EventEmitter<Payment[]>();
  date;

  constructor(private paymentService : PaymentService,
              private formBuilder: FormBuilder,
              private toastr : ToastrService,
              private modalService: ModalService) { }

  ngOnInit(): void {
    this.date = new Date().toISOString().slice(0, 10);
    this.addForm = this.formBuilder.group({
    id : [],
    accountNumber : ['', Validators.required],
    address: ['', Validators.required],
    amount : ['', Validators.required],
    city : ['', [Validators.required,Validators.minLength(6)]],
    date : ['', Validators.required],
    model : ['', Validators.required],
    name : ['', Validators.required],
    paymentCode : ['', Validators.required],
    purpose : ['', Validators.required],
    reference : ['', Validators.required],
    student : this.student
    })
  }

  get f() { return this.addForm.controls; }

  onSubmit(){
     this.submitted = true;

    if (this.addForm.invalid) {
        return false;
    }
       this.addPayment()
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
    this.addForm.reset();
    this.submitted = false;
}


// openModalEditPayment(id: string, payId : number){
//   this.modalService.open(id);
//   this.getEditPay(payId);
// }

// getEditPay(id){
//   this.paymentService.get(id)
//     .subscribe(data=>{
//       this.editPay = data;
//     },error=>{
//       console.log(error)
//     })
// }

editPayment(){
  this.paymentService.update(this.editPay.id, this.editPay)
    .subscribe(data=>{
      console.log("edit payment " , data)   
      this.toastr.success('Payment was successfully updated!', 'Updated');
    })

}
removeEditPayment(p){
  this.paymentService.delete(p.id)
    .subscribe( data=>{
      this.isShowDivIf = !this.isShowDivIf;
      this.showEditPay = !this.showEditPay;
      this.deletePayment.emit(p);
      this.toastr.success("Payment " + p.purpose + " was successfully deleted", "Success")
    },
    error => {
      console.log(error)
    })

}
viewPayment(payment){
  this.editPay = payment;
  this.isShowDivIf = !this.isShowDivIf;
  this.showEditPay = !this.showEditPay;
  console.log(this.editPay)
}

backToList(){
  console.log("back to list")
  this.isShowDivIf = !this.isShowDivIf;
  this.showEditPay = !this.showEditPay;
}

}
