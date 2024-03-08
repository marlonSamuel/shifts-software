import { IAttendShift, IShift, IShiftActive, IShiftFinished } from "../interfaces/IAdmin";
import { IUser } from "../interfaces/IAuth";

export interface ISocketState {
    initied_shifts: IShift[];
    call_shift: IShiftActive;
    finished_shifts: IShiftFinished[];
};

type SocketAction = 
    | { type: 'finished_shifts',payload: IShiftFinished[]}
    | { type: 'call_shift', payload: IShiftActive}
    | { type: 'initied_shifts', payload: IShiftActive[]}


//generar estado
export const authReducer = (state: ISocketState, action: SocketAction): ISocketState =>{
    switch (action.type) {
        case 'finished_shifts':
            return {
                ...state,
                finished_shifts: action.payload
            }
        
            case 'call_shift':
                return {
                    ...state,
                    call_shift: action.payload
                }

            case 'initied_shifts':
                return {
                    ...state,
                    initied_shifts: action.payload
                }

        default:
            return state;
    }
}
