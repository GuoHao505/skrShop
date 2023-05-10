import { Card, Col, List } from 'antd';
import EchartsList from './EchartsList';
import styles from '../index.less';

const valueStyle: any = {
  width: '100%',
  overflow: 'hidden',
  whiteSpace: 'nowrap',
  textOverflow: 'ellipsis',
};

const SalesList = (props: any) => {
  const { chartsList, rankings } = props;
  return (
    <>
      <Col span={18}>
        <Card style={{ height: 400 }} title="销售额">
          <EchartsList data={chartsList} type="ber" />,
        </Card>
      </Col>
      <Col span={6}>
        <Card style={{ height: 400 }} title={'品牌销售额排行'}>
          <List
            itemLayout="vertical"
            dataSource={rankings}
            renderItem={(item: any, index: number) => (
              <List.Item style={valueStyle}>
                <span className={styles.rankingNum}>{index + 1}</span>
                <span>{item.title}</span>
              </List.Item>
            )}
          />
        </Card>
      </Col>
    </>
  );
};

export default SalesList;
