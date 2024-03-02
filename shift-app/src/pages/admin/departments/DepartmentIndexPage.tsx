import React, { useContext, useEffect, useState } from 'react'
import { useBranch } from '../../../hooks/admin/useBranch';
import { Button, Col, Row, Space, Table, Tooltip } from 'antd';
import Title from 'antd/es/typography/Title';
import { BankOutlined, DeleteOutlined, EditOutlined, PlusCircleOutlined } from '@ant-design/icons';
import { IBranch, IDepartment } from '../../../interfaces/IAdmin';
import { UIContext } from '../../../context/UIContext';
import { Create } from './Create';
import { useDepartment } from '../../../hooks/admin/useDepartment';
import Swal from 'sweetalert2';

const initialState : IDepartment = {
  _id: "",
  name: "",
  code: ""
}

export const DepartmentIndexPage = () => {

      //columnas para mostrar en datatable
      const columns = [
        { title: 'Nombre', dataIndex: 'name', key: 'name' },
        { title: 'Código', dataIndex: 'code', key: 'code' },
        {
          title: 'Acciones',
          dataIndex: 'acciones',
          render: (_: string, record:IDepartment) => (
            <Space>
              <Tooltip title="editar">
                <Button  onClick={() => edit(record)} type='primary' shape="circle" icon={<EditOutlined />} />
              </Tooltip>
              <Tooltip title="eliminar">
                <Button  onClick={() => removeItem(record)} type='primary' shape="circle" icon={<DeleteOutlined />} />
              </Tooltip>
            </Space>
          )   
        },
      ];
  
  const {loading} = useContext(UIContext);
  const {items, getAll, remove} = useDepartment();
  const [visible, setVisible] = useState(false);
  const [formData, setFormData] = useState<IDepartment>(initialState);

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

  const edit = (item: IDepartment) => {
    setFormData(item);
    setVisible(true);
  }

  const removeItem = (item: IDepartment) => {
    Swal.fire({
      title: 'Esta seguro de eliminar registro '+item.name+' ?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Confirmar',
      cancelButtonText: 'Cancelar'
    }).then(async(result) => {
      if(result.isConfirmed){
        const resp = await remove(item._id);
        if (resp)getAll(); //listar los registros en caso exitosos
      }
    })
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
                    <Title level={3}><BankOutlined /> AREAS</Title>
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
