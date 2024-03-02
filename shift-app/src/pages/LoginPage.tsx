import React, { useContext, useEffect } from 'react';
import { Button, Typography, Form, Input,Card, Flex, } from 'antd';
import { Col, Row } from 'antd';
import { AuthContext } from '../context/auth/AuthContext';
import Swal from 'sweetalert2';
import { UIContext } from '../context/UIContext';

const cardStyle: React.CSSProperties = {
  width: 700,
};

const imgStyle: React.CSSProperties = {
  display: 'block',
  width: 273,
};

type FieldType = {
  username?: string;
  password?: string;
};

interface IForm {
  username: string;
  password: string;
  rememberme: boolean
}

export const LoginPage = () => {

  const {login, errorMessage, removeError} = useContext(AuthContext);
  const { setLoading, loading } = useContext(UIContext);

    useEffect(() => {
      if(errorMessage.length == 0 || errorMessage == undefined) return;
      Swal.fire('Error', errorMessage,'error');
      removeError();

    }, [errorMessage]);
  
  
    const onFinish = async(data: IForm) => {
        setLoading(true);
        const resp = await login(data);
        console.log(resp);
        setLoading(false);
    };
      
    const onFinishFailed = (errorInfo: any) => {
      console.log('Failed:', errorInfo);
    };
    

    return (
        <div className='main-login'>
        <Row  justify="space-around" align="middle">
        <Card hoverable style={cardStyle} styles={{ body: { padding: 0, overflow: 'hidden' } }}>
            <Flex justify="space-between">
            <img
                alt="avatar"
                src="../logo.png"
                style={imgStyle}
            />
            <Flex vertical align="flex-end" justify="space-between" style={{ padding: 32 }}>
                <Form
                        name="basic"
                        size='small'
                        labelCol={{ span: 8 }}
                        wrapperCol={{ span: 16 }}
                        style={{ maxWidth: 600 }}
                        initialValues={{ remember: true }}
                        onFinish={onFinish}
                        onFinishFailed={onFinishFailed}
                        autoComplete="off"
                    >
                    <Form.Item<FieldType>
                        label="Usuario"
                        name="username"
                        rules={[{ required: true, message: 'Porfavor ingrese su nombre de usuario!' }]}
                        >
                        <Input />
                        </Form.Item>

                        <Form.Item<FieldType>
                        label="Contraseña"
                        name="password"
                        rules={[{ required: true, message: 'Please ingrese su contraseña!' }]}
                        >
                        <Input.Password />
                        </Form.Item>

                        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                        <Button type="primary" htmlType="submit">
                            Ingresar
                        </Button>
                        </Form.Item>
                    </Form>
            </Flex>
            </Flex>
        </Card>
        </Row>
        </div>




        
    );

}
