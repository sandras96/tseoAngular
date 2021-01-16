import { ToastrService } from 'ngx-toastr';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Payment } from 'src/app/model/payment.model';
import { PaymentService } from 'src/app/services/payment.service';
import { ModalService } from 'src/app/_modal';

@Component({
  selector: 'app-student-payments',
  templateUrl: './student-payments.component.html',
  styleUrls: ['./student-payments.component.css']
})
export class StudentPaymentsComponent implements OnInit {

  bodyText: string;
  @Input() payments : Payment[];
  @Output() deletePayment = new EventEmitter<Payment[]>();
  constructor(private paymentService : PaymentService,
              private toastr : ToastrService,
              private modalService: ModalService) { }

  ngOnInit(): void {
    this.bodyText = 'This text can be updated in modal 1';
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
