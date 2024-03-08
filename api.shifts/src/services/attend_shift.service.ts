import { ApplicationException } from "../common/exceptions/application.exception";
import { AttendShiftCreateDto, AttendShiftUpdateDto } from "../dtos/attend_shift.dto";
import { ShiftCreateDto } from "../dtos/shift.dto";
import { AttendShiftRepository } from "./repositories/attend_shift.repository";
import { IAttendShift } from "./repositories/domain/attend_shift";
import { IShift } from "./repositories/domain/shift";
import { ShiftRepository } from "./repositories/shift.repository";
import { UserRepository } from "./repositories/users.repository";
import moment from 'moment';

export class AttendShiftService {
    constructor(
        private readonly attendShiftRepository: AttendShiftRepository,
        private readonly shiftRepository: ShiftRepository,
        private readonly userRepository: UserRepository
    ){}

    public async all(): Promise<IAttendShift[]> {
        return await this.attendShiftRepository.all();
    }

    public async find(id: String): Promise<IAttendShift | null>{
        return await this.attendShiftRepository.find(id);
    }

    public async findByUserAndState(user_id: string, status: string): Promise<IAttendShift | null>{
        return await this.attendShiftRepository.findByUserAndState(user_id,status);
    }

    public async findBranchAndStatus(branch_id: string,date:string): Promise<IAttendShift[]>{
        return await this.attendShiftRepository.findByBranchAndStatus(branch_id,date);
    }

    public async create(user_id: string): Promise<any>{
        let user = await this.userRepository.find(user_id);
        let shifts = await this.shiftRepository.findByBranchAndDateStatus(user!.branch_department_id.toString(), moment().format('YYYY-MM-DD'),false);
        let shift: IShift | null = null;
        if(shifts.length == 0){
            throw new ApplicationException('Ya no existen turnos');
        }
        if(shifts.length > 0){
            shift = shifts[0];
        }
        if(!shift){
            throw new ApplicationException('Ya no existen turnos');
        }
        if(shift.status){
            throw new ApplicationException('Turno ya fue atendido');
        }
        let entity:any = {
            status: 'I',
            user_id: user_id,
            shift_id: shift._id,
            window: user?.window
        }
        //quitamos de la cola el turno
        let entry : any = {status: true}
        await this.shiftRepository.update(entity.shift_id.toString(), entry as IShift);

        return await this.attendShiftRepository.create(entity as IAttendShift);
    }

    public async update(id: string, entry: AttendShiftUpdateDto): Promise<void> {
        let originalEntry = await this.attendShiftRepository.find(id);
        if (originalEntry) {
            await this.attendShiftRepository.update(id, entry as any);
        } else {
            throw new ApplicationException('Turno no encontrado.');
        }
    }

    public async remove(id: string): Promise<void> {
        await this.attendShiftRepository.delete(id);
    }
}