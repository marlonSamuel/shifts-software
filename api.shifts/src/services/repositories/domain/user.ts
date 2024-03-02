export interface IUser {
    _id: string;
    branch_department_id: String;
    role_id: String;
    name: string;
    lastname: string;
    cui: string;
    status: Boolean;
    disabled: Boolean;
    username: string;
    password: string;
    email: string | null;
    cellphone: String;
    window?: Number
}