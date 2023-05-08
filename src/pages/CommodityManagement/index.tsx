import EditModal from '@/components/EditModal';
import useTouchBottom from '@/utils/useTouchBottom';
import { useRequest, useSetState } from 'ahooks';
import { Button, Divider, Image, message, Popconfirm, Table } from 'antd';
import { ColumnsType } from 'antd/es/table';
import { useEffect, useRef, useState } from 'react';
import { addShop, deleteShop, getShopList, upDateShop } from './service';
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
const CommodityManagement = () => {
  const [tableData, setTableData] = useState<DataType[]>([]);
  const [page, setPage] = useSetState({ total: 0, currentPage: 1, pageSize: 50 });
  const [current, setCurrent] = useState(1);
  const [modalOpen, setModalOpen] = useState(false);
  const [record, serRecord] = useSetState<any>({});
  const [type, setType] = useState<'add' | 'edit'>('edit');
  const columns: ColumnsType<DataType> = [
    {
      title: '商品id',
      dataIndex: 'id',
      key: 'id',
      width: 200,
      align: 'center',
    },
    {
      title: '标题',
      dataIndex: 'title',
      key: 'title',
      width: 200,
      align: 'center',
    },

    {
      title: '商品图片',
      dataIndex: 'img',
      key: 'imgs',
      width: 100,
      align: 'center',
      ellipsis: true,
      render: (c) => <Image src={c} />,
    },
    {
      title: '商品价格',
      dataIndex: 'price',
      key: 'price',
      width: 100,
      align: 'center',
    },
    {
      title: '品牌',
      dataIndex: 'brand_id',
      key: 'brand_id',
      width: 100,
      align: 'center',
      render: (c) => <>{c == 1 ? <span>安踏</span> : <span>李宁</span>}</>,
    },
    {
      title: '商品参数',
      dataIndex: 'param',
      key: 'param',
      width: 250,
    },
    {
      title: '商品库存',
      dataIndex: 'stock',
      key: 'stock',
      width: 150,
      align: 'center',
    },
    {
      title: '销量',
      dataIndex: 'sale',
      key: 'sale',
      width: 100,
      align: 'center',
    },
    {
      title: '优惠价',
      dataIndex: 'special_price',
      key: 'special_price',
      width: 100,
      align: 'center',
    },
    {
      title: '添加时间',
      dataIndex: 'create_time',
      key: 'create_time',
      width: 100,
      align: 'center',
    },
    {
      title: '最后更改时间',
      dataIndex: 'last_update_time',
      key: 'last_update_time',
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
      label: '标题',
      name: 'title',
    },
    {
      label: '品牌id',
      name: 'brand_id',
    },
    {
      label: '店铺id',
      name: 'store_id',
    },
    {
      label: '商品图片',
      name: 'img',
      rules: [
        { required: true },
        {
          pattern: /^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\*\+,;=.]+$/,
          message: '请输入正确的图片地址',
        },
      ],
    },
    {
      label: '商品价格',
      name: 'price',
    },
    {
      label: '商品参数',
      name: 'param',
    },
    {
      label: '商品库存',
      name: 'stock',
      // isDisadled: true,
    },
    {
      label: '优惠价',
      name: 'special_price',
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
    const res = await deleteShop({ id });
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
  const { loading, run } = useRequest(
    (c = page.currentPage, p = page.pageSize) => {
      return getShopList({
        currentPage: c,
        pageSize: p,
      });
    },
    {
      throttleWait: 300,
      onSuccess: (res) => {
        if (res.code === 200) {
          setTableData([...tableData, ...res.data]);
          setPage(res.page);
        }
      },
    },
  );
  const currentRef = useRef<any>(null);
  useEffect(() => {
    currentRef.current = current;
  }, [current]);

  const handleLoadMore = () => {
    const temp = currentRef.current + 1;
    setCurrent(temp);
    run(temp);
  };
  useTouchBottom(handleLoadMore);

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
        pagination={false}
      />
      {modalOpen && (
        <EditModal
          props={{ modalOpen, setModalOpen, formList, record, type }}
          service={{ upDate: upDateShop, run, addDate: addShop }}
        />
      )}
    </div>
  );
};

export default CommodityManagement;
