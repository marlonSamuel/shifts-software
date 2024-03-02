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