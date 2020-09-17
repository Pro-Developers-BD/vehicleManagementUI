export interface User {
    id: number;
    username: string;
    password: string;
    accessToken?: string;
    refreshToken?: string;

}
export class User implements User {
    id: number;
    username: string;
    password: string;
    accessToken?: string;

    constructor(item?: User) {
        if (item !== undefined) {
            for (const key in item) {
                try { this[key] = item[key]; }
                catch (e) { }
            }
        }
    }
}
