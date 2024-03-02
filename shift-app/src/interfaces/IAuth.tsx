export interface ILoginData {
    username: string;
    password: string;
}

export interface IUser {
    id: string;
    name: string;
    lastname: string;
    role: string;
    department: string;
    branch: string;
    department_id: string;
    branch_id: string;
    branch_department_id: string;
    iat: number;
    exp: number;
}

export interface IAuthData {
    ok: string;
    token: string;
    user?: IUser
}


