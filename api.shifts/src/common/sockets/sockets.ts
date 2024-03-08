import { Socket } from 'socket.io';
import { ObjectId } from 'mongodb';

export class Sockets {
    io: any = null;

    constructor( io:any ){
        this.io = io;
        //crear la instancia de nuestro ticketList
        this.socketEvents();
    }

    socketEvents(){
        //On connection
        this.io.on('connection', (socket:Socket) => {

            //listen event: client-to-server
            socket.on("call-shift",(data)=> {
                this.io.emit("send-shift",data);
            })   
            
            //liste new shift created
            socket.on("list-new",(data)=> {
                console.log("list-new",data)
                this.io.emit("send-list-new",data);
            }) 

            //listen new shift attended
            socket.on("list-attended",(branch_id)=> {
                console.log("attended", branch_id);
                this.io.emit("list-attended",branch_id);
            })  

        });

    }
}