import React, { useContext, useState } from 'react'
import { UIContext } from '../../context/UIContext';
import { IPaginate } from '../../interfaces/IApp';
import { initialState, notificationMessage } from '../../helpers/shared';
import { IBranch, IRole } from '../../interfaces/IAdmin';
import api from '../../api/axios';

export const useRole = () => {
    //loading para el datatable
   const {setLoading} = useContext(UIContext);
   //obtener data de paginación
  //const [data, setData] = useState<IPaginate>(initialState);
  //llenar lista
  const [items, setItems] = useState<IRole[]>([]);

    //lista inicial de data
    const getAll = async(page=0) => {
        setLoading(true);
        await api.get('/roles').then(r=> {
            setItems(r.data);
        }).catch(e=>{
            
        });
        setLoading(false);
    } 

  return {
    getAll,
    items
  }
}
