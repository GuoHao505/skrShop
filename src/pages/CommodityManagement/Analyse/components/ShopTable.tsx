import { Card, Col, Image, Table } from 'antd';
import EchartsList from './EchartsList';

const ShopTable = (props: any) => {
  const { tableData, pieList, page, handTableList } = props;
  const columns = [
    {
      title: 'id',
      dataIndex: 'id',
      key: 'id',
      width: 50,
    },
    {
      title: '品牌标题',
      dataIndex: 'title',
      key: 'title',
      width: 100,
    },
    {
      title: '产品图片',
      dataIndex: 'img',
      key: 'img',
      width: 100,
      render: (c: any) => <Image src={c} width={50} />,
    },
    {
      title: '销量',
      dataIndex: 'sales',
      key: 'sales',
      width: 100,
    },
  ];
  const pagination = {
    simple: true,
    defaultCurrent: 1,
    total: page.total,
    onChange: (c: any) => handTableList(c),
  };
  return (
    <>
      <Col span={12}>
        <Card title="品牌列表" style={{ height: 500 }}>
          <Table
            rowKey="id"
            columns={columns}
            dataSource={tableData}
            size="small"
            pagination={pagination}
          />
        </Card>
      </Col>
      <Col span={12}>
        <Card style={{ height: 500 }} title="销售额占比">
          <EchartsList data={pieList} type="pie" />
        </Card>
      </Col>
    </>
  );
};

export default ShopTable;
