import { Form, Input, message, Modal } from 'antd';

const EditModal = (props: any) => {
  const {
    modalOpen,
    setModalOpen,
    record,
    type = 'edit',
    formList = [],
    required = true,
  } = props.props;
  const { upDate, addDate, run } = props.service;
  const [form] = Form.useForm();
  const layout = {
    labelCol: { span: 5 },
    wrapperCol: { span: 17 },
  };
  const handleOk = async () => {
    await form.validateFields();
    const formData = form.getFieldsValue();
    const res =
      type === 'edit' ? await upDate({ ...formData, id: record.id }) : await addDate(formData);
    if (res?.code === 200) {
      message.success(res.message);
      setModalOpen(!modalOpen);
      run();
    } else {
      message.error(res.message);
    }
  };
  return (
    <Modal
      title={type === 'edit' ? '编辑' : '添加'}
      open={modalOpen}
      onOk={handleOk}
      onCancel={() => setModalOpen(!modalOpen)}
      width="30%"
      destroyOnClose={true}
    >
      <Form {...layout} form={form} initialValues={type === 'edit' ? record : ''}>
        {formList.map((item: any) => (
          <Form.Item
            name={item.name}
            label={item.label}
            rules={required ? [{ required: true }] : []}
            {...item}
          >
            {item.custom ? item.custom : <Input disabled={type==='edit'?item.isDisadled:''} />}
            {/* <Input disabled={type === 'edit' ? item.isDisadled : ''} /> */}
          </Form.Item>
        ))}
      </Form>
    </Modal>
  );
};

export default EditModal;
