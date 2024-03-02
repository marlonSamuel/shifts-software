import React, { useContext, useState } from 'react';
import {
    BankOutlined,
    BarChartOutlined,
    DashboardOutlined,
  EyeOutlined,
  LogoutOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UserOutlined,
} from '@ant-design/icons';
import { Layout, Menu, Button, theme } from 'antd';
import {
  BrowserRouter as Router,
  Route,
  Link
} from "react-router-dom";
import { AppRouter } from '../router/AppRouter';
import { AuthContext } from '../context/auth/AuthContext';


const { Header, Sider, Content } = Layout;

export const DefaultPage = () => {
    //obtener estado de autenticación.
    const {logged, logout, user} = useContext(AuthContext);
    const [collapsed, setCollapsed] = useState(false);
    const {
      token: { colorBgContainer, borderRadiusLG },
    } = theme.useToken();
  
    return (
      <Layout style={{ minHeight: '100vh' }}>
        <Sider hidden={!logged} trigger={null} collapsible collapsed={collapsed}>
          <div className="demo-logo-vertical" /> 
          <Menu
            theme="dark"
            mode="inline"
            defaultSelectedKeys={['1']}
            items={[
                {
                    key: '1',
                    icon: <DashboardOutlined />,
                    label: <Link to={'/dashboard'}>DASHBOARD</Link>
                },
                {
                    key: '2',
                    icon: <BankOutlined />,
                    label: <Link to={'/branchs'}>Sucursales</Link>,
                },
                {
                    key: '3',
                    icon: <BankOutlined />,
                    label: <Link to={'/departments'}>Areas</Link>,
                },
                
                {
                    key: '4',
                    icon: <UserOutlined />,
                    label: <Link to={'/users'}>Usuarios</Link>,
                },
                {
                    key: '5',
                    icon: <BarChartOutlined />,
                    label: <Link to={'/reports'}>Reportes</Link>,
                },
                {
                    key: '6',
                    icon: <EyeOutlined />,
                    label: <Link to={'/check_screen'}>Ver</Link>,
                },
                {
                  key: '7',
                  icon: <LogoutOutlined />,
                  label: <div><Link to={'/'} onClick={logout}>Salir</Link></div>,
              },
            ]}
          />
        </Sider>
        <Layout>
          <Header hidden={!logged} style={{ padding: 0, background: colorBgContainer }}>
            <Button
              type="text"
              icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
              onClick={() => setCollapsed(!collapsed)}
              style={{
                fontSize: '16px',
                width: 64,
                height: 64,
              }}
            />
           <b>{user?.branch.toUpperCase()} -  {(user?.name+' '+user?.lastname).toUpperCase()} <span style={{color: 'green'}}>online</span> </b>
          </Header>
          <Content
            style={{
              margin: '24px 16px',
              padding: 24,
              minHeight: 280,
              background: colorBgContainer,
              borderRadius: borderRadiusLG,
            }}
          >
            <AppRouter />
          </Content>
        </Layout>
      </Layout>

    );
}
