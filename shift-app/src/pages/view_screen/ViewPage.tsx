import { Button, Card, Col, Divider, List, Row, Tag, Typography } from 'antd'
import React, { useContext, useEffect, useState } from 'react'
import { useShift } from '../../hooks/admin/useShift';
import { AuthContext } from '../../context/auth/AuthContext';
import { useAttendShift } from '../../hooks/admin/useAttendShift';
import moment from 'moment';
import { IShiftFinished } from '../../interfaces/IAdmin';
import { SocketContext } from '../../context/SocketContext';
import { ShiftContext } from '../../context/shift/ShiftContext';

const { Title, Text } = Typography;

export const ViewPage = () => {
  const {user} = useContext(AuthContext);
  const {attended_shift, getAttendedShift, getAllShifts, shifts} = useContext(ShiftContext);
  const [inicied_shifts, setIniciedShifts] = useState<IShiftFinished[]>([]);
  const [finished_shifts, setFinishedShifts] = useState<IShiftFinished[]>([]);
  const [message, setMessage] = useState("");
  const {socket} = useContext(SocketContext);

  useEffect(() => {
    socket?.on( 'send-shift', (data:any) => {
      setMessage(data.msg);
      callTicket(data.msg);
  } )
  }, [socket]);
  

  useEffect(() => {
    if(user?.branch_id !== undefined){
      getAllShifts(user.branch_id);
      getAttendedShift(user.branch_id, moment().format('YYYY-MM-DD'));
    }
  }, []);

  useEffect(() => {
    setIniciedShifts(attended_shift.filter(x=>x.status === "I"));
    setFinishedShifts((attended_shift.filter(x=>x.status !== "I")).reverse());
  }, [attended_shift]);

  const callTicket = async(message: string) => {
    console.log("entro a speech "+message);
    const utterance = new SpeechSynthesisUtterance(message);
    // Select a voice
    const voices = speechSynthesis.getVoices();
    utterance.voice = voices[0]; // Choose a specific voice
    // Speak the text
    speechSynthesis.speak(utterance);
  }

  return (
    <div>
      <Row>
        <Button onClick={()=>callTicket("prueba A D")}></Button>
      <Divider>
        <Card>  
            <Title style={{color: 'green'}} level={ 1 }>{message.toUpperCase()}</Title>
          
        </Card>
        </Divider>
      </Row>
      <Title level={ 1 }>Atendiendo al cliente</Title>
      <Row gutter={16}>
        <Col span={16}>

        <List
          grid={{
            gutter: 16,
            xs: 1,
            sm: 2,
            md: 4,
            lg: 4,
            xl: 6,
            xxl: 3,
          }}
          dataSource={inicied_shifts}
          renderItem={item => (
            <List.Item>
                <Card hoverable
                          style={{ width: 400, marginTop: 16, color: 'green',border: '3px solid' }}
                          actions={[
                              <Tag color="green"> AREA: { item.deparment } </Tag>,
                              <Tag color="magenta"> VENTANILLA NO: { item.window } </Tag>,
                          ]}
                      >
                          <Title> No. { item.number  }</Title>
                      </Card>
            </List.Item>
          )}
        />
        </Col>
        <Col span={8}>
            <Divider>
                Turnos en espera
            </Divider>
            <List 
                dataSource={ shifts.slice(0,5) }
                renderItem={ item => (
                    <List.Item>
                        <List.Item.Meta 
                            title={ `Ticket No. ${ item.number }` }
                            description={
                                <>
                                    <Text type="secondary"> Area: </Text>
                                    <Tag color="volcano"> { item.department } </Tag>
                                </>
                            }
                        />
                    </List.Item>
                )}
            
            />
            <Divider>
              Historico
            </Divider>
            <List 
                        dataSource={ finished_shifts }
                        renderItem={ item  => (
                            <List.Item>
                                <List.Item.Meta 
                                    title={ `Ticket No. ${ item.number }` }
                                    description={
                                        <>
                                            <Text type="secondary">En la ventanilla: </Text>
                                            <Tag color="magenta"> { item.window } </Tag>
                                            <Text type="secondary"> Agente: </Text>
                                            <Tag color="volcano"> { item.name_user+' '+item.lastname_user } </Tag>
                                            <Text type="secondary"> Area: </Text>
                                            <Tag color="volcano"> { item.deparment } </Tag>
                                        </>
                                    }
                                />
                            </List.Item>
                        )}
                    
                    />
        </Col>
      </Row>
    </div>
  )
}
