import React, { useContext, useState } from 'react'
import { UIContext } from '../../context/UIContext';
import { IPaginate } from '../../interfaces/IApp';
import { initialState, notificationMessage } from '../../helpers/shared';
import { IBranch, IDepartment } from '../../interfaces/IAdmin';
import api from '../../api/axios';

export const useDepartment = () => {
    //loading para el datatable
   const {setLoading} = useContext(UIContext);
   //obtener data de paginación
  //const [data, setData] = useState<IPaginate>(initialState);
  //llenar lista
  const [items, setItems] = useState<IDepartment[]>([]);

    //lista inicial de data
    const getAll = async(page=0) => {
        setLoading(true);
        await api.get('/departments').then(r=> {
            setItems(r.data);
        }).catch(e=>{
            
        });
        setLoading(false);
    } 

        //crear registro
        const create = async(data: IDepartment) => {
            let resp = false;
            setLoading(true);
            await api.post(`/departments`, data).then(r=> {
                notificationMessage('success','Éxito','Área ha sido creada');
                resp = true;
            }).catch(e=>{
                notificationMessage('error','Error',e.message);
            });
            setLoading(false);
            return resp;
        }
    
        //actualizar registro
        const update = async(id:string, data: IDepartment) => {
            let resp = false;
            setLoading(true);
            await api.put(`/departments/${id}`,data).then(r=> {
                notificationMessage('success','Éxito','Área há sido actualizada');
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
            await api.delete(`/departments/${id}`).then(r=> {
                notificationMessage('success','Éxito','Área eliminado con éxito');
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
    remove,
    items
  }
}
