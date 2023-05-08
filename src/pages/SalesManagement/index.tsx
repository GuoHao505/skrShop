import { useRequest } from 'ahooks';
import { Spin } from 'antd';
import ReactEcharts from 'echarts-for-react';
import { useState } from 'react';
import { getShopCategory, getShopSales } from './service';
const SalesManagement = () => {
  const [seriesData, setSeriesData] = useState([]);
  const [selected, setSelected] = useState<any>();
  const [xAxisData, setXAxisData] = useState<any>([]);
  const { data } = useRequest(getShopCategory, {
    onSuccess: (res) => {
      const arr = res.data.map((item: any) => ({
        id: item.id,
        name: item.name,
        type: 'line',
        stack: 'Total',
      }));
      setSeriesData(arr);
      const array = res.data.map((item: any) => [item.name, false]);
      const obj = Object.fromEntries(array);
      setSelected(obj);
    },
  });

  const option = {
    tooltip: {
      trigger: 'axis',
    },
    legend: {
      data: data?.data,
      selected: selected,
    },
    grid: {
      top: '50%',
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
      data: xAxisData,
    },
    yAxis: {
      type: 'value',
    },
    series: seriesData,
  };
  const getSalesData = async (category_id: any, name: any) => {
    const a = Object.entries(selected);
    const b = a.map((item: any) => {
      return [item[0], false];
    });
    const obj = Object.fromEntries(b);
    obj[name] = !obj[name];
    setSelected(obj);
    const res = await getShopSales({ category_id });
    const arr = res?.data.map((item: any) => item.title);
    setXAxisData(arr);
    const arr1 = res?.data.map((item: any) => item.sale);
    const data = seriesData.find((item: any) => {
      return item.name === name;
    });
    data.data = arr1;
  };

  return (
    <div>
      <Spin spinning={false}>
        <ReactEcharts
          option={option}
          onEvents={{
            legendselectchanged: (info: any) => {
              const data: any = seriesData.find((item: any) => {
                return item.name === info.name;
              });
              getSalesData(data?.id, data?.name);
            },
          }}
        />
      </Spin>
    </div>
  );
};

export default SalesManagement;
