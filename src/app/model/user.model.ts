import { Authority } from "./authority.model";
import { Professor } from "./professor.model";
import {  Student } from "./student.model";

export class User {

    id : number;
    deleted: boolean;
    password : String;
    username: String;
    student : Student;
    professor : Professor;
    authorities : Authority[];
  
    
}
