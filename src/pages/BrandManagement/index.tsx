import { useRequest, useSetState } from 'ahooks';
import { Button, Divider, Image, message, Popconfirm, Table } from 'antd';
import { ColumnsType } from 'antd/es/table';
import { useState } from 'react';
// import EditUserModal from './components/EditUserModal';
import EditModal from '../../components/EditModal/index';
import { addBrand, deleteBrand, getBrandList, upDateBrand } from './service';

interface DataType {
  id: number;
  name: string;
  image: string;
}
const StoreMessage = () => {
  const [tableData, setTableData] = useState<DataType[]>([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [record, serRecord] = useSetState<any>({});
  const [type, setType] = useState<'add' | 'edit'>('edit');
  const columns: ColumnsType<DataType> = [
    {
      title: '品牌id',
      dataIndex: 'id',
      key: 'id',
      width: 200,
      align: 'center',
    },
    {
      title: '品牌名称',
      dataIndex: 'name',
      key: 'name',
      width: 200,
      align: 'center',
    },

    {
      title: '品牌logo',
      dataIndex: 'image',
      key: 'image',
      width: 100,
      align: 'center',
      ellipsis: true,
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
  const formList = [
    {
      label: '品牌名称',
      name: 'name',
    },
    {
      label: '品牌图片',
      name: 'image',
      // custom: <Image src={record.img as any} />,
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
    const res = await deleteBrand({ id });
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
  const { loading, run } = useRequest(getBrandList, {
    onSuccess: (res) => {
      if (res.code === 200) {
        setTableData(res.data);
      }
    },
  });

  return (
    <div>
      <div style={{ float: 'right', marginBottom: 8 }}>
        <Button onClick={addClick}>添加</Button>
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
          service={{ upDate: upDateBrand, run, addDate: addBrand }}
        />
      )}
    </div>
  );
};

export default StoreMessage;
