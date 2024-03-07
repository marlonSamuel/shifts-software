import React, { useContext, useState } from 'react'
import { UIContext } from '../../context/UIContext';
import { IPaginate } from '../../interfaces/IApp';
import { initialState, notificationMessage } from '../../helpers/shared';
import { IAttendShift, IAttendShiftUpdate, IBranch, IShift, IShiftActive } from '../../interfaces/IAdmin';
import api from '../../api/axios';

export const useAttendShift = () => {
        //loading para el datatable
    const {setLoading} = useContext(UIContext);
    //obtener data de paginación
    //const [data, setData] = useState<IPaginate>(initialState);
    //llenar lista
    const [items, setItems] = useState<IAttendShift[]>([]);
    const [shifts, setShifts] = useState<IAttendShift[]>([]);
    const [state_shift, setStateShift] = useState<IShiftActive>();

    //lista inicial de data
    const getAll = async() => {
        setLoading(true);
        await api.get('/attend_shifts').then(r=> {
            setItems(r.data);
        }).catch(e=>{
            
        });
        setLoading(false);
    } 

    //lista inicial de data
    const findByUserAndState = async(state:string) => {
        setLoading(true);
        await api.get('/attend_shifts/status/'+state).then(r=> {
            setStateShift(r.data);
        }).catch(e=>{
            
        });
        setLoading(false);
    } 

    //crear registro
    const create = async() => {
        let resp :any = {};
        setLoading(true);
        await api.post(`/attend_shifts`).then(r=> {
            notificationMessage('success','Éxito','Turno recibido con éxito');
            resp = r.data;
        }).catch(e=>{
            notificationMessage('error','Error',e.message);
        });
        setLoading(false);
        return resp;
    }

    //actualizar registro
    const update = async(id:string, data: IAttendShiftUpdate) => {
        let resp = false;
        setLoading(true);
        await api.put(`/attend_shifts/${id}`,data).then(r=> {
            notificationMessage('success','Éxito','Turno '+(data.status == 'F' ? 'Finalizado':'Cancelado')+' con éxito');
            resp = true;
        }).catch(e=>{
            notificationMessage('error','Error',e.message);
        });
        setLoading(false);
        return resp;
    }

  return {
    getAll,
    create,
    items,
    shifts,
    update,
    state_shift,
    findByUserAndState
  }
}
