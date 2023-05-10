import { Card, Col, Row, Statistic } from 'antd';
import ReactEcharts from 'echarts-for-react';
const { Countdown } = Statistic;
const Monitor = () => {
  const deadline = Date.now() + 1000 * 60 * 60 * 24 * 2 + 1000 * 30;

  let data: any = [];
  let now = new Date(1997, 9, 3);
  let oneDay = 24 * 3600 * 1000;
  let value = Math.random() * 1000;
  const randomData=()=> {
    now = new Date(+now + oneDay);
    value = value + Math.random() * 21 - 10;
    return {
      name: now.toString(),
      value: [[now.getFullYear(), now.getMonth() + 1, now.getDate()].join('/'), Math.round(value)],
    };
  }
  for (let i = 0; i < 1000; i++) {
    data.push(randomData());
  }
  const option = {
    title: {
      text: 'Dynamic Data & Time Axis',
    },
    tooltip: {
      trigger: 'axis',
      formatter: function (params: any) {
        // eslint-disable-next-line no-param-reassign
        params = params[0];
        let date = new Date(params.name);
        return (
          date.getDate() +
          '/' +
          (date.getMonth() + 1) +
          '/' +
          date.getFullYear() +
          ' : ' +
          params.value[1]
        );
      },
      axisPointer: {
        animation: false,
      },
    },
    xAxis: {
      type: 'time',
      splitLine: {
        show: false,
      },
    },
    yAxis: {
      type: 'value',
      boundaryGap: [0, '100%'],
      splitLine: {
        show: false,
      },
    },
    series: [
      {
        name: 'Fake Data',
        type: 'line',
        showSymbol: false,
        data: data,
      },
    ],
  };
  setInterval(function () {
    for (let i = 0; i < 5; i++) {
      data.shift();
      data.push(randomData());
    }
    
  }, 1000);
  return (
    <div>
      <Row gutter={[20, 20]}>
        <Col span={18}>
          <Card title="商品实时交易情况">
            <Row gutter={16}>
              <Col span={6}>
                <Statistic title="今日交易总量" value={112893} />
              </Col>
              <Col span={6}>
                <Statistic title="销售目标完成率" value={'80%'} />
              </Col>
              <Col span={6}>
                <Countdown title="活动剩余时间" value={deadline} format="HH:mm:ss:SSS" />
              </Col>
              <Col span={6}>
                <Statistic title="每秒交易量" value={1455} />
              </Col>
            </Row>
            <ReactEcharts option={option}/>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default Monitor;
