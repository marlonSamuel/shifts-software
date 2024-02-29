export interface AttendShiftCreateDto {
    shift_id: String;
    user_id: String;
    status: String;
}

export interface AttendShiftUpdateDto {
    end: Date;
    tiempo: string;
    status: String;
}