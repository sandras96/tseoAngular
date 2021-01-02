import { Authority } from "./authority.model";

export class User {

    user_id : number;
    deleted: boolean;
    password : String;
    username: String;
    authority : Authority[];
}
