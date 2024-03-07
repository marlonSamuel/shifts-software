import React, { useContext, useState } from 'react'
import { UIContext } from '../../context/UIContext';
import { IPaginate } from '../../interfaces/IApp';
import { initialState, notificationMessage } from '../../helpers/shared';
import { IBranch, IShift } from '../../interfaces/IAdmin';
import api from '../../api/axios';

export const useShift = () => {
        //loading para el datatable
    const {setLoading} = useContext(UIContext);
    //obtener data de paginación
    //const [data, setData] = useState<IPaginate>(initialState);
    //llenar lista
    const [items, setItems] = useState<IShift[]>([]);
    const [shifts, setShifts] = useState<IShift[]>([]);

    //lista inicial de data
    const getAll = async(page=0) => {
        setLoading(true);
        await api.get('/shifts').then(r=> {
            setItems(r.data);
        }).catch(e=>{
            
        });
        setLoading(false);
    } 

    //lista inicial de data
    const getAllShifts = async(branch_id: string) => {
        setLoading(true);
        await api.get('/shifts/today/'+branch_id).then(r=> {
            setShifts(r.data);
        }).catch(e=>{
            
        });
        setLoading(false);
    } 

        //crear registro
        const create = async(data: IShift) => {
            let resp :any = {};
            setLoading(true);
            await api.post(`/shifts`, data).then(r=> {
                notificationMessage('success','Éxito','Ticket ingresado con éxito');
                resp = r.data;
            }).catch(e=>{
                notificationMessage('error','Error',e.message);
            });
            setLoading(false);
            return resp;
        }

        //actualizar registro
        const update = async(id:string, data: IShift) => {
            let resp = false;
            setLoading(true);
            await api.put(`/shifts/${id}`,data).then(r=> {
                notificationMessage('success','Éxito','Ticket há sido actualizada');
                resp = true;
            }).catch(e=>{
                notificationMessage('error','Error',e.message);
            });
            setLoading(false);
            return resp;
        }

        //eliminar registro
        const remove = async(id:string) => {
            let resp = false;
            setLoading(true);
            await api.delete(`/branches/${id}`).then(r=> {
                notificationMessage('success','Éxito','Ticket eliminado con éxito');
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
    getAllShifts,
    shifts
  }
}
