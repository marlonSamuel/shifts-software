import { Button, Form, Input, Modal, Spin } from 'antd';
import React, { useEffect, useState } from 'react'
import { useBranch } from '../../../hooks/admin/useBranch';
import { IBranch } from '../../../interfaces/IAdmin';
import { SaveOutlined, UndoOutlined } from '@ant-design/icons';

interface IForm {
    visible: boolean,
    onFinish: (success: boolean)=> void,
    formData: IBranch
  }
  

export const Create = ({ visible, onFinish, formData }: IForm) => {
    const [form] = Form.useForm();
    const {create,update} = useBranch();
    const [title, setTitle] = useState('Nuevo registro');
    const [confirmLoading, setConfirmLoading] = useState(false);

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
      <Form.Item
        name="code"
        key="code"
        label="Código de sucursal"
        rules={[
          {
            required: true,
            message: 'El código dirección es requerido!',
          },
        ]}
      >
        <Input name='dir' />
      </Form.Item>
      <Form.Item
        name="dir"
        key="dir"
        label="Dirección"
        rules={[
          {
            required: true,
            message: 'El campo dirección es requerido!',
          },
        ]}
      >
        <Input name='dir' />
      </Form.Item>
    </Form>
  
  </Modal>
  )
}
