import { Authority } from "./authority.model";

export class User {

    id : number;
    deleted: boolean;
    password : String;
    username: String;
    authorities : Authority[];
  
    
}
