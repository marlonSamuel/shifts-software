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
    role_id: String;
    name: string;
    lastname: string;
    cui: string;
    status: Boolean;
    username: string;
    email: string | null;
    disabled: Boolean;
    cellphone: String;
}