export interface IAttendShift {
    _id: String;
    shift_id: String;
    user_id: String;
    tiempo: string;
    window?: number;
    end: String;
    status: String;
    createdAt?: String;
    updatedAt?: String;
}