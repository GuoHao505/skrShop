import { useRequest, useSetState } from 'ahooks';
import { Card, Col, List, Row, Spin, Statistic, Table, Tabs } from 'antd';
import ReactEcharts from 'echarts-for-react';
import { useEffect, useState } from 'react';
import StatisticsTable from './components/StatisticsTable';
import styles from './index.less';
import { getChartsList, getRanking, getShopTotal } from './service';

const CommodityManagement = () => {
  const valueStyle: any = {
    width: '100%',
    overflow: 'hidden',
    whiteSpace: 'nowrap',
    textOverflow: 'ellipsis',
  };

  const [total, setTotal] = useSetState({
    salesTotal: 0,
    viewsTotal: 0,
    stocksTotal: 0,
    paysTotal: 0,
  });
  const [chartsList, setChartsList] = useState<any>([]);
  const [rankings, setRankings] = useState<any>([]);
  const [tabs, setTabs] = useState<'sales' | 'views'>('sales');

  const { loading } = useRequest(getShopTotal, {
    onSuccess: (res) => {
      if (res.code === 200) {
        setTotal(res.data);
      }
    },
  });
  const handChartsList = async () => {
    const res = await getChartsList({ type: tabs });
    if (res.code === 200) {
      setChartsList(res.data);
    }
  };
  const handRanking = async () => {
    const res = await getRanking({ type: tabs });
    if (res.code === 200) {
      setRankings(res.data);
    }
  };
  useEffect(() => {
    handChartsList();
    handRanking();
  }, [tabs]);
  const option = {
    tooltip: {
      trigger: 'item',
    },
    legend: {
      top: '5%',
      left: 'center',
    },
    series: [
      {
        name: 'Access From',
        type: 'pie',
        radius: ['40%', '70%'],
        avoidLabelOverlap: false,
        label: {
          show: false,
          position: 'center',
        },
        emphasis: {
          label: {
            show: true,
            fontSize: 40,
            fontWeight: 'bold',
          },
        },
        labelLine: {
          show: false,
        },
        data: [
          { value: 1048, name: 'Search Engine' },
          { value: 735, name: 'Direct' },
          { value: 580, name: 'Email' },
          { value: 484, name: 'Union Ads' },
          { value: 300, name: 'Video Ads' },
        ],
      },
    ],
  };

  return (
    <div>
      <Spin spinning={loading}>
        <Row gutter={[20, 20]}>
          <Col span={6}>
            <Card>
              <Statistic
                title="总销售额"
                value={total.salesTotal}
                prefix="¥"
                valueStyle={valueStyle}
              />
            </Card>
          </Col>
          <Col span={6}>
            <Card>
              <Statistic
                title="总访问量"
                value={total.viewsTotal}
                prefix="¥"
                valueStyle={valueStyle}
              />
            </Card>
          </Col>
          <Col span={6}>
            <Card>
              <Statistic
                title="总支付笔数"
                value={total.paysTotal}
                prefix="¥"
                valueStyle={valueStyle}
              />
            </Card>
          </Col>
          <Col span={6}>
            <Card>
              <Statistic
                title="库存量"
                value={total.stocksTotal}
                prefix="¥"
                valueStyle={valueStyle}
              />
            </Card>
          </Col>
          <Col span={18}>
            <Card style={{ height: 400 }}>
              <Tabs
                onChange={(v: any) => setTabs(v)}
                items={[
                  {
                    label: '销售额',
                    key: 'sales',
                    children: <StatisticsTable chartsList={chartsList} />,
                  },
                  {
                    label: '访问量',
                    key: 'views',
                    children: <StatisticsTable chartsList={chartsList} />,
                  },
                ]}
              />
            </Card>
          </Col>
          <Col span={6}>
            <Card style={{ height: 400 }}>
              <p>{tabs === 'sales' ? '品牌销售额排行' : '品牌访问量排行'}</p>
              <List
                itemLayout="vertical"
                dataSource={rankings}
                renderItem={(item: any, index: number) => (
                  <List.Item>
                    <span className={styles.rankingNum}>{index + 1}</span>
                    <span>{item.title}</span>
                  </List.Item>
                )}
              />
            </Card>
          </Col>
          <Col span={12}>
            <Card>
              <p>支付</p>
              <Table />
            </Card>
          </Col>
          <Col span={12}>
            <Card>
              <ReactEcharts option={option} />
            </Card>
          </Col>
        </Row>
      </Spin>
    </div>
  );
};

export default CommodityManagement;
