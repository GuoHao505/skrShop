
import { getRole } from '@/utils/mainAppBridge';
import { useRequest, useSetState } from 'ahooks';
import { Button, Divider, Image, Input, message, Popconfirm, Table } from 'antd';
import { ColumnsType } from 'antd/es/table';
import { useState } from 'react';
import EditModal from '../../components/EditModal/index';
import { addStore, deleteStore, getStoreList, upDateStore } from './service';
interface DataType {
  id: number;
  title: string;
  imgs: any;
  price: string;
  param: string;
  stock: string;
  special_price: string;
  sale: string;
  create_time: string;
  last_update_time: string;
  action: (c: any, r: any) => void;
}
const StoreMessage = () => {
  const [tableData, setTableData] = useState<DataType[]>([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [record, serRecord] = useSetState<any>({});
  const [type, setType] = useState<'add' | 'edit'>('edit');
  const columns: ColumnsType<DataType> = [
    {
      title: '店铺id',
      dataIndex: 'id',
      key: 'id',
      width: 200,
      align: 'center',
    },
    {
      title: '店铺名称',
      dataIndex: 'name',
      key: 'name',
      width: 200,
      align: 'center',
    },
    {
      title: '店铺logo',
      dataIndex: 'avatar',
      key: 'avatar',
      width: 100,
      align: 'center',
      ellipsis: true,
      render: (c) => <Image src={c} />,
    },
    {
      title: '店铺地址',
      dataIndex: 'address',
      key: 'address',
      width: 200,
      align: 'center',
      ellipsis: true,
    },
    {
      title: '商家名称',
      dataIndex: 'real_name',
      key: 'real_name',
      width: 100,
      align: 'center',
    },
    {
      title: '商家电话',
      dataIndex: 'tel',
      key: 'tel',
      width: 200,
      align: 'center',
    },
    {
      title: '商家地址',
      dataIndex: 'region',
      key: 'region',
      width: 150,
      align: 'center',
    },
    {
      title: '店铺介绍',
      dataIndex: 'introduce',
      key: 'introduce',
      width: 100,
      align: 'center',
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
  const formList = [
    {
      label: '店铺名称',
      name: 'name',
    },
    {
      label: '店铺地址',
      name: 'address',
    },
    {
      label: '店铺logo',
      name: 'avatar',
      rules: [
        { required: true },
        {
          pattern: /^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\*\+,;=.]+$/,
          message: '请输入正确的图片地址',
        },
      ],
    },
    {
      label: '店铺介绍',
      name: 'introduce',
    },
    {
      label: '商家所在地',
      name: 'region',
    },
    {
      label: '商家地址',
      name: 'tel',
    },
    {
      label: '密码',
      name: 'password',
      custom: <Input.Password />,
    },
  ];
  //编辑商品
  const editClick = (r: any) => {
    setType('edit');
    setModalOpen(!modalOpen);
    serRecord(r);
  };
  //删除商品
  const deleteClick = async (id: any) => {
    const res = await deleteStore({ id });
    if (res.code === 200) {
      message.success(res.message);
      run();
    } else {
      message.error(res.message);
    }
  };
  //添加商品
  const addClick = () => {
    setType('add');
    setModalOpen(!modalOpen);
  };
  const { loading, run } = useRequest(getStoreList, {
    onSuccess: (res) => {
      if (res.code === 200) {
        setTableData(res.data);
      }
    },
  });

  return (
    <div>
      <div style={{ float: 'right', marginBottom: 8 }}>
        {getRole('admin') && <Button onClick={addClick}>添加</Button>}
      </div>
      <Table
        rowKey={'id'}
        loading={loading}
        columns={columns}
        dataSource={tableData}
        scroll={{ x: columns.reduce((r, i) => r + (i.width as number), 0) }}
      />
      {modalOpen && (
        <EditModal
          props={{ modalOpen, setModalOpen, formList, record, type }}
          service={{ upDate: upDateStore, run, addDate: addStore }}
        />
      )}
    </div>
  );
};

export default StoreMessage;
