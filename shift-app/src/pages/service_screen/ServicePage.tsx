import { Button, Card, Col, Divider, Form, Input, InputNumber, Row, Space, Tooltip } from 'antd'
import Title from 'antd/es/typography/Title';
import React, { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../../context/auth/AuthContext';
import { disconnect } from 'process';
import { ArrowDownOutlined, ArrowRightOutlined, CloseOutlined, LogoutOutlined, SoundOutlined } from '@ant-design/icons';
import { UIContext } from '../../context/UIContext';
import { useUser } from '../../hooks/admin/useUser';
import { IAttendShift, IAttendShiftUpdate, IShift, IUser } from '../../interfaces/IAdmin';
import { useAttendShift } from '../../hooks/admin/useAttendShift';
import moment from 'moment';
import { notificationMessage } from '../../helpers/shared';

type FieldType = {
  window?: number;
};

interface IForm {
  window: number;
}

export const ServicePage = () => {

  const {setLoading, loading} = useContext(UIContext);
  const {user, logged, logout} = useContext(AuthContext);
  const [showForm, setShowForm] = useState<boolean>(true);
  const {update, updateWindow, item, getOne} = useUser();
  const {create:nextShift, update: finishShift, state_shift, findByUserAndState} = useAttendShift();

  useEffect(() => {
    if(user !== null && user !== undefined){
      getOne(user.id);
      findByUserAndState('I');
        }
    }, []);

  useEffect(() => {
    if(state_shift){
      console.log('estado_shift',state_shift);
    }
  }, [state_shift]);

  useEffect(() => {
    if(item !== null && item !== undefined){
      if(item.status){
        setShowForm(false);
      }
    }
  }, [item]);

  const onFinish = async(data: IForm) => {
    setLoading(true);
    if(user !== null){
      const resp = await updateWindow(user.id,{window: data.window, status: true, branch_department_id: user.branch_department_id});
      if(resp){setShowForm(false); getOne(user.id)}
    }
    setLoading(false); 
  };
  
  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };

  const disconnect = async()=>{
    if(state_shift){
      notificationMessage('error','Error','No se puede desconectar, tiene turnos pendientes de finalizar');
      return;
    }
    setLoading(true);
    if(user !== null){
      const resp = await updateWindow(user.id,{window: 0, status: false,branch_department_id: user.branch_department_id});
      if(resp){setShowForm(true); getOne(user.id)}
    }
    setLoading(false);
  }

  //siguiente
  const next = async() => {
    const finish_before = await updateStatus("F");
    if(finish_before == 'C'){
      setLoading(true);
      let resp = await nextShift();
      console.log(resp);
      if(resp){
        await findByUserAndState('I');
      }
      setLoading(false); 
    }
  };

  //actualizar estado (teminado, cancelado)
  const updateStatus=async(status: string)=>{
    let r = 'C';
    if(state_shift?._id == undefined) return r;
    var duration = moment.duration(moment().diff(moment(state_shift?.createdAt)));
    var minutes = duration.asMinutes();
    let data_update : IAttendShiftUpdate = {
      end: moment().format('YYYY-MM-DD HH:mm:ss'),
      tiempo: parseFloat(minutes.toFixed(2)),
      status: status
    }
    setLoading(true);
    const resp = await finishShift(state_shift?._id!, data_update);
    if(resp){
      await findByUserAndState('I');
      r = 'C';
    }else{
      r = 'S';
    }
    setLoading(false);
    return r;
  }
  

  return (
    <div>
      <Row>

      <Divider>
        <Card>  
            <Title style={{color: 'green'}} level={ 1 }>MODULO DE SERVICIO AREA {user?.department.toUpperCase()} </Title>
          
        </Card>
      </Divider>
        
      <Col span={24}>
       
        <Card>
          <Divider>
            <Card hidden={!showForm}>
              <Form
                  name="basic"
                  layout='vertical'
                  initialValues={{ remember: true }}
                  onFinish={onFinish}
                  onFinishFailed={onFinishFailed}
                  autoComplete="off"
                    >
                    <Form.Item<FieldType>
                        label="Ventanilla"
                        name="window"
                        rules={[
                          { required: true, message: 'Por favor ingrese número de ventanilla!' }
                        ]}
                        >
                        <InputNumber min={1} />
                        </Form.Item>

                        <Form.Item wrapperCol={{span: 24 }}>
                        <Button type="primary" htmlType="submit">
                            Connectarse
                        </Button>
                        </Form.Item>
                    </Form>
            </Card>
          </Divider>
          
          <Space> <b>Usuario: {item?.name + ' '+item?.lastname}</b> </Space><br />
          <Space> <b>Estado: </b><b style={{color: item?.status ? 'green': 'red'}}>{item?.status ? 'Online' : 'Offline'}</b> 
          <Tooltip title="Cerrar sesión">
            <Button onClick={logout} icon={<LogoutOutlined />} size='small' type='primary'> Salir</Button> 
            </Tooltip>
          </Space>
          <Title hidden={showForm} level={4}>VENTANILLA NO: {item?.window}</Title>
          <div hidden={showForm}>
            
          <Row gutter={16} hidden={showForm}>
            <Col span={12}>
              <Divider>ATENDIENDO TICKET</Divider>
              <Card style={{backgroundColor: '#1677ff'}}>
                <Title style={{color: 'white'}}>TICKET NO:  {state_shift?.number ?state_shift?.number: 'ningún ticket, presione siguiente' }</Title>
              </Card>
            </Col>
            <Col span={12}>
              <Divider>OPCIONES</Divider>
              <Card>
                <Space>
                  <Tooltip title="Llamar al siguiente turno">
                    <Button onClick={next} icon={<ArrowRightOutlined />} size='large' type='primary'>Siguiente</Button>
                  </Tooltip>

                  <Tooltip title="Volver a llamar al turno actualmente en pantalla">
                  <Button icon={<SoundOutlined/>}  size='large' type='primary'>Volver a llamar</Button>
                  </Tooltip>
                  
                  <Tooltip title="Cancelar turno (en caso espera)">
                    <Button onClick={()=>updateStatus('C')} icon={<ArrowDownOutlined />} size='large' type='primary' danger>Cancelar turno</Button>
                  </Tooltip>
                 
                  <Tooltip title="Desconectarse de la ventanilla">
                      
                  <Button icon={<CloseOutlined />} size='large' onClick={disconnect} type='primary'> Desconectarse</Button> 
                  </Tooltip>
                  
                </Space>
              </Card>
            </Col>
          </Row>
          </div>
        </Card>
        </Col>
      </Row>
    </div>
  )
}
