import { useRequest, useSetState } from 'ahooks';
import { Card, Col, Row } from 'antd';
import { useEffect, useState } from 'react';
import EchartsList from './components/EchartsList';
import SalesList from './components/SalesList';
import ShopTable from './components/ShopTable';
import TotalList from './components/TotalList';
import {
  getChartsList,
  getRanking,
  getSalesProportion,
  getShopList,
  getShopTotal,
} from './service';

const Analyse = () => {
  const [total, setTotal] = useSetState({
    salesTotal: 0,
    viewsTotal: 0,
    stocksTotal: 0,
    paysTotal: 0,
  });
  const [chartsList, setChartsList] = useState<any>([]);
  const [rankings, setRankings] = useState<any>([]);
  const [tableData, setTableData] = useState<any>([]);
  const [page, setPage] = useState<any>({ total: 0, currentPage: 1, pageSize: 5 });
  const [pieList, setPieList] = useState<any>([]);

  useRequest(getShopTotal, {
    onSuccess: (res) => {
      if (res.code === 200) {
        setTotal(res.data);
      }
    },
  });
  const handChartsList = async () => {
    const res = await getChartsList();
    if (res.code === 200) {
      setChartsList(res.data);
    }
  };
  const handRanking = async () => {
    const res = await getRanking();
    if (res.code === 200) {
      setRankings(res.data);
    }
  };
  const handTableList = async (currentPage = 1, pageSize = 5) => {
    const res = await getShopList({ currentPage, pageSize });
    if (res.code === 200) {
      setTableData(res.data);
      setPage(res.page);
    }
  };
  const handSalesProportion = async () => {
    const result = await getSalesProportion();
    if (result.code === 200) {
      setPieList(result.data);
    }
  };
  useEffect(() => {
    handChartsList();
    handRanking();
    handTableList();
    handSalesProportion();
  }, []);

  return (
    <div>
      <Row gutter={[20, 20]}>
        <TotalList total={total} />
        <SalesList chartsList={chartsList} rankings={rankings} />
        <ShopTable
          tableData={tableData}
          pieList={pieList}
          handTableList={handTableList}
          page={page}
        />
        <Col span={24}>
          <Card>
            <EchartsList data={chartsList} type="line" />
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default Analyse;
