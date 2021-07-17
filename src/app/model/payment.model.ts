import { CreditCard } from './credit-card.model';
import { FinancialCard } from './financial-card.model';
import { Student } from './student.model';
export class Payment {

    id : number;
    amount : number;
    date : Date;
    deleted : boolean;
    purpose : String;
    reference : number;
    accountName : String;
    financialCard : FinancialCard;
    creditCard : CreditCard;
}
