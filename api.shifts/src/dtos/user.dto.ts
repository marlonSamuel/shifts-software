export interface UserCreateDto {
    branch_department_id: String;
    role_id: String;
    name: string;
    lastname: string;
    cui: string;
    status: Boolean;
    username: string;
    password: string;
    email: string | null;
}

export interface UserUpdateDto {
    _id?: string;
    password?: string;
    role_id: String;
    name: string;
    lastname: string;
    cui: string;
    status: Boolean;
    username: string;
    email: string | null;
    disabled: Boolean;
    cellphone: String;
    branch_department_id?: string;
    window?: number;
}