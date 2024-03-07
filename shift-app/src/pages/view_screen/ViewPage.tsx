import { Button, Card, Col, Divider, List, Row, Tag, Typography } from 'antd'
import React, { useContext, useEffect } from 'react'
import { useShift } from '../../hooks/admin/useShift';
import { AuthContext } from '../../context/auth/AuthContext';

const { Title, Text } = Typography;

const data:any = [];

export const ViewPage = () => {
  const {user} = useContext(AuthContext);
  const {shifts,getAllShifts} = useShift();

  useEffect(() => {
    if(user?.branch_id !== undefined){
      getAllShifts(user.branch_id);
    }
  }, []);

  const callTicket = () => {
    const utterance = new SpeechSynthesisUtterance("LLAMANDO A TICKET NUMERO 454, POR FAVOR PASAR A VENTANILLA NO 5");
    // Select a voice
    const voices = speechSynthesis.getVoices();
    utterance.voice = voices[0]; // Choose a specific voice
    // Speak the text
    speechSynthesis.speak(utterance);
  }

  return (
    <div>
      <Row>
        
      <Divider>
        <Card>  
            <Title style={{color: 'green'}} level={ 1 }>LLAMANDO A TICKET NO 454 PASAR A VENTANILLA NO 5</Title>
          
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
          dataSource={data}
          renderItem={(item:any) => (
            <List.Item>
                <Card hoverable
                          style={{ width: 400, marginTop: 16, color: 'green',border: '3px solid' }}
                          actions={[
                              <Tag color="green"> { item.number } </Tag>,
                              <Tag color="magenta"> Escritorio: { item.number } </Tag>,
                              <Tag color="green"> { item.number } </Tag>,
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
                        dataSource={ data }
                        renderItem={ (item: any) => (
                            <List.Item>
                                <List.Item.Meta 
                                    title={ `Ticket No. ${ item.number }` }
                                    description={
                                        <>
                                            <Text type="secondary">En el escritorio: </Text>
                                            <Tag color="magenta"> { item.number } </Tag>
                                            <Text type="secondary"> Agente: </Text>
                                            <Tag color="volcano"> { item.number } </Tag>
                                            <Text type="secondary"> Area: </Text>
                                            <Tag color="volcano"> { item.number } </Tag>
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
