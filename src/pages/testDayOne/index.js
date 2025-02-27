import React, { useEffect, useContext } from 'react';
import { Table, Divider } from 'antd';
import TestDayOneStore from './page-list';
import SearchForm from './searchForm';
import './style.less';
import { toJS } from 'mobx';
import { observer } from 'mobx-react';

const TestDayOnePage = () => {
  const pageStore = useContext(TestDayOneStore);
  useEffect(() => {
    pageStore.getList();
  }, []); // 组件挂载时，获取列表数据
  return (
    <div className="page-test-day-one page-content">
      <SearchForm />
      <Divider />
      <div className="table-container">
        <Table
          style={{ height: '100%' }}
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
