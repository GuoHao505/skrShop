import { Card, Col, Statistic } from 'antd';

const TotalList = (props: any) => {
  const { total } = props;
  return (
    <>
      <Col span={6}>
        <Card>
          <Statistic title="总销售额" value={total.salesTotal} prefix="¥" />
        </Card>
      </Col>
      <Col span={6}>
        <Card>
          <Statistic title="总访问量" value={total.viewsTotal} prefix="¥" />
        </Card>
      </Col>
      <Col span={6}>
        <Card>
          <Statistic title="总支付笔数" value={total.paysTotal} prefix="¥" />
        </Card>
      </Col>
      <Col span={6}>
        <Card>
          <Statistic title="库存量" value={total.stocksTotal} prefix="¥" />
        </Card>
      </Col>
    </>
  );
};

export default TotalList;
