import React, { useEffect, useContext } from 'react';
import { Table, Button, Switch, Row, Divider } from 'antd';
import TestDayOneStore from './page-list';
import SearchForm from './searchForm';
import './style.less';
import { toJS } from 'mobx';
import { observer } from 'mobx-react';

const TestDayOnePage = () => {
  const pageStore = useContext(TestDayOneStore);
  useEffect(() => {
    pageStore.getList();
  }, []);
  return (
    <div className="page-test-day-one page-content">
      <SearchForm />
      <Divider />
      <div className="table-container">
        <Table
          loading={pageStore.loading}
          dataSource={toJS(pageStore.tableData)}
          columns={toJS(pageStore.columns)}
          pagination={toJS(pageStore.pagination)}
        />
      </div>
    </div>
  );
};

export default observer(TestDayOnePage);
