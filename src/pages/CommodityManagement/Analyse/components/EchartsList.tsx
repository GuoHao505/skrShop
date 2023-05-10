import ReactEcharts from 'echarts-for-react';

const EchartsList = (props: any) => {
  const { data, type } = props;

  const barOption = {
    xAxis: {
      type: 'category',
      data: data?.map((i: any) => i.create_time),
    },
    yAxis: {
      type: 'value',
    },
    series: [
      {
        data: data?.map((i: any) => i.sales),
        type: 'bar',
        showBackground: true,
        backgroundStyle: {
          color: 'rgba(180, 180, 180, 0.2)',
        },
      },
    ],
  };
  const lineoptions = {
    tooltip: {
      trigger: 'axis',
    },
    legend: {
      data: ['销量', '交易笔数', '访问量', '库存量'],
    },
    grid: {
      left: '3%',
      right: '4%',
      bottom: '3%',
      containLabel: true,
    },
    toolbox: {
      feature: {
        saveAsImage: {},
      },
    },
    xAxis: {
      type: 'category',
      boundaryGap: false,
      data: data?.map((i: any) => i.create_time),
    },
    yAxis: {
      type: 'value',
    },
    series: [
      {
        name: '销量',
        type: 'line',
        stack: 'Total',
        data: data?.map((i: any) => i.sales),
      },
      {
        name: '交易笔数',
        type: 'line',
        stack: 'Total',
        data: data?.map((i: any) => i.pays),
      },
      {
        name: '访问量',
        type: 'line',
        stack: 'Total',
        data: data?.map((i: any) => i.views),
      },
      {
        name: '库存量',
        type: 'line',
        stack: 'Total',
        data: data?.map((i: any) => i.stocks),
      },
    ],
  };
  const pieOption = {
    tooltip: {
      trigger: 'item',
    },
    legend: {
      top: '2%',
      left: 'left',
    },
    series: [
      {
        name: 'Access From',
        type: 'pie',
        center: ['50%', '65%'],
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
        data: data,
      },
    ],
  };

  return (
    <div>
      <ReactEcharts
        option={type === 'ber' ? barOption : type === 'line' ? lineoptions : pieOption}
      />
    </div>
  );
};

export default EchartsList;
