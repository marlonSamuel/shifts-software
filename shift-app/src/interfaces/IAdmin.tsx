export interface IBranch {
    _id: string;
    name: String,
    dir: String,
    code: string;
    created_at?: string,
    updated_at?: string
}

export interface IDepartment {
    _id: string;
    name: String,
    code: string;
    created_at?: string,
    updated_at?: string
}

export interface IUser {
    _id: string;
    branch_department_id: String;
    role_id: String;
    name: string;
    lastname: string;
    cui: string;
    status?: Boolean;
    disabled?: Boolean;
    username: string;
    password: string;
    email?: string | null;
    cellphone: String;
    window?: number
}

export interface IRole {
    _id: String;
    name: string;
}

export interface IBranchDepartment {
    _id: string;
    department_id: string;
    department: String;
    branch_id: string;
    branch: String;
    code_dep: string;
    code_suc: string;
}

export interface IShift {
    _id?: String;
    branch_department_id?: String;
    branch_id?: String;
    department_id?: String;
    department?: String;
    user_id?: String;
    number?: string;
    created_at?: Date;
    status?: Boolean;
}

export interface IAttendShift {
    _id: String;
    shift_id?: String;
    user_id: String;
    created_at?: Date;
    tiempo?: string;
    window?: number;
    end?: Date;
    status: String;
}

export interface IAttendShiftUpdate {
    end: string;
    tiempo: number;
    status: string;
}

export interface IShiftActive {
    _id: string;
	window: number;
	number: string;
	shift_id: string;
    createdAt: string;
}

export interface IShiftFinished {
    _id: string;
    ymd: string;
    window: number;
    number: string;
    shift_id: string;
    createdAt: string;
    name_user: string;
    lastname_user: string;
    user_id: string;
    status: string;
    branch_id: string;
    deparment: string;
}
