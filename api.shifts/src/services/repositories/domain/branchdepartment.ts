export interface IBranchDepartment {
    branch_id: String;
    department_id: String;
}

export interface IBranchDepartmentGet {
    _id: string;
    department_id: string;
    name: String;
}

export interface IBranchDepartmentGetFind {
    _id: string;
    department_id: string;
    department: String;
    branch_id: string;
    branch: String;
    code_dep: string;
    code_suc: string;
}