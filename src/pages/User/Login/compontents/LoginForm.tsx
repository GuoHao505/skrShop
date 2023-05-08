import { setAuth } from '@/utils/mainAppBridge';
import { Button, Form, Input, message } from 'antd';
import { useEffect, useState } from 'react';
import { history } from 'umi';
import { handleLogin, handleRegister } from '../serives';
import ForgetModal from './ForgetModal';

const LoginForm = (props: any) => {
  const { type, setType } = props.props;
  const [loading, setLoading] = useState(false);
  const [forgetModalOpen, setForgetModalOpen] = useState(false);
  const [form] = Form.useForm();
  const onKeydown = (e: any) => {
    if (e.keyCode === 13) {
      handleSubmit();
    }
  };
  const handleSubmit = async () => {
    await form.validateFields();
    setLoading(true);
    const formData = form.getFieldsValue();
    try {
      const res = type === 'login' ? await handleLogin(formData) : await handleRegister(formData);
      if (res?.code == 200) {
        message.success(res?.message);
        if (type === 'login') {
          setAuth(res?.data);
          history.push('/');
        } else {
          setType('login');
        }
      } else {
        message.error(res?.message);
      }
    } catch (err: any) {
      message.error(err.message);
    }
    setLoading(false);
  };
  useEffect(() => {
    document.addEventListener('keydown', onKeydown, false);
    return () => {
      document.removeEventListener('keydown', onKeydown);
    };
  }, []);
  return (
    <div>
      <Form form={form}>
        <Form.Item
          name="username"
          rules={[{ required: true, message: '账号不能为空', whitespace: true }]}
        >
          <Input placeholder="账号" />
        </Form.Item>
        {type === 'register' && (
          <Form.Item
            name="email"
            rules={[{ required: true, message: '邮箱不能为空', whitespace: true }]}
          >
            <Input placeholder="输入邮箱" />
          </Form.Item>
        )}

        <Form.Item
          name="password"
          rules={[{ required: true, message: '登录密码不能为空', whitespace: true }]}
        >
          <Input.Password placeholder="输入登录密码" />
        </Form.Item>
        <Form.Item>
          {type === 'register' ? (
            <Button
              style={{ width: '100%' }}
              onClick={handleSubmit}
              type="primary"
              loading={loading}
            >
              注册
            </Button>
          ) : (
            <>
              <div style={{ float: 'right', marginBottom: 5 }}>
                <a onClick={() => setForgetModalOpen(!forgetModalOpen)}>忘记密码</a>
              </div>

              <Button
                style={{ width: '100%' }}
                onClick={handleSubmit}
                type="primary"
                loading={loading}
              >
                登录
              </Button>
            </>
          )}
        </Form.Item>
      </Form>
      {forgetModalOpen && <ForgetModal props={{ forgetModalOpen, setForgetModalOpen }} />}
    </div>
  );
};

export default LoginForm;
