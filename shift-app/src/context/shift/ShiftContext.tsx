import { createContext, useContext, useEffect, useState } from "react";
import moment from 'moment'
import { IAttendShift, IShift, IShiftActive, IShiftFinished } from "../../interfaces/IAdmin";
import { UIContext } from "../UIContext";
import api from "../../api/axios";

export interface ShiftContextProps {
    shifts: IShift[];
    attended_shift: IShiftFinished[];
    state_shift: IShiftActive | undefined;
    findByUserAndState: (state: string)=>void;
    getAttendedShift: (branch_id: string, date:string) =>void;
    getAllShifts: (branch_id: string) =>void;
}

//crear context
export const ShiftContext = createContext({} as ShiftContextProps);
//crear el provider
export const ShiftProvider = ({ children }: any) => {

    const {setLoading} = useContext(UIContext);
    const [shifts, setShifts] = useState<IShift[]>([]);
    const [state_shift, setStateShift] = useState<IShiftActive>();
    const [attended_shift, setAttendedShift] = useState<IShiftFinished[]>([]);

    /*     useEffect(() => {
            if ( user?.id ) {
                conectarSocket();
            }
        }, [ user, conectarSocket ]); */

    /*     useEffect(() => {
            if ( !user?.id ) {
                desconectarSocket();
            }
        }, [ user, desconectarSocket ]); */

        //escuchar los cambios en los usuario conectados
    useEffect(() => {
        
    }, []);

    //lista inicial de data
    const getAllShifts = async(branch_id: string) => {
        setLoading(true);
        await api.get('/shifts/today/'+branch_id).then(r=> {
            setShifts(r.data);
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

    
    //lista inicial de data
    const getAttendedShift = async(branch_id:string,date: string) => {
        setLoading(true);
        await api.get('/attend_shifts/branch_date/'+branch_id+'/'+date).then(r=> {
            setAttendedShift(r.data);
        }).catch(e=>{
            
        });
        setLoading(false);
    } 


    return (
        <ShiftContext.Provider value={{
            shifts,
            state_shift,
            attended_shift,
            findByUserAndState,
            getAttendedShift,
            getAllShifts
        }}>
            {children}
        </ShiftContext.Provider>
    )
}