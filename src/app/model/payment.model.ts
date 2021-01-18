import { Student } from './student.model';
export class Payment {

    id : number;
    accountNumber : number;
    address: String;
    amount : number;
    city : String;
    date : Date;
    deleted : boolean;
    model : number;
    name : String;
    paymentCode : number;
    purpose : String;
    reference : number;
    student : Student;
}
