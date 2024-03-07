import { Button, Col, Form, Input, Modal, Row, Select, Spin } from 'antd';
import React, { useContext, useEffect, useState } from 'react'
import {IBranchDepartment, IDepartment, IRole, IUser } from '../../../interfaces/IAdmin';
import { SaveOutlined, UndoOutlined } from '@ant-design/icons';
import { useDepartment } from '../../../hooks/admin/useDepartment';
import { useUser } from '../../../hooks/admin/useUser';
import { useRole } from '../../../hooks/admin/useRole';
import { Option } from 'antd/es/mentions';
import { UIContext } from '../../../context/UIContext';

interface IForm {
    visible: boolean,
    onFinish: (success: boolean)=> void,
    formData: IUser
  }
  

export const Create = ({ visible, onFinish, formData }: IForm) => {
    const [form] = Form.useForm();
    const {create,update, items_branches, getAllBranchesDepartments} = useUser();
    const [title, setTitle] = useState('Nuevo registro');
    const [confirmLoading, setConfirmLoading] = useState(false);
    const {items: roles, getAll: getRoles} = useRole();
    const {loading} = useContext(UIContext);


    useEffect(() => {
      getRoles();
      getAllBranchesDepartments();
    }, []);

      //evaluando para setear el titulo y la data a editar
    useEffect(() => {
        form.setFieldsValue(formData);
        setTitle( formData._id.length > 0 ? 'Editar registro '+formData.name: 'Nuevo registro');
    }, [formData])
    
    const onCreate = async(values: any) => {
        setConfirmLoading(true);
        if(formData._id.length == 0){
        const resp = await create(values);
        if(resp) onFinish(true);
        }else{
        values = {
            ...values,
            id: formData._id
        }
        const resp = await update(formData._id, values);
        if(resp) onFinish(true);
        }
        setConfirmLoading(false);
    }
    
    //volver
    const onReturn = () => {
        form.resetFields();
        onFinish(false);
    }

    //pre validación antes de en enviar.
    const validate = () => {
        form.validateFields().then((values) => {
            //form.resetFields();
            onCreate(values);
        }).catch(e=>{

        });
    }

  return (
    <Modal
    width={800}
    open={visible}
    maskClosable={false}
    forceRender
    title={title}
    footer={[
      <Spin key="spin" spinning={confirmLoading} size="large" tip="cargando...">
        <Button key="cancel" size='small' onClick={onReturn} icon={<UndoOutlined/>} type='primary' danger>
              Volver
        </Button>&nbsp;
        <Button key="save" size='small' onClick={validate} icon={<SaveOutlined/>} type='primary'>
          Guardar
        </Button>
      </Spin>
    ]}
    onCancel={()=>onFinish(false)}
    onOk={validate}
  >
  
    <Form
      form={form}
      key="form"
      layout="vertical"
      name="form_in_modal"
      size='small'
    >
      <Row gutter={16}>
        <Col span={12}>
        <Form.Item
          name="name"
          key="name"
          label="Nombre"
          rules={[
            {
              required: true,
              message: 'El campo nombre es requerido!',
            },
          ]}
        >
          <Input name='name' />
        </Form.Item>
        </Col>
        <Col span={12}>
        <Form.Item
        name="lastname"
        key="lastname"
        label="Apellido"
        rules={[
          {
            required: true,
            message: 'El campo apellido es requerido!',
          },
        ]}
      >
        <Input name='lastname' />
      </Form.Item>
        </Col>
      </Row>

      <Row gutter={16}>
        <Col span={12}>
        <Form.Item
        name="cui"
        key="cui"
        label="DPI"
        rules={[
          {
            required: true,
            message: 'El campo dpi es requerido!',
          },
          {
            max: 13,
            message: 'El dpi no puede tener mas de 13 digitos'
          },
          {
            min: 13,
            message: 'El dpi no puede tener menos de 13 digitos'
          }
        ]}
      >
        <Input name='cui' />
      </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item
          name="cellphone"
          key="cellphone"
          label="Teléfono"
          rules={[
            {
              required: true,
              message: 'El campo teléfono es requerido!',
            },
          {
            max: 8,
            message: 'El número de telefono debe contener 8 digitos'
          },
          {
            min: 8,
            message: 'El número de telefono debe contener 8 digitos'
          }
          ]}
        >
          <Input name='cellphone' type='number' />
        </Form.Item>
        </Col>
      </Row>
      
      <Row gutter={16}>
        <Col className="gutter-row" xs={{span: 24}} lg={{span: 8}}>
            <Form.Item
                name="role_id"
                key="role_id"
                label="Rol"
                rules={[
                {
                    required: true,
                    message: 'el campo rol es requerido!',
                },
                ]}
            >
            <Select
                key='rol'
                placeholder="Seleccione categoría"
                loading={loading}
                showSearch
                filterOption={(input: any, option: any) =>
                    option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                }
                allowClear
                >
                {
                    roles.map((c: IRole) => (
                    <Select.Option key={c._id.toString()} value={c._id.toString()}>{c.name}</Select.Option>
                    ))
                }
                </Select>
            </Form.Item>
        </Col>
        <Col span={8}>
          <Form.Item
          name="username"
          key="username"
          label="Usuario"
          rules={[
            {
              required: true,
              message: 'El usuario apellido es requerido!',
            },
          ]}
        >
          <Input name='username' />
        </Form.Item>
        </Col>
        <Col span={8}>
          <Form.Item
          hidden={formData._id.length > 0}
          name="password"
          key="password"
          label="Contraseña"
          rules={[
            {
              required: true,
              message: 'La contraseña es requerido!',
            },
          ]}
        >
          <Input name='password' type='password' />
        </Form.Item>
        </Col>
      </Row>

      <Row gutter={16}>
        <Col className="gutter-row" xs={{span: 24}} lg={{span: 12}}>
            <Form.Item
                name="branch_department_id"
                key="branch_department_id"
                label="Sucursal / Área"
                rules={[
                {
                    required: true,
                    message: 'el sucursal área es requerido!',
                },
                ]}
            >
            <Select
                key='branch_department_id'
                placeholder="Seleccione sucursal/area"
                loading={loading}
                showSearch
                filterOption={(input: any, option: any) =>
                    option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                }
                allowClear
                >
                {
                    items_branches.map((c: IBranchDepartment) => (
                    <Select.Option key={c._id.toString()} value={c._id.toString()}>{c.branch} / {c.department}</Select.Option>
                    ))
                }
                </Select>
            </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item
          name="email"
          key="email"
          label="email"
        >
          <Input name='username' />
        </Form.Item>
        </Col>
      </Row>

    </Form>
  
  </Modal>
  )
}
