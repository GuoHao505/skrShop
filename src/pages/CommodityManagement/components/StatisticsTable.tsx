import ReactEcharts from 'echarts-for-react';

const StatisticsTable = (props: any) => {
  const {chartsList} = props;
  const option = {
    xAxis: {
      type: 'category',
      data: chartsList?.map((i: any) => i.create_time),
    },
    yAxis: {
      type: 'value',
    },
    series: [
      {
        data: chartsList?.map((i: any) => i.value),
        type: 'bar',
        showBackground: true,
        backgroundStyle: {
          color: 'rgba(180, 180, 180, 0.2)',
        },
      },
    ],
  };
  return (
    <div>
      <ReactEcharts option={option} />
    </div>
  );
};

export default StatisticsTable;
