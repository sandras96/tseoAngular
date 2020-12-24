import { EnumType } from "typescript";

export class Professor {

    professor_id : number;
    address : String;
    birthdate: Date;
    city : String;
    country : String;
    email : String;
    firstname : String;
    lastname : String;
    phone : String;
    zip: number;
    role : EnumType;
    user_rel : number;
}
