import ReactEcharts from 'echarts-for-react';
import { LineChart, PieChart } from 'echarts/charts';
import {
  DatasetComponent,
  GridComponent,
  TitleComponent,
  TooltipComponent,
  TransformComponent,
} from 'echarts/components';
import * as echarts from 'echarts/core';
import { CanvasRenderer } from 'echarts/renderers';

import 'echarts/lib/chart/bar';
echarts.use([
  DatasetComponent,
  TitleComponent,
  TooltipComponent,
  GridComponent,
  LineChart,
  PieChart,
  CanvasRenderer,
  TransformComponent,
]);

const EchartsComponent = ({ options, ...props }: any) => {
  return (
    <ReactEcharts
      echarts={echarts}
      option={options}
      notMerge={true}
      lazyUpdate={true}
      theme={'theme_name'}
    //   style={{width: '100%',height:'100%'}}
      {...props}
    />
  );
};

export default EchartsComponent;
