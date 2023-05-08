import { Form, Input, Modal } from 'antd';
import { changePassword } from '../serives';

const ForgetModal = (props: any) => {
  const { forgetModalOpen, setForgetModalOpen } = props.props;
  const layout = {
    labelCol: { span: 4 },
    wrapperCol: { span: 18 },
  };
  const [form] = Form.useForm();
  const handOk = async () => {
    await form.validateFields();
    const formData = form.getFieldsValue();
    delete formData.pw2;
    await changePassword(formData);
  };
  return (
    <Modal
      title="修改密码"
      open={forgetModalOpen}
      onCancel={() => setForgetModalOpen(!forgetModalOpen)}
      width="30%"
      destroyOnClose={true}
      onOk={handOk}
    >
      <Form {...layout} form={form}>
        <Form.Item label="用户名" name="username" rules={[{ required: true }]}>
          <Input placeholder="请输入用户名" />
        </Form.Item>
        <Form.Item label="密码" name="password" rules={[{ required: true }]}>
          <Input placeholder="请输入密码" />
        </Form.Item>
        <Form.Item
          label="确认密码"
          name="pw2"
          rules={[
            ({ getFieldValue }) => ({
              validator(rule, value) {
                if (!value || getFieldValue('password') === value) {
                  return Promise.resolve();
                }
                return Promise.reject('两次密码输入不一致');
              },
            }),{ required: true }
          ]}
        >
          <Input placeholder="请确认密码" />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default ForgetModal;
