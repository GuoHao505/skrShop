import logo from '@/assets/logo.png';
import { Tabs } from 'antd';
import { useState } from 'react';
import styles from './index.less';
import LoginForm from './compontents/LoginForm';
const Login = () => {
  const [type, setType] = useState('login');
  const items = [
    {
      label: '登录',
      key: 'login',
      children: <LoginForm props={{ type, setType }} />,
    },
    {
      label: '注册',
      key: 'register',
      children: <LoginForm props={{ type, setType }} />,
    },
  ];
  return (
    <div className={styles.LoginPage}>
      <div className={styles.loginTop}>
        <img src={logo} alt="" className={styles.img} />
        skr-商品管理
      </div>
      <div className={styles.loginForm}>
        <div className={styles.form}>
          <Tabs items={items} activeKey={type} onChange={(v) => setType(v)} className={styles.tabsStyle}/>
        </div>
      </div>
    </div>
  );
};

export default Login;
