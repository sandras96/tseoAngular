import { EnumType } from "typescript";
import { Professor } from "./professor.model";

export class Course {
    id : number;
    deleted : boolean;
    espb : number;
    name : string;
    semester : EnumType;
    professors : Professor[];
    

}
