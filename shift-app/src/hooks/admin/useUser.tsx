import React, { useContext, useState } from 'react'
import { UIContext } from '../../context/UIContext';
import { notificationMessage } from '../../helpers/shared';
import api from '../../api/axios';
import { IBranchDepartment, IUser } from '../../interfaces/IAdmin';

export const useUser = () => {
    //loading para el datatable
   const {setLoading} = useContext(UIContext);
   //obtener data de paginación
  //const [data, setData] = useState<IPaginate>(initialState);
  //llenar lista
  const [items, setItems] = useState<IUser[]>([]);
  const [item, setItem] = useState<IUser>();
  const [items_branches, setItemsBranches] = useState<IBranchDepartment[]>([]);

    //lista inicial de data
    const getAll = async(page=0) => {
        setLoading(true);
        await api.get('/users').then(r=> {
            setItems(r.data);
        }).catch(e=>{
            
        });
        setLoading(false);
    }
    
    const getOne = async(id:string) => {
        setLoading(true);
        await api.get('/users/'+id).then(r=> {
            setItem(r.data);
        }).catch(e=>{
            
        });
        setLoading(false);
    } 

    //lista inicial de data
    const getAllBranchesDepartments = async() => {
        setLoading(true);
        await api.get('/branches_departments').then(r=> {
            setItemsBranches(r.data);
        }).catch(e=>{
            
        });
        setLoading(false);
    } 

        //crear registro
        const create = async(data: IUser) => {
            let resp = false;
            setLoading(true);
            await api.post(`/users`, data).then(r=> {
                notificationMessage('success','Éxito','Usuario ha sido creada');
                resp = true;
            }).catch(e=>{
                notificationMessage('error','Error',e.message);
            });
            setLoading(false);
            return resp;
        }
    
        //actualizar registro
        const update = async(id:string, data: IUser) => {
            let resp = false;
            setLoading(true);
            await api.put(`/users/${id}`,data).then(r=> {
                notificationMessage('success','Éxito','Usuario há sido actualizada');
                resp = true;
            }).catch(e=>{
                notificationMessage('error','Error',e.message);
            });
            setLoading(false);
            return resp;
        }

        //actualizar registro
        const updateWindow = async(id:string, data:any) => {
            let resp = false;
            setLoading(true);
            await api.put(`/users/window/${id}`,data).then(r=> {
                notificationMessage('success','Éxito','Usted está asignado a ventanilla no. '+data.window);
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
            await api.delete(`/users/${id}`).then(r=> {
                notificationMessage('success','Éxito','Usuario eliminado con éxito');
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
    getAllBranchesDepartments,
    items_branches,
    items,
    updateWindow,
    item,
    getOne
  }
}
