export interface BranchDepartmentCreateDto {
    branch_id: string;
    department_id: string;
}

export interface BranchDepartmentGetDto {
    _id: string,
    department_id: string;
	name: string;
}