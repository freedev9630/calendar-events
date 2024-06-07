import { User } from "@auth0/auth0-angular";

export namespace NAuth0 {
    export interface UserInfo extends User {
        description: string;
    }
}