import { ApplicationException } from "../common/exceptions/application.exception";
import { AttendShiftCreateDto, AttendShiftUpdateDto } from "../dtos/attend_shift.dto";
import { ShiftCreateDto } from "../dtos/shift.dto";
import { AttendShiftRepository } from "./repositories/attend_shift.repository";
import { IAttendShift } from "./repositories/domain/attend_shift";
import { IShift } from "./repositories/domain/shift";
import { ShiftRepository } from "./repositories/shift.repository";

export class AttendShiftService {
    constructor(
        private readonly attendShiftRepository: AttendShiftRepository,
        private readonly shiftRepository: ShiftRepository
    ){}

    public async all(): Promise<IAttendShift[]> {
        return await this.attendShiftRepository.all();
    }

    public async find(id: String): Promise<IAttendShift | null>{
        return await this.attendShiftRepository.find(id);
    }

    public async create(entity: AttendShiftCreateDto): Promise<any>{
        let shift = await this.shiftRepository.find(entity.shift_id);
        if(!shift){
            throw new ApplicationException('Turno no encontrado.');
        }
        if(shift.status){
            throw new ApplicationException('Turno ya fue atendido');
        }
        
        entity.status = 'I';
        //quitamos de la cola la otra
        let entry : any = {status: true}
        await this.shiftRepository.update(entity.shift_id.toString(), entry as IShift);

        return await this.attendShiftRepository.create(entity as IAttendShift);
    }

    public async update(id: string, entry: AttendShiftUpdateDto): Promise<void> {
        let originalEntry = await this.attendShiftRepository.find(id);
        if (originalEntry) {
            await this.attendShiftRepository.update(id, entry as IAttendShift);
        } else {
            throw new ApplicationException('Turno no encontrado.');
        }
    }

    public async remove(id: string): Promise<void> {
        await this.attendShiftRepository.delete(id);
    }
}