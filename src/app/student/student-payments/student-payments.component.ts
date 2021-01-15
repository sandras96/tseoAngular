import { ToastrService } from 'ngx-toastr';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Payment } from 'src/app/model/payment.model';
import { PaymentService } from 'src/app/services/payment.service';

@Component({
  selector: 'app-student-payments',
  templateUrl: './student-payments.component.html',
  styleUrls: ['./student-payments.component.css']
})
export class StudentPaymentsComponent implements OnInit {

  @Input() payments : Payment[];
  @Output() deletePayment = new EventEmitter<Payment[]>();
  constructor(private paymentService : PaymentService,
              private toastr : ToastrService) { }

  ngOnInit(): void {
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

}
