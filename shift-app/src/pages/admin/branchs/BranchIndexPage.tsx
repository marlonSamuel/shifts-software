import React, { useContext, useEffect, useState } from 'react'
import { useBranch } from '../../../hooks/admin/useBranch';
import { Button, Col, Row, Space, Table, Tooltip } from 'antd';
import Title from 'antd/es/typography/Title';
import { BankOutlined, DeleteOutlined, EditOutlined, PlusCircleOutlined } from '@ant-design/icons';
import { IBranch } from '../../../interfaces/IAdmin';
import { UIContext } from '../../../context/UIContext';
import { Create } from './Create';

const initialState : IBranch = {
  _id: "",
  name: "",
  dir: "",
  code: ""
}

export const BranchIndexPage = () => {

      //columnas para mostrar en datatable
      const columns = [
        { title: 'Nombre', dataIndex: 'name', key: 'name' },
        { title: 'Código', dataIndex: 'code', key: 'code' },
        { title: 'Direccion', dataIndex: 'dir', key: 'dir' },
        {
          title: 'Acciones',
          dataIndex: 'acciones',
          render: (_: string, record:IBranch) => (
            <Space>
              <Tooltip title="editar">
                <Button  onClick={() => edit(record)} type='primary' shape="circle" icon={<EditOutlined />} />
              </Tooltip>
            </Space>
          )   
        },
      ];
  
  const {loading} = useContext(UIContext);
  const {items, getAll} = useBranch();
  const [visible, setVisible] = useState(false);
  const [formData, setFormData] = useState<IBranch>(initialState);

  useEffect(() => {
    getAll();
  }, []);

  //salir de modal evaluar si es cancelar o registro exitoso
  const onFinish = (success:boolean) => {
    console.log("onfinsh");
    setVisible(false);
    setFormData(initialState);
    //si se realizó correctamente la operación, obtenemos de nuevo los registros
    if(success) getAll();
  }

  const edit = (item: IBranch) => {
    setFormData(item);
    setVisible(true);
  }

  const removeItem = (item: IBranch) => {

  }

  return (
    <div>
          <Create 
            visible={visible}
            onFinish={onFinish}
            formData={formData}
          />
              <Row>
                <Col span={20}>
                    <Title level={3}><BankOutlined /> SUCURSSALES</Title>
                </Col>
                <div style={{}}>
                <Button onClick={()=>{setVisible(true)}}  icon={<PlusCircleOutlined/>} size='small' type="primary">
                       Nuevo 
                </Button>
                </div>
            </Row>

            <Table
                rowKey="_id" 
                columns={columns}
                loading={loading}
                size='small'
                dataSource={items}
                scroll={{x:20}}
                /* expandable={{
                    expandedRowRender: record => 
                        <p style={{ margin: 0 }}>{record.os}
                    </p>,
                  }} */ />
    </div>
  )
}
