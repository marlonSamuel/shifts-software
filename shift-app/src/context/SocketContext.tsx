import { createContext, useContext, useEffect, useState } from "react";
import moment from 'moment'
import { useSocket } from "../hooks/useSocket";
import { AuthContext } from "./auth/AuthContext";
import { ShiftContext } from "./shift/ShiftContext";

export interface SocketContextProps {
    message: string;
    socket: any;
}

//crear context
export const SocketContext = createContext({} as SocketContextProps);
//crear el provider
export const SocketProvider = ({ children }: any) => {
    const {user} = useContext(AuthContext);
    const {socket } = useSocket('http://localhost:8080');
    const [message,setMessage] = useState("");
    const {getAllShifts,getAttendedShift} = useContext(ShiftContext);


    useEffect(() => {
      console.log("usfer socket context",user)
    }, [user])
    

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

    useEffect(() => {
        socket?.on( 'send-list-new', (branch_id:string) => {
            console.log("send-list-new",branch_id)
            getAllShifts(branch_id);
        } )
    }, []);

    useEffect(() => {
        socket?.on( 'list-attended', (branch_id:string) => {
            console.log("llego attended",branch_id)
            getAttendedShift(branch_id,moment().format('YYYY-MM-DD'));
            getAllShifts(branch_id);
        } )
    }, []);


    return (
        <SocketContext.Provider value={{
            socket,
            message
        }}>
            {children}
        </SocketContext.Provider>
    )
}