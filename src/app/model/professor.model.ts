import { EnumType } from "typescript";
import { Course } from "./course.model";
import { User } from "./user.model";

export class Professor {

    id : number;
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
    user : User;
    courses : Course[];
}
