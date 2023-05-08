import EditModal from '@/components/EditModal';
import { PlusOutlined } from '@ant-design/icons';
import { useRequest } from 'ahooks';
import { Button, Divider, Image, Input, message, Popconfirm, Table, Upload } from 'antd';
import { ColumnsType } from 'antd/es/table';
import { useState } from 'react';
import { addUserInfo, deleteUser, getUser, updateUser } from './service';

interface DataType {
  id: number;
  username: string;
  password: number;
  email: string;
  tel: string;
  create_time: string;
  last_update_time: string;
  avatar: string;
  action: (c: any, r: any) => void;
}
const UserManagement = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [type, setType] = useState<'add' | 'edit'>('edit');
  const [record, setRecord] = useState();
  const columns: ColumnsType<DataType> = [
    {
      title: 'id',
      dataIndex: 'id',
      key: 'id',
      width: 100,
      align: 'center',
    },
    {
      title: '用户名',
      dataIndex: 'username',
      key: 'username',
      width: 200,
      align: 'center',
    },
    {
      title: '昵称',
      dataIndex: 'nickname',
      key: 'nickname',
      width: 200,
      align: 'center',
    },
    {
      title: '密码',
      dataIndex: 'password',
      key: 'password',
      width: 200,
      align: 'center',
    },
    {
      title: '邮箱',
      dataIndex: 'email',
      key: 'email',
      width: 200,
      align: 'center',
    },
    {
      title: '电话',
      dataIndex: 'tel',
      key: 'tel',
      width: 150,
    },
    {
      title: '创建时间',
      dataIndex: 'create_time',
      key: 'create_time',
      width: 150,
      align: 'center',
    },
    {
      title: '最后修改时间',
      dataIndex: 'last_update_time',
      key: 'last_update_time',
      width: 150,
      align: 'center',
    },
    {
      title: '用户头像',
      dataIndex: 'avatar',
      key: 'avatar',
      width: 100,
      align: 'center',
      render: (c) => <Image src={c} />,
    },
    {
      title: '操作',
      dataIndex: 'action',
      key: 'action',
      width: 150,
      align: 'center',
      fixed: 'right',
      render: (c, r) => (
        <>
          <a type="link" onClick={() => editClick(r)}>
            编辑
          </a>
          <Divider type="vertical" />
          <Popconfirm title="确定删除吗" onConfirm={() => deleteClick(r.id)}>
            <a type="link">删除</a>
          </Popconfirm>
        </>
      ),
    },
  ];
  const deleteClick = async (id: number) => {
    const res = await deleteUser({ id });
    message.success(res.message);
    run();
  };
  const editClick = (r: any) => {
    setType('edit');
    setModalOpen(true);
    setRecord(r);
  };
  const addClick = () => {
    setType('add');
    setModalOpen(true);
  };


  const formList = [
    {
      label: '用户名',
      name: 'username',
    },
    {
      label: '昵称',
      name: 'nickname',
    },
    {
      label: '密码',
      name: 'password',
      custom: <Input.Password />,
    },
    {
      label: '邮箱',
      name: 'email',
      rules: [
        { required: true },
        {
          pattern: /^[a-zA-Z0-9_.-]+@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*\.[a-zA-Z0-9]{2,6}$/,
          message: '邮箱格式不正确',
        },
        {
          max: 50,
          message: '邮箱不得超过50字符',
        },
      ],
    },
    {
      label: '电话',
      name: 'tel',
      rules: [
        { required: true },
        {
          pattern: /^1[3|4|5|7|8][0-9]\d{8}$/,
          message: '请输入正确的手机号',
        },
      ],
    },
    {
      label: '用户头像',
      name: 'avatar',
      rules: [
        { required: true },
        {
          pattern: /^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\*\+,;=.]+$/,
          message: '请输入正确的图片地址',
        },
      ],
    },
  ];
  const { data, loading, run } = useRequest(getUser);
  return (
    <div>
      <div style={{ float: 'right', marginBottom: 8 }}>
        <Button onClick={addClick}>添加</Button>
      </div>
      <Table
        rowKey={'id'}
        columns={columns}
        dataSource={data?.data}
        loading={loading}
        scroll={{ x: columns.reduce((r, i) => r + (i.width as number), 0) }}
      />
      {modalOpen && (
        <EditModal
          props={{ modalOpen, setModalOpen, formList, record, type }}
          service={{ upDate: updateUser, run, addDate: addUserInfo }}
        />
      )}
    </div>
  );
};

export default UserManagement;
