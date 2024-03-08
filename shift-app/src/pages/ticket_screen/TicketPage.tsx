import { Button, Card, Divider, List, Modal, Space, Tooltip } from 'antd';
import React, { useContext, useEffect, useState } from 'react'
import { useDepartment } from '../../hooks/admin/useDepartment';
import Title from 'antd/es/typography/Title';
import { LogoutOutlined, PrinterOutlined } from '@ant-design/icons';
import { AuthContext } from '../../context/auth/AuthContext';
import { useShift } from '../../hooks/admin/useShift';
import { useBranch } from '../../hooks/admin/useBranch';
import { IBranchDepartment, IShift } from '../../interfaces/IAdmin';
import { UIContext } from '../../context/UIContext';
import { SocketContext } from '../../context/SocketContext';

export const TicketPage = () => {
  const {user,logout} = useContext(AuthContext);
  const {loading, setLoading} = useContext(UIContext);
  const {departments, getAllDepartmentsByBranch} = useBranch();
  const {socket} = useContext(SocketContext);

  const [ticket, setTicket] = useState({
    number: "",
    area: ""
  });
  const {create} = useShift();

  useEffect(() => {
    if(user?.branch_id !== undefined){
      getAllDepartmentsByBranch(user.branch_id);
    }
   
  }, []);

  useEffect(() => {
    if(ticket.number !== "" && ticket.number != undefined && ticket.number !== null){
      info()
    }
  }, [ticket]);


  const createShift = async (item: IBranchDepartment) => {
    console.log(item)
    setLoading(true);
      const resp = await create({branch_department_id: item._id, branch_id: item.branch_id} as IShift);
      setTicket({
        number: resp.number,
        area: item.department.toString()
      })

      socket.emit("list-new",user?.branch_id);
      
    setLoading(false);
  }

  const info = () => {
    Modal.info({
      title: 'TICKET GENERADO',
      okText: "Imprimir",
      content: (
        <div>
          <p><b>TICKET NO: </b> <b style={{color: 'green'}}>{ticket.number}</b></p>
          <p><b>Área: </b><b style={{color: 'green'}}>{ticket.area}</b></p>
        </div>
      ),
      onOk() {
        setTicket({
          number: '',
          area: ''
        })
      },
    });
  };
  

  return (
    <div>

      <Divider>
        <Card>  
            <Title style={{color: 'green'}} level={ 1 }>MODULO DE IMPRESIÓN DE TICKETS</Title>
          
        </Card>
      </Divider>

      <Space> <b>Usuario: {user?.name + ' '+user?.lastname}</b> <Tooltip title="Cerrar sesión">
            <Button onClick={logout} icon={<LogoutOutlined />} size='small' type='primary'> Salir</Button> 
            </Tooltip></Space><br />

    <Divider></Divider>

    <List
      loading={loading}
      grid={{ gutter: 16, column: 3 }}
      dataSource={departments}
      renderItem={(item) => (
        <List.Item onClick={() => createShift(item)}>
          <Tooltip title={"Generar ticket area de "+item.department}>
            <Card hoverable style={{border: '3px solid', color:'white', backgroundColor: '#1677ff'}}>
              <Title style={{color: 'white'}}>{item.department}</Title>
            </Card>
          </Tooltip>
        </List.Item>
      )}
    />
    </div>
  )
}
