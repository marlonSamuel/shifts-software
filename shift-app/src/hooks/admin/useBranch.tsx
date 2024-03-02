import React, { useContext, useState } from 'react'
import { UIContext } from '../../context/UIContext';
import { IPaginate } from '../../interfaces/IApp';
import { initialState, notificationMessage } from '../../helpers/shared';
import { IBranch } from '../../interfaces/IAdmin';
import api from '../../api/axios';

export const useBranch = () => {
    //loading para el datatable
   const {setLoading} = useContext(UIContext);
   //obtener data de paginación
  //const [data, setData] = useState<IPaginate>(initialState);
  //llenar lista
  const [items, setItems] = useState<IBranch[]>([]);

    //lista inicial de data
    const getAll = async(page=0) => {
        setLoading(true);
        await api.get('/branches').then(r=> {
            setItems(r.data);
        }).catch(e=>{
            
        });
        setLoading(false);
    } 

        //crear registro
        const create = async(data: IBranch) => {
            let resp = false;
            setLoading(true);
            await api.post(`/branches`, data).then(r=> {
                notificationMessage('success','Éxito','Sucursal ha sido creada');
                resp = true;
            }).catch(e=>{
                notificationMessage('error','Error',e.message);
            });
            setLoading(false);
            return resp;
        }
    
        //actualizar registro
        const update = async(id:string, data: IBranch) => {
            let resp = false;
            setLoading(true);
            await api.put(`/branches/${id}`,data).then(r=> {
                notificationMessage('success','Éxito','Sucursal há sido actualizada');
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
                notificationMessage('success','Éxito','Sucursal eliminado con éxito');
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
    update,
    items
  }
}
